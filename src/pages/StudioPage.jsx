// src/pages/StudioPage.jsx
import {
  useMemo,
  useState,
  useEffect,
  useCallback,
  lazy,
  Suspense,
  memo,
} from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Section from "../components/Section.jsx";
import {
  directions as allDirections,
  studios as studiosBase,
} from "../data/homeData.js";
import { studiosPageData } from "../data/studiosPageData.js";
import { asAvif } from "../lib/avif.js";

// Лениво грузим модалку
const TrialModal = lazy(() => import("../components/TrialModal.jsx"));

/* ===== Helper: AVIF + fallback ===== */
function AvifImg({ src, alt = "", className = "", imgProps = {} }) {
  if (!src) return null;
  const avif = asAvif(src);
  return (
    <picture>
      {avif && <source type="image/avif" srcSet={avif} />}
      <img src={src} alt={alt} className={className} {...imgProps} />
    </picture>
  );
}

/* ===================== ВСПОМОГАТЕЛЬНЫЕ ===================== */
const fmt = (n) => {
  const s = typeof n === "number" ? n.toLocaleString("ru-RU") : String(n ?? "");
  return s.replace(/\s/g, "\u00A0");
};

/* ===================== МЕМо-компоненты ===================== */
// Цена тренировки
const PriceRow = memo(function PriceRow({ name, value, monthly, months }) {
  const displayValue = typeof value === "number" ? fmt(value) : String(value ?? "");
  const showBreakdown = typeof monthly === "number" && typeof months === "number";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-2 sm:gap-3 items-start py-2 border-b border-ink/10 last:border-b-0">
      <div className="min-w-0 font-helvCond text-[17px] sm:text-[18px] md:text-[20px] text-[#161A1D] break-words hyphens-auto">
        {name}
      </div>
      <div className="font-bebas text-[19px] sm:text-[20px] md:text-[24px] text-[#161A1D] tabular-nums leading-tight text-right sm:text-left">
        <span>{displayValue}</span>
        {showBreakdown && (
          <span className="block sm:inline sm:ml-1">
            {` (\u00A0${fmt(monthly)}\u00A0×\u00A0${months}\u00A0)`}
          </span>
        )}
      </div>
    </div>
  );
});

// Ряд услуги (массаж/SPA)
const ServiceRow = memo(function ServiceRow({ name, duration, price, topPrice }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto,auto] gap-2 sm:gap-3 items-start py-2 border-b border-ink/10 last:border-b-0">
      <div className="min-w-0 font-helvCond text-[17px] sm:text-[18px] md:text-[20px] text-[#161A1D] break-words hyphens-auto">
        {name}
      </div>
      <div className="text-[#161A1D] font-helvCond text-[15px] sm:text-[16px] md:text-[18px] opacity-80 leading-tight">
        {duration}
      </div>
      <div className="font-bebas text-[19px] sm:text-[20px] md:text-[24px] text-[#161A1D] tabular-nums leading-tight">
        {price ? <span>{price}</span> : <span className="opacity-70">—</span>}
        {topPrice && (
          <span className="block sm:inline sm:ml-2 text-ink/70 text-[15px] sm:text-[16px] md:text-[20px] leading-tight">
            (топ мастер {topPrice})
          </span>
        )}
      </div>
    </div>
  );
});

