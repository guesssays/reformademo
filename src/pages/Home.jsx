import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import Section from "../components/Section.jsx";
import TrialModal from "../components/TrialModal.jsx"; // ← модалка
import { advantages, why, directions, studios, reviews } from "../data/homeData.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { MapPin, Phone } from "lucide-react";
import { asAvif } from "../lib/avif.js";

/** ===== МЕЛКИЕ ОПТИМИЗАЦИИ =====
 * - React.memo для статичных дочерних элементов
 * - loading="lazy" + decoding="async" у изображений
 * - фиксированные контейнеры с aspect-ratio через padding для меньшего CLS
 * - SPA-навигация через <Link> вместо <a> там, где это внутренние ссылки
 * - prefers-reduced-motion и пауза автоплеев при document.hidden
 * - useMemo для производных массивов и отказ от inline-обработчиков в map
 * - fetchPriority для ключевых изображений hero-поста
 * - AVIF через <picture> + fallback на оригинал
 */

const GradientNumber = memo(function GradientNumber({ value, className = "" }) {
  const id = `grad-${value}`;
  return (
    <svg className={className} viewBox="0 0 140 110" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e5383b" />
          <stop offset="100%" stopColor="#ba181b" />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="86"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="2"
        fontFamily="BebasNeueCyrillic, sans-serif"
        fontSize="96"
        letterSpacing="2"
      >
        {String(value).padStart(2, "0")}
      </text>
    </svg>
  );
});

// Доп. текст для карточек «почему выбирают»
const whyExtras = [
  `Множество акций и бонусов: скидки для подруг, коллег, пенсионеров и именинников, подарки от партнёров, скидки на абонементы и SPA процедуры, бесплатные консультации от массажистов, ежедневные горящие окошки на массаж со скидкой 15%.`,
  `Мы ценим каждого клиента и подготовили удобные уровни абонементов, чтобы занятия были ещё выгоднее.
Simple — стартовый абонемент для новичков.
Bronze — даёт 10% скидку на абонемент на второй и третий месяц занятий.
Silver — 15% скидка. Доступен в четвертый и пятый месяцы занятий.
Gold — максимальная выгода: 25% скидка на абонементы. Для наших самых активных и преданных клиенток. Абонемент доступен с шестого месяца.`,
  `Разнообразие направлений и тренировок, удобное расписание утром, днём и вечером с быстрой онлайн записью.`,
  `Забота о себе — это не только тренировки, но и отдых. В нашей СПА-зоне вы сможете расслабиться, восстановить силы и подарить телу заслуженное внимание.`,
];