/* ===================== ЛЕНИВЫЙ MAP IFAME ===================== */
function MapEmbed({ address }) {
  const ref = useCallback((node) => {
    if (!node) return;
    const src = `https://maps.google.com/maps?q=${encodeURIComponent(
      address
    )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            node.src = src;
            io.disconnect();
          }
        });
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(node);
  }, [address]);

  return (
    <iframe
      title="map"
      ref={ref}
      className="w-full h-[360px] md:h-[520px]"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
    />
  );
}

/* ===================== ПРОСТАЯ КАРУСЕЛЬ ===================== */
const InfoCarousel = memo(function InfoCarousel({ images = [] }) {
  const pics = (Array.isArray(images) ? images : []).filter(Boolean);
  const [i, setI] = useState(0);
  if (pics.length === 0) return null;

  const next = useCallback(() => setI((p) => (p + 1) % pics.length), [pics.length]);
  const prev = useCallback(() => setI((p) => (p - 1 + pics.length) % pics.length), [pics.length]);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const reduced = mq?.matches;
    if (reduced || pics.length < 2) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next, pics.length]);

  if (pics.length === 1) {
    return (
      <div className="relative rounded-xl overflow-hidden">
        <div className="pb-[62%]" />
        <AvifImg
          src={pics[0]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          imgProps={{ loading: "lazy", decoding: "async" }}
        />
      </div>
    );
  }

  return (
    <div
      className="group relative rounded-xl overflow-hidden"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
      tabIndex={0}
      aria-roledescription="carousel"
    >
      <div className="pb-[62%]" />
      {pics.map((src, idx) => (
        <div
          key={src + idx}
          className={`absolute inset-0 transition-opacity duration-500 ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
        >
          <AvifImg
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            imgProps={{ loading: idx === i ? "eager" : "lazy", decoding: "async" }}
          />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/25 to-transparent" />

      <button
        type="button"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 h-11 min-w-11 px-3 rounded-full border border-white/20 bg-black/35 backdrop-blur-sm text-white shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100 transition-opacity hover:bg-black/45 focus:outline-none focus:ring-2 focus:ring-white/50 flex items-center justify-center"
        aria-label="Предыдущая фотография"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M15 18l-6-6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-11 min-w-11 px-3 rounded-full border border-white/20 bg-black/35 backdrop-blur-sm text-white shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100 transition-opacity hover:bg-black/45 focus:outline-none focus:ring-2 focus:ring-white/50 flex items-center justify-center"
        aria-label="Следующая фотография"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M9 6l6 6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {pics.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Слайд ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              idx === i ? "w-6 bg-white shadow" : "w-2.5 bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
});

/* ===================== СТРАНИЦА ===================== */
export default function StudioPage() {
  const { id } = useParams(); // st-aly | st-alm
  const { hash } = useLocation();
  const base = studiosBase.find((s) => s.id === id);
  const data = studiosPageData[id];
  const [modalOpen, setModalOpen] = useState(false);

  // Предзагрузка hero (AVIF + fallback)
  useEffect(() => {
    const url = data?.heroImage || base?.img;
    if (!url) return;

    const links = [];

    const add = (href) => {
      if (!href) return;
      const l = document.createElement("link");
      l.rel = "preload";
      l.as = "image";
      l.href = href;
      document.head.appendChild(l);
      links.push(l);
    };

    add(asAvif(url));
    add(url);

    return () => {
      links.forEach((l) => document.head.removeChild(l));
    };
  }, [data?.heroImage, base?.img]);

  // Глобальное событие на открытие модалки
  useEffect(() => {
    const open = () => setModalOpen(true);
    window.addEventListener("open-trial-modal", open);
    return () => window.removeEventListener("open-trial-modal", open);
  }, []);

  // Автоскролл к сетке расписания по хэшу #schedule
  useEffect(() => {
    if (hash !== "#schedule") return;
    const el = document.getElementById("schedule");
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [hash]);

  const onOpenModal = useCallback(() => setModalOpen(true), []);
  const onCloseModal = useCallback(() => setModalOpen(false), []);

  if (!base || !data) {
    return (
      <div className="edge py-24 text-center">
        <h1 className="font-bebas text-5xl">Студия не найдена</h1>
        <a href="/#studios" className="btn btn--accent mt-6">
          К студиям
        </a>
      </div>
    );
  }

  const studioDirections = useMemo(() => {
    const set = new Set((data.directionsList || []).map((t) => t.toLowerCase()));
    return allDirections.filter((d) => set.has((d.title || "").toLowerCase()));
  }, [data]);

  const city = data?.info?.city || "ТАШКЕНТ";
  const pricing = data?.pricing;

  return (
    <>
      {/* ========= HERO ========= */}
      <section className="relative">
        <div className="relative min-h-[78svh] sm:min-h-[82svh] md:min-h-[72vh]">
          <AvifImg
            src={data.heroImage || base.img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            imgProps={{ fetchpriority: "high", decoding: "async" }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          <div className="edge relative z-10 h-full">
            <div
              className="h-full w-full max-w-[1200px] mx-auto
                         flex flex-col items-center justify-center text-center gap-2
                         px-6 md:px-10
                         pb-14 sm:pb-20 md:pb-20
                         translate-y-[14svh] sm:translate-y-[16svh] md:translate-y-[8svh]"
            >
              <nav className="text-paper/80 text-xs md:text-sm font-helvCond mb-1">
                <Link to="/" className="hover:underline">
                  Главная
                </Link>
                <span className="opacity-70 mx-2">/</span>
                <span className="opacity-90">{data.titleHero}</span>
              </nav>

              <div className="uppercase text-paper/80 font-helvCond tracking-wide">
                студия фитнеса
              </div>

              <div
                className="mt-1 font-xolo font-bold leading-none
                           tracking-[-2px] sm:tracking-[-3px] md:tracking-[-5px]
                           text-[52px] sm:text-[64px] md:text-[80px]"
              >
                <span className="text-scarlet">R</span>
                <span className="text-white">e</span>
                <span className="text-scarlet">F</span>
                <span className="text-white">orma</span>
              </div>

              <h1
                className="mt-1 font-bebas text-white leading-[0.9] tracking-tight
                           text-[52px] sm:text-[64px] md:text-[96px]"
              >
                {data.titleHero}
              </h1>

              <button
                type="button"
                onClick={onOpenModal}
                className="mt-5 inline-block bg-scarlet hover:bg-scarlet/90 text-white
                           font-bebas px-6 py-3 rounded-full text-lg md:text-xl"
              >
                ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======= Карточка Адрес/График ======= */}
      <Section className="bg-ink">
        <div className="relative -mt-[14svh] sm:-mt-[16svh] md:-mt-32 lg:-mt-40 xl:-mt-48 z-20">
          <div className="mx-auto w-[94%] md:w-2/3 lg:w-3/5">
            <div className="bg-white rounded-[22px] p-4 md:p-6 lg:p-8 shadow-soft">
              <div className="grid md:grid-cols-[1.05fr,1fr] gap-6 items-stretch">
                <InfoCarousel
                  images={
                    data.info.photos && data.info.photos.length
                      ? data.info.photos
                      : [data.info.photo]
                  }
                />
                <div className="flex flex-col">
                  <div className="bg-ink/5 rounded-xl p-5">
                    <h3 className="font-bebas text-[24px] md:text-[28px] leading-none">
                      {data.info.addressTitle}
                    </h3>
                    <div className="mt-2">
                      <div className="uppercase font-bebas text-scarlet text-lg leading-none">
                        {city}
                      </div>
                      <p className="mt-1 font-helvCond text-[18px] md:text-[20px]">
                        {data.info.address}
                      </p>
                    </div>
                  </div>

                  <div className="bg-ink/5 rounded-xl p-5 mt-4">
                    <h3 className="font-bebas text-[24px] md:text-[28px] leading-none">
                      {data.info.hoursTitle}
                    </h3>
                    <p className="mt-2 font-helvCond text-[18px] md:text-[20px] whitespace-pre-line">
                      {data.info.hours}
                    </p>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={onOpenModal}
                      className="inline-block bg-scarlet hover:bg-scarlet/90 text-white font-bebas px-6 py-3 rounded-full text-lg"
                    >
                      {data.info.ctaText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ================== Карта ================== */}
      <Section className="bg-ink">
        <h2 className="font-bebas text-paper text-[28px] md:text-[36px] mb-6 leading-tight">
          СТУДИЯ{" "}
          <span>
            <span className="text-scarlet">R</span>E<span className="text-scarlet">F</span>ORMA
          </span>{" "}
          {data.titleHero} НА КАРТЕ
        </h2>
        <div className="rounded-2xl overflow-hidden border border-paper/10">
          <MapEmbed address={data.info.address} />
        </div>
      </Section>

      {/* ===== Преимущества ===== */}
      <Section className="bg-paper">
        <h2 className="font-bebas text-[32px] md:text-[44px] leading-tight text-[#161A1D] mb-6">
          {data.advantages.title}
        </h2>
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-soft">
          <div className="grid lg:grid-cols-[1.15fr,1fr] gap-8 items-center">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="pb-[65%]" />
              <AvifImg
                src={data.advantages.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                imgProps={{ loading: "lazy", decoding: "async" }}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.advantages.blocks.map((b, i) => (
                <div key={b.title + i}>
                  <h3 className="font-bebas text-[20px] md:text-[22px]">{b.title}</h3>
                  <p className="font-helvCond text-[18px] md:text-[20px] text-[#161A1D] mt-1">
                    {b.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ===== Направления ===== */}
      <Section className="bg-paper">
        <h2 className="font-bebas text-[32px] md:text-[44px] leading-tight text-[#161A1D]">
          {data.directionsTitle}
        </h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {studioDirections.map((d) => {
            const href =
              d.slug ||
              encodeURIComponent(d.title.trim().toLowerCase().replace(/\s+/g, "-"));
            return (
              <a
                key={d.title}
                href={`/directions/${href}`}
                className="relative block rounded-xl overflow-hidden group"
              >
                <AvifImg
                  src={d.img}
                  alt={d.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  imgProps={{ loading: "lazy", decoding: "async" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="font-bebas text-white leading-none drop-shadow text-lg md:text-xl lg:text-2xl">
                    {d.title}
                  </div>
                </div>
                <div className="pb-[85%]" />
              </a>
            );
          })}
        </div>
      </Section>

      {/* ====== ЦЕНЫ: ТРЕНИРОВКИ ====== */}
      {pricing && (
        <Section className="bg-paper">
          <h2 className="font-bebas text-[32px] md:text-[44px] leading-tight text-[#161A1D] mb-2">
            Цены на тренировки
          </h2>
          <p className="text-ink/80 font-helvCond mb-5">{pricing.note}</p>

          <div className="grid gap-6 md:grid-cols-2">
            {pricing.fitness?.training_08_19?.length ? (
              <div className="bg-white rounded-2xl p-5 shadow-soft">
                <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">
                  Тренировки (08:00–19:00)
                </h3>
                {pricing.fitness.training_08_19.map((i) => (
                  <PriceRow key={i.name} {...i} />
                ))}
              </div>
            ) : null}

            {pricing.fitness?.training_19_21?.length ? (
              <div className="bg-white rounded-2xl p-5 shadow-soft">
                <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">
                  Тренировки (19:00–21:00)
                </h3>
                {pricing.fitness.training_19_21.map((i) => (
                  <PriceRow key={i.name} {...i} />
                ))}
              </div>
            ) : null}

            {pricing.fitness?.specials?.length ? (
              <div className="bg-white rounded-2xl p-5 shadow-soft">
                <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">
                  Аэройога / Аэростретчинг / Йога для беременных
                </h3>
                {pricing.fitness.specials.map((i) => (
                  <PriceRow key={i.name} {...i} />
                ))}
              </div>
            ) : null}

            {pricing.fitness?.kpop?.length ? (
              <div className="bg-white rounded-2xl p-5 shadow-soft">
                <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">K-pop</h3>
                {pricing.fitness.kpop.map((i) => (
                  <PriceRow key={i.name} {...i} />
                ))}
              </div>
            ) : null}

            {pricing.fitness?.jumping?.length ? (
              <div className="bg-white rounded-2xl p-5 shadow-soft">
                <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">
                  Джампинг фитнес
                </h3>
                {pricing.fitness.jumping.map((i) => (
                  <PriceRow key={i.name} {...i} />
                ))}
              </div>
            ) : null}

            {pricing.fitness?.extras?.length ? (
              <div className="bg-white rounded-2xl p-5 shadow-soft md:col-span-2">
                <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">Дополнительно</h3>
                {pricing.fitness.extras.map((i) => (
                  <PriceRow key={i.name} {...i} />
                ))}
              </div>
            ) : null}

            {pricing.fitness?.oneDirection?.length ? (
              <div className="bg-white rounded-2xl p-5 shadow-soft md:col-span-2">
                <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">
                  Абонементы на 1 направление
                </h3>
                {pricing.fitness.oneDirection.map((i) => (
                  <PriceRow key={i.name} {...i} />
                ))}
              </div>
            ) : null}
          </div>
        </Section>
      )}

      {/* ====== ЦЕНЫ: МАССАЖ И SPA ====== */}
      {pricing?.massageSpa && (
        <Section className="bg-paper">
          <h2 className="font-bebas text-[32px] md:text-[44px] leading-tight text-[#161A1D] mb-4">
            Массаж и SPA
          </h2>

          {pricing.massageSpa.services?.length ? (
            <div className="bg-white rounded-2xl p-5 shadow-soft mb-6">
              <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">
                {pricing.massageSpa.servicesTitle}
              </h3>
              {pricing.massageSpa.services.map((s) => (
                <ServiceRow key={`${s.name}-${s.duration}`} {...s} />
              ))}
            </div>
          ) : null}

          {pricing.massageSpa.spa?.length ? (
            <div className="bg-white rounded-2xl p-5 shadow-soft mb-6">
              <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">
                {pricing.massageSpa.spaTitle}
              </h3>
              <div className="divide-y divide-ink/10">
                {pricing.massageSpa.spa.map((p) => (
                  <div key={p.name} className="py-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-helvCond text-[18px] md:text-[20px] text-[#161A1D] break-words hyphens-auto">
                          {p.name}
                        </div>
                        <div className="text-ink/80 font-helvCond text-[14px] md:text-[16px] break-words hyphens-auto">
                          {p.includes}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bebas text-[20px] md:text-[24px] tabular-nums leading-tight">
                          {p.price}
                        </div>
                        <div className="text-ink/70 font-helvCond text-[14px] md:text-[16px] leading-tight">
                          {p.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {pricing.massageSpa.premiumTitle && pricing.massageSpa.premium?.length ? (
            <div className="bg-white rounded-2xl p-5 shadow-soft mb-6">
              <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">
                {pricing.massageSpa.premiumTitle}
              </h3>
              <div className="divide-y divide-ink/10">
                {pricing.massageSpa.premium.map((p) => (
                  <div key={p.name} className="py-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-helvCond text-[18px] md:text-[20px] text-[#161A1D] break-words hyphens-auto">
                          {p.name}
                        </div>
                        <div className="text-ink/80 font-helvCond text-[14px] md:text-[16px] break-words hyphens-auto">
                          {p.includes}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bebas text-[20px] md:text-[24px] tabular-nums leading-tight">
                          {p.price}
                        </div>
                        <div className="text-ink/70 font-helvCond text-[14px] md:text-[16px] leading-tight">
                          {p.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {pricing.massageSpa.hardware?.length ? (
            <div className="bg-white rounded-2xl p-5 shadow-soft">
              <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">
                {pricing.massageSpa.hardwareTitle}
              </h3>
              <div className="divide-y divide-ink/10">
                {pricing.massageSpa.hardware.map((h) => (
                  <div
                    key={h.name}
                    className="flex flex-wrap items-baseline justify-between gap-3 py-2"
                  >
                    <div className="min-w-0 font-helvCond text-[18px] md:text-[20px] text-[#161A1D] break-words hyphens-auto">
                      {h.name}
                    </div>
                    <div className="font-bebas text-[20px] md:text-[24px] tabular-nums leading-tight">
                      {h.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </Section>
      )}

      {/* ===== Расписание ===== */}
      <Section id="schedule" className="bg-paper scroll-mt-24 md:scroll-mt-32">
        <h2 className="font-bebas text-[32px] md:text-[44px] leading-tight text-[#161A1D] mb-6">
          {data.scheduleTitle}
        </h2>

        {(() => {
          const values = Object.values(data.schedule || {});
          const first = values[0];
          const isMultiHall = first && typeof first === "object" && !Array.isArray(first);

          if (!isMultiHall) {
            return (
              <div className="grid md:grid-cols-3 xl:grid-cols-6 gap-4">
                {Object.entries(data.schedule).map(([day, items]) => (
                  <div key={day} className="bg-white rounded-2xl p-4 shadow-soft">
                    <div className="bg-scarlet text-white rounded-lg px-3 py-2 font-bebas text-lg text-center mb-3">
                      {day}
                    </div>
                    <ul className="space-y-2">
                      {items.map((t, i) => (
                        <li
                          key={day + i}
                          className="bg-ink/5 rounded-md px-3 py-2 text-[14px] font-helvCond break-words hyphens-auto"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          }

          return (
            <div className="space-y-10">
              {Object.entries(data.schedule).map(([hallName, hallSchedule]) => (
                <div key={hallName}>
                  <div className="font-bebas text-[26px] md:text-[32px] mb-4">
                    {hallName}
                  </div>
                  <div className="grid md:grid-cols-3 xl:grid-cols-6 gap-4">
                    {Object.entries(hallSchedule).map(([day, items]) => (
                      <div key={hallName + day} className="bg-white rounded-2xl p-4 shadow-soft">
                        <div className="bg-scarlet text-white rounded-lg px-3 py-2 font-bebas text-lg text-center mb-3">
                          {day}
                        </div>
                        <ul className="space-y-2">
                          {items.map((t, i) => (
                            <li
                              key={hallName + day + i}
                              className="bg-ink/5 rounded-md px-3 py-2 text-[14px] font-helvCond break-words hyphens-auto"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </Section>

      {/* ===== CTA ===== */}
      <Section className="bg-paper">
        <div className="relative rounded-2xl overflow-hidden shadow-soft">
          <AvifImg
            src={data.cta.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            imgProps={{ loading: "lazy", decoding: "async" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />

          <div className="relative z-10 flex items-center h-[360px] sm:h-[440px] md:h-[520px] lg:h-[580px]">
            <div className="px-7 md:px-12 lg:px-14 w-full">
              <div className="max-w-[720px]">
                <h3
                  className="font-bebas text-white leading-[0.9] tracking-tight
                             text-[40px] sm:text-[56px] md:text-[72px] lg:text-[84px]"
                >
                  НЕ ЗНАЕШЬ, КАКОЕ
                  <br />
                  НАПРАВЛЕНИЕ ВЫБРАТЬ?
                </h3>

                <p
                  className="mt-5 text-white/90 font-helvCond leading-relaxed
                             text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px]"
                >
                  {data.cta.text}
                </p>

                <button
                  type="button"
                  onClick={onOpenModal}
                  className="mt-7 inline-flex items-center justify-center
                             rounded-full bg-scarlet hover:bg-scarlet/90
                             text-white font-bebas tracking-wide
                             text-[18px] sm:text-[19px] md:text-[20px]
                             px-6 py-3.5 md:px-8 md:py-4 shadow-md"
                >
                  {data.cta.button}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ===== Модалка записи (лениво) ===== */}
      <Suspense fallback={null}>
        <TrialModal open={modalOpen} onClose={onCloseModal} />
      </Suspense>
    </>
  );
}