export default function Home() {
  const [trialOpen, setTrialOpen] = useState(false);

  // 🔔 Открытие модалки по глобальному событию из хедера/где угодно
  useEffect(() => {
    const open = () => setTrialOpen(true);
    window.addEventListener("open-trial-modal", open);
    return () => window.removeEventListener("open-trial-modal", open);
  }, []);

  // Переставляем блок SPA (бывший 4-й) первым в «почему выбирают»
  const whyReordered = useMemo(
    () => (why && why.length >= 4 ? [why[3], ...why.slice(0, 3), ...why.slice(4)] : why),
    []
  );

  // ===== HERO video autoplay/pause (accessibility-friendly) =====
  const heroVideoRef = useRef(null);
  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v) return;

    // Уважение к prefers-reduced-motion
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const tryPlay = () => v.play().catch(() => {});
    tryPlay();

    const onVisibility = () => (document.hidden ? v.pause() : tryPlay());
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Пауза автоплея Swiper при скрытии вкладки
  const onSwiperInit = useCallback((swiper) => {
    const handler = () => {
      if (document.hidden) swiper.autoplay?.stop();
      else swiper.autoplay?.start();
    };
    document.addEventListener("visibilitychange", handler);
    swiper.once("destroy", () => document.removeEventListener("visibilitychange", handler));
  }, []);

  const openTrial = useCallback(() => setTrialOpen(true), []);

  return (
    <>
      {/* Глобальная модалка записи */}
      <TrialModal open={trialOpen} onClose={() => setTrialOpen(false)} />

      {/* ========== HERO (full-bleed, БЕЗ wrapper) ========== */}
      <section id="hero" className="relative">
        <div className="bleed">
          <div className="edge">
            <div className="rounded-3xl overflow-hidden">
              {/* увеличенная высота и всё по центру */}
              <div className="relative min-h-[90vh] flex items-center justify-center text-center">
                {/* Фоновое видео вместо изображения */}
                <video
                  ref={heroVideoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/images/hero-poster.jpg"
                  disablePictureInPicture
                >
                  <source src="/videos/hero.webm" type="video/webm" />
                  <source src="/videos/hero.mp4" type="video/mp4" />
                </video>

                {/* затемнение поверх видео */}
                <div className="absolute inset-0 bg-ink/60" />

                <div className="relative z-10 p-6 md:p-10 flex flex-col items-center">
                  {/* логотип/заголовок */}
                  <h1
                    className="
                      font-xolo font-bold
                      text-[64px] sm:text-[80px] md:text-[100px]
                      leading-none
                      tracking-[-4px] sm:tracking-[-6px] md:tracking-[-8px]
                      mb-4
                    "
                    aria-label="ReForma"
                  >
                    <span className="text-scarlet">R</span>
                    <span className="text-paper">e</span>
                    <span className="text-scarlet">F</span>
                    <span className="text-paper">orma</span>
                  </h1>

                  {/* подзаголовок */}
                  <p className="text-paper/90 font-bebas max-w-2xl text-lg tracking-wide mb-3">
                    Уютные студии, женская атмосфера, программы тренировок для
                    любого уровня, а также массаж и SPA-процедуры для
                    полноценного восстановления.
                  </p>

                  {/* кнопка — открывает модалку */}
                  <button
                    onClick={openTrial}
                    className="btn btn--accent font-bebas text-lg tracking-wide mt-4"
                    type="button"
                  >
                    ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ
                  </button>

                  {/* ссылки на студии */}
                  <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-6">
            
                    <Link
                      to="/studios/st-alm"
                      className="inline-block underline decoration-white/60 underline-offset-4 hover:decoration-white text-white/90 font-helvCond text-lg"
                    >
                      Расписание и цены Алимкент
                    </Link>
                            <Link
                      to="/studios/st-aly"
                      className="inline-block underline decoration-white/60 underline-offset-4 hover:decoration-white text-white/90 font-helvCond text-lg"
                    >
                      Расписание и цены Алайский
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==== ВЫБЕРИ СВОЮ СТУДИЮ ==== */}
      <Section id="studios" className="bg-paper">
        <h2 className="font-bebas leading-none text-[#161A1D] text-[42px] md:text-[64px]">
          ВЫБЕРИ СВОЮ СТУДИЮ{" "}
          <span>
            <span className="text-scarlet">R</span>E
            <span className="text-scarlet">F</span>ORMA
          </span>
        </h2>

        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {studios.map((s, i) => (
            <Link
              key={s.id || i}
              to={`/studios/${s.id}`}
              className="relative block rounded-2xl overflow-hidden group"
            >
              <div className="relative w-full pb-[56.25%]">
                <picture>
                  <source type="image/avif" srcSet={asAvif(s.img)} />
                  <img
                    src={s.img}
                    alt={s.short}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 px-4 py-1.5 bg-scarlet/90 text-white font-bebas text-lg rounded-lg shadow-md">
                {s.short}
              </div>
              <div className="absolute bottom-5 left-5 right-5 space-y-2">
                <div className="flex items-center gap-2 text-white text-lg font-helvCondBold drop-shadow">
                  <MapPin size={20} className="text-scarlet" />
                  {s.title}
                </div>
                <div className="flex items-center gap-2 text-white/90 text-base drop-shadow">
                  <Phone size={18} className="text-scarlet" />
                  <a href={`tel:${s.phone}`} className="hover:underline">
                    {s.phone}
                  </a>
                </div>
                {s.phone2 && (
                  <div className="flex items-center gap-2 text-white/90 text-base drop-shadow">
                    <Phone size={18} className="text-scarlet" />
                    <a href={`tel:${s.phone2}`} className="hover:underline">
                      {s.phone2}
                    </a>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ====== ПРЕИМУЩЕСТВА КЛУБА ====== */}
      <Section id="advantages" className=" section--bleed">
        <h2 className="font-bebas text-[42px] md:text-[52px] leading-none mb-8 pl-6 md:pl-10 text-[#161A1D]">
          ПРЕИМУЩЕСТВА КЛУБА{" "}
          <span>
            <span className="text-scarlet">R</span>
            E
            <span className="text-scarlet">F</span>
            ORMA
          </span>
        </h2>

        <Swiper
          className="w-full"
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={8}
          autoplay={{ delay: 1800, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop={true}
          slidesOffsetBefore={24}
          slidesOffsetAfter={24}
          breakpoints={{
            768: { slidesOffsetBefore: 40, slidesOffsetAfter: 40 },
          }}
          onSwiper={onSwiperInit}
        >
          {advantages.slice(0, 8).map((a, i) => (
            <SwiperSlide key={a.title || i} style={{ width: "300px" }}>
              <article className="relative group rounded-xl overflow-hidden h-[400px] flex flex-col justify-end">
                <picture>
                  <source type="image/avif" srcSet={asAvif(a.img)} />
                  <img
                    src={a.img}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                <div className="relative z-10 p-5 flex flex-col">
                  <h3 className="font-bebas text-3xl md:text-4xl text-paper leading-tight">
                    {a.title}
                  </h3>
                  <p className="font-helvCond text-base md:text-lg text-paper/90 mt-3">
                    {a.text}
                  </p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </Section>

      {/* ИНФО-БЛОК 1 */}
      <Section className="bg-paper">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h3 className="font-bebas text-[44px] md:text-[64px] leading-tight text-[#161A1D]">
              <span className="text-scarlet">R</span>
              E
              <span className="text-scarlet">F</span>
              ORMA — это современный фитнес зал
            </h3>

            <p className="mt-6 font-helvCond text-[22px] md:text-[24px] text-[#161A1D] font-normal leading-snug">
              Оборудованный гамаками, разнообразие групповых программ,
              комфортабельная SPA зона с фитобочкой, массажный кабинет
              с уютной и расслабляющей обстановкой.
            </p>

            <button
              type="button"
              onClick={openTrial}
              className="mt-10 inline-block bg-scarlet text-white font-bebas uppercase text-[22px] md:text-[26px] px-10 py-5 rounded-xl shadow-lg hover:bg-red-700 transition"
            >
              ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ
            </button>
          </div>

          <div className="order-1 md:order-2 relative rounded-xl overflow-hidden">
            <div className="pb-[66%]" />
            <picture>
              <source type="image/avif" srcSet={asAvif("/images/infoblock1.png")} />
              <img
                src="/images/infoblock1.png"
                alt="Фитнес зал ReForma"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </Section>

      {/* ИНФО-БЛОК 2 */}
      <Section className="bg-paper">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-1 relative rounded-xl overflow-hidden">
            <div className="pb-[66%]" />
            <picture>
              <source type="image/avif" srcSet={asAvif("/images/infoblock2.png")} />
              <img
                src="/images/infoblock2.png"
                alt="Команда ReForma"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          <div className="order-2 text-right">
            <h3 className="font-bebas text-[44px] md:text-[64px] leading-tight text-[#161A1D]">
              Команда <span className="text-scarlet">R</span>E
              <span className="text-scarlet">F</span>orma — настоящие профессионалы
            </h3>

            <p className="mt-6 font-helvCond text-[22px] md:text-[24px] text-[#161A1D] font-normal leading-snug">
              С многолетним опытом. Мы по-настоящему любим свою работу и сделаем всё возможное,
              чтобы посещение нашего комплекса приносило Вам только удовольствие и пользу.
            </p>

            <button
              type="button"
              onClick={openTrial}
              className="mt-10 inline-block bg-scarlet text-white font-bebas text-[22px] md:text-[26px] px-10 py-5 rounded-xl shadow-lg hover:bg-red-700 transition"
            >
              ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ
            </button>
          </div>
        </div>
      </Section>

      {/* ПОЧЕМУ ВЫБИРАЮТ */}
      <Section className="bg-paper">
        <h2 className="font-bebas text-[56px] md:text-[72px] leading-tight text-[#161A1D] mb-12">
          Почему выбирают <span className="text-scarlet">R</span>E<span className="text-scarlet">F</span>orma
        </h2>

        <div className="space-y-10">
          {whyReordered.map((w, i) => (
            <div
              key={w.n || w.title || i}
              className="grid md:grid-cols-2 items-stretch bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="relative h-[260px] sm:h-[300px] md:h-auto">
                <picture>
                  <source type="image/avif" srcSet={asAvif(w.img)} />
                  <img
                    src={w.img}
                    alt={w.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center gap-5">
                <GradientNumber
                  value={w.n ?? i + 1}
                  className="w-[140px] md:w-[180px] h-auto -mt-2 -mb-2"
                />
                <h3 className="font-bebas text-[28px] md:text-[36px] text-[#161A1D]">
                  {w.title}
                </h3>
                <div className="w-28 md:w-36 h-[8px] bg-gradient-to-r from-[#e5383b] to-[#ba181b]" />
                <p className="text-[#4b4b4b] text-[18px] md:text-[20px] leading-snug">
                  {w.text}
                </p>
                {whyExtras[i] && (
                  <p className="text-[#4b4b4b] text-[18px] md:text-[20px] leading-snug whitespace-pre-line">
                    {whyExtras[i]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* НАПРАВЛЕНИЯ */}
      <Section id="directions" className="section--bleed bg-paper">
        <h2 className="font-bebas leading-none text-[#161A1D] text-[42px] pl-6 md:pl-10 md:text-[64px]">
          ОСНОВНЫЕ НАПРАВЛЕНИЯ ТРЕНИРОВОК
          В ФИТНЕС КЛУБЕ{" "}
          <span>
            <span className="text-scarlet">R</span>E<span className="text-scarlet">F</span>ORMA
          </span>
        </h2>

        <div className="mt-8">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2200, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop
            slidesPerView="auto"
            spaceBetween={16}
            slidesOffsetBefore={24}
            slidesOffsetAfter={24}
            breakpoints={{
              640: { spaceBetween: 18 },
              1024: { spaceBetween: 20 },
              768: { slidesOffsetBefore: 40, slidesOffsetAfter: 40 },
            }}
            className="w-full"
            onSwiper={onSwiperInit}
          >
            {directions.map((d, i) => (
              <SwiperSlide key={d.slug || i} style={{ width: 360 }}>
                <Link
                  to={`/directions/${d.slug}`}
                  className="relative block aspect-square rounded-2xl overflow-hidden group"
                >
                  <picture>
                    <source type="image/avif" srcSet={asAvif(d.img)} />
                    <img
                      src={d.img}
                      alt={d.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-black/25" />
                  <div
                    className="absolute left-6 top-6 px-6 py-2.5 rounded-full
                               text-[16px] md:text-[20px] font-bebas uppercase tracking-wide
                               bg-scarlet/95 text-white shadow-lg"
                  >
                    {d.tag || "Movement"}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="font-bebas text-white text-3xl md:text-4xl">
                      {d.title}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Section>

      {/* CTA */}
      <Section id="cta">
        <div className="grid md:grid-cols-2 gap-0 items-stretch">
          <div className="bg-white rounded-2xl p-10 md:p-16 flex flex-col justify-center text-center md:text-left">
            <h3 className="font-bebas text-scarlet leading-[0.9] tracking-tight text-[52px] md:text-[72px]">
              НЕ ЗНАЕШЬ, КАКОЕ
              <br />
              НАПРАВЛЕНИЕ ВЫБРАТЬ?
            </h3>

            <p className="mt-6 text-ink/80 font-helvCond text-lg md:text-xl leading-relaxed">
              Если вы давно хотите начать заниматься спортом, но не можете
              определиться с направлением — записывайтесь на пробную тренировку
              в одну из студий ReForma
            </p>

            <div className="mt-8">
              <button
                type="button"
                onClick={openTrial}
                className="inline-block bg-scarlet text-white font-bebas px-6 py-3 rounded-lg text-lg md:text-xl transition hover:bg-scarlet/90 "
              >
                ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-soft relative">
            <div className="pb-[66%]" />
            <picture>
              <source type="image/avif" srcSet={asAvif("/images/cta.jpg")} />
              <img
                src="/images/cta.jpg"
                alt="Тренер ReForma"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </Section>

      {/* ОТЗЫВЫ */}
      <Section id="reviews" className="section--bleed bg-paper">
        <h2 className="font-bebas leading-none text-[#161A1D] text-[42px] pl-6 md:pl-10 md:text-[64px]">
          ОТЗЫВЫ НАШИХ ГОСТЕЙ
        </h2>

        <div className="mt-8">
          <Swiper
            modules={[Autoplay]}
            slidesPerView="auto"
            spaceBetween={20}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={5000}
            loop={true}
            allowTouchMove={true}
            grabCursor={true}
            slidesOffsetBefore={24}
            slidesOffsetAfter={24}
            breakpoints={{
              768: { slidesOffsetBefore: 40, slidesOffsetAfter: 40 },
            }}
            className="w-full"
            onSwiper={onSwiperInit}
          >
            {(reviews || []).map((r, i) => {
              const src = typeof r === "string" ? r : r.img;
              return (
                <SwiperSlide key={src || i} style={{ width: 280 }}>
                  <div className="rounded-2xl overflow-hidden bg-black/5 relative">
                    <div className="pb-[171%]" />
                    <picture>
                      <source type="image/avif" srcSet={asAvif(src)} />
                      <img
                        src={src}
                        alt={`Отзыв ${i + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </Section>
    </>
  );
}
