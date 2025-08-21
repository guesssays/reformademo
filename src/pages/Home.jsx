import Section from '../components/Section.jsx'
import { advantages, why, directions, studios, reviews } from '../data/homeData.js'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/autoplay';
import { MapPin, Phone } from "lucide-react";

// ---- В ЭТОМ ЖЕ ФАЙЛЕ, ВЫШЕ return ----
function GradientNumber({ value, className = "" }) {
  const id = `grad-${value}`;
  return (
    <svg
      className={className}
      viewBox="0 0 140 110"  // подогнанный бокс под 2-цифровые номера
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e5383b" />
          <stop offset="100%" stopColor="#ba181b" />
        </linearGradient>
      </defs>
      {/* без заливки, только штрих градиентом */}
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
}

// Доп. текст для карточек (по референсу и твоим пожеланиям)
const whyExtras = [
  // 1 — гибкая система ценообразования
  `Гибкие абонементы: разовые, месячные, квартальные; дневные/вечерние тарифы, семейные
  и парные предложения. Заморозка без скрытых комиссий, прозрачные правила возвратов.
  Спец-цены для новичков, студентов и корпоративных клиентов.`,
  // 2 — большой выбор занятий / услуг
  `Широкая сетка направлений: функциональные тренировки, TRX, стретчинг, пилон, аэройога,
  body&mind-программы, персональные тренировки и реабилитация. Удобное расписание утром,
  днём и вечером — с быстрым онлайн-записыванием.`,
  // 3 — качество и экспертиза
  `Сертифицированные тренеры с опытом 5+ лет. Индивидуальная регрессия/прогрессия нагрузки,
  техника под контролем. Зал оснащён современным оборудованием, поддерживаем санитарные
  нормы и комфортный микроклимат.`,
  // 4 — система лояльности
  `Бонусы за каждую тренировку, кешбэк баллами, подарочные сертификаты. Дни открытых дверей,
  акции к праздникам, скидки на продление абонементов и рекомендации друзьям.`
];


export default function Home(){
  return (
    <>
{/* ========== HERO (full-bleed, БЕЗ wrapper) ========== */}
<section id="hero" className="relative">
  <div className="bleed">
    <div className="edge">
      <div className="rounded-3xl overflow-hidden">
        {/* увеличенная высота и всё по центру */}
        <div className="relative min-h-[90vh] flex items-center justify-center text-center">

          <img
            src="/images/hero.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
<div className="absolute inset-0 bg-ink/60" />
          <div className="relative z-10 p-6 md:p-10 flex flex-col items-center">
{/* логотип */}
<h1 className="font-xolo font-bold text-[80px] md:text-[100px] leading-none tracking-[-8px] mb-4">
  <span className="text-scarlet">R</span>
  <span className="text-paper">e</span>
  <span className="text-scarlet">F</span>
  <span className="text-paper">orma</span>
</h1>
     {/* подзаголовок */}
<p className="text-paper/90 font-bebas max-w-2xl text-lg tracking-wide mb-3">
  Уютные студии, женская атмосфера и программы тренировок для любого уровня.
</p>
{/* кнопка */}
<a 
  href="#cta" 
  className="btn btn--accent font-bebas  text-lg tracking-wide mt-4"
>
  ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ
</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



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
  autoplay={{ delay: 1500, disableOnInteraction: false }}
  loop={true}
  slidesOffsetBefore={24}
  slidesOffsetAfter={24}
  breakpoints={{
    768: { slidesOffsetBefore: 40, slidesOffsetAfter: 40 }
  }}
>

    {advantages.slice(0,8).map((a,i)=>(
<SwiperSlide key={i} style={{ width: "300px" }}>
  <article className="relative group rounded-xl overflow-hidden h-[400px] flex flex-col justify-end">
    <img src={a.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
    
    {/* равномерное затемнение */}
    <div className="absolute inset-0 bg-black/50" />
    
    {/* оставляем градиент для красивого эффекта снизу */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
    
    <div className="relative z-10 p-5 flex flex-col">
      <h3 className="font-bebas text-3xl md:text-4xl text-paper leading-tight">{a.title}</h3>
      <p className="font-helvCond text-base md:text-lg text-paper/90 mt-3">{a.text}</p>
      <button className="mt-5 inline-block bg-scarlet text-paper font-helvCondBold uppercase text-base tracking-wide rounded-[24px] px-6 py-3 hover:bg-crimson transition">
        Подробнее
      </button>
    </div>
  </article>
</SwiperSlide>


    ))}
  </Swiper>
</Section>





{/* ИНФО-БЛОК 1 */}
<Section className="bg-paper">
  <div className="grid md:grid-cols-2 gap-10 items-center">
    {/* Текстовая часть */}
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

      <a
        href="#cta"
        className="mt-10 inline-block bg-scarlet text-white font-bebas  uppercase text-[22px] md:text-[26px] px-10 py-5 rounded-xl shadow-lg hover:bg-red-700 transition"
      >
        ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ
      </a>
    </div>

    {/* Фото */}
    <div className="order-1 md:order-2">
      <img
        src="/images/info-1.svg"
        alt="Фитнес зал ReForma"
        className="rounded-xl w-full h-auto"
      />
    </div>
  </div>
</Section>


{/* ИНФО-БЛОК 2 */}
<Section className="bg-paper">
  <div className="grid md:grid-cols-2 gap-10 items-center">
    {/* Фото слева */}
    <div className="order-1">
      <img
        src="/images/infoblock2.png"
        alt="Команда ReForma"
        className="rounded-xl w-full h-auto"
      />
    </div>

    {/* Текст справа */}
    <div className="order-2 text-right">
      <h3 className="font-bebas text-[44px] md:text-[64px] leading-tight text-[#161A1D]">
        Команда <span className="text-scarlet">R</span>E
        <span className="text-scarlet">F</span>orma — настоящие профессионалы
      </h3>

      <p className="mt-6 font-helvCond text-[22px] md:text-[24px] text-[#161A1D] font-normal leading-snug">
        С многолетним опытом. Мы по-настоящему любим свою работу и сделаем всё возможное, 
        чтобы посещение нашего комплекса приносило Вам только удовольствие и пользу.
      </p>

      <a
        href="#cta"
        className="mt-10 inline-block bg-scarlet text-white font-bebas  text-[22px] md:text-[26px] px-10 py-5 rounded-xl shadow-lg hover:bg-red-700 transition"
      >
       ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ
      </a>
    </div>
  </div>
</Section>

{/* ПОЧЕМУ ВЫБИРАЮТ */}
<Section className="bg-paper">
  <h2 className="font-bebas text-[56px] md:text-[72px] leading-tight text-[#161A1D] mb-12">
    Почему выбирают{" "}
    <span className="text-scarlet">R</span>E<span className="text-scarlet">F</span>orma
  </h2>

  <div className="space-y-10">
    {why.slice(0, 4).map((w, i) => (
<div
  key={i}
  className="grid md:grid-cols-2 items-stretch bg-white rounded-2xl shadow-lg overflow-hidden"
>
  {/* Картинка слева */}
  <div className="relative h-[260px] sm:h-[300px] md:h-auto md:min-h-full">
    <img
      src={w.img}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>

  {/* Контент справа */}
  <div className="p-8 md:p-12 flex flex-col justify-center gap-5">
    <GradientNumber
      value={w.n ?? i + 1}
      className="w-[140px] md:w-[180px] h-auto -mt-2 -mb-2"
    />
    <h3 className="font-bebas text-[28px] md:text-[36px] text-[#161A1D]">
      {w.title}
    </h3>
    <div className="w-28 md:w-36 h-[8px] bg-gradient-to-r from-[#e5383b] to-[#ba181b]" />
    <p className="text-[#4b4b4b] text-[18px] md:text-[20px] leading-snug">{w.text}</p>
    <p className="text-[#4b4b4b] text-[18px] md:text-[20px] leading-snug">{whyExtras[i]}</p>
  </div>
</div>

    ))}
  </div>
</Section>




<Section id="directions" className="section--bleed bg-paper">
  {/* Заголовок */}
  <h2 className="font-bebas leading-none text-[#161A1D] text-[42px] pl-6 md:pl-10 md:text-[64px]">
    ОСНОВНЫЕ НАПРАВЛЕНИЯ ТРЕНИРОВОК
    В ФИТНЕС КЛУБЕ{" "}
    <span>
      <span className="text-scarlet">R</span>E<span className="text-scarlet">F</span>ORMA
    </span>
  </h2>

  {/* Карусель */}
  <div className="mt-8">
   <Swiper
  modules={[Autoplay]}
  autoplay={{ delay: 2200, disableOnInteraction: false }}
  loop
  slidesPerView="auto"
  spaceBetween={16}
  slidesOffsetBefore={24}
  slidesOffsetAfter={24}
  breakpoints={{
    640: { spaceBetween: 18 },
    1024: { spaceBetween: 20 },
    768: { slidesOffsetBefore: 40, slidesOffsetAfter: 40 }
  }}
  className="w-full"
>

      {directions.map((d, i) => (
       <SwiperSlide key={i} style={{ width: 360 }}> {/* ещё +20px шире */}
  <a
    href={`#direction-${i}`}
    className="relative block aspect-square rounded-2xl overflow-hidden group"
  >
    {/* Фон — фото */}
    <img
      src={d.img}
      alt={d.title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />

    {/* Затемнение */}
    <div className="absolute inset-0 bg-black/25"></div>
{/* Бейдж (ещё больше) */}
<div
  className="absolute left-6 top-6 px-6 py-2.5 rounded-full
             text-[16px] md:text-[20px] font-bebas uppercase tracking-wide
             bg-scarlet/95 text-white shadow-lg"
>
  {d.tag || "Movement"}
</div>


    {/* Текст (увеличен) */}
    <div className="absolute inset-x-0 bottom-0 p-6">
      <div className="font-bebas text-white text-3xl md:text-4xl 
                     ">
        {d.title}
      </div>
    </div>
  </a>
</SwiperSlide>

      ))}
    </Swiper>
  </div>
</Section>


{/* СТУДИИ */}
<Section id="studios" className="bg-paper">
  {/* Заголовок */}
 <h2 className="font-bebas leading-none text-[#161A1D] text-[42px] md:text-[64px]">
    ВЫБЕРИ СВОЮ СТУДИЮ{" "}
    <span>
      <span className="text-scarlet">R</span>E
      <span className="text-scarlet">F</span>ORMA
    </span>
  </h2>

  {/* Сетка карточек */}
  <div className="mt-8 grid md:grid-cols-2 gap-5">
    {studios.map((s, i) => (
      <a
        key={i}
        href={`tel:${s.phone}`}
        className="relative block rounded-2xl overflow-hidden group"
      >
        {/* Фон */}
        <img
          src={s.img}
          alt={s.short}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Градиент */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        {/* Краткое название сверху */}
        <div className="absolute top-4 left-4 px-4 py-1.5 bg-scarlet/90 text-white font-bebas text-lg rounded-lg shadow-md">
          {s.short}
        </div>

        {/* Адрес и телефон */}
        <div className="absolute bottom-5 left-5 right-5 space-y-2">
          <div className="flex items-center gap-2 text-white text-lg font-helvCondBold drop-shadow">
            <MapPin size={20} className="text-scarlet" />
            {s.title}
          </div>
          <div className="flex items-center gap-2 text-white/90 text-base drop-shadow">
            <Phone size={18} className="text-scarlet" />
            {s.phone}
          </div>
        </div>
      </a>
    ))}
  </div>
</Section>


{/* CTA */}
<Section id="cta">
  <div className="grid md:grid-cols-2 gap-0 items-stretch">
    {/* Левая часть */}
    <div className="bg-white rounded-2xl p-10 md:p-16  flex flex-col justify-center text-center md:text-left">
      <h3 className="font-bebas text-scarlet leading-[0.9] tracking-tight text-[52px] md:text-[72px]">
        НЕ ЗНАЕШЬ, КАКОЕ 
        <br />
        НАПРАВЛЕНИЕ ВЫБРАТЬ?
      </h3>

      {/* Подзаголовок */}
      <p className="mt-6 text-ink/80 font-helvCond text-lg md:text-xl leading-relaxed">
        Если вы давно хотите начать заниматься спортом, но не можете
        определиться с направлением — записывайтесь на пробную тренировку
        в одну из студий ReForma
      </p>

      {/* Кнопка */}
      <div className="mt-8">
        <a
          href="tel:+998933775697"
          className="inline-block bg-scarlet text-white font-bebas 
                     px-6 py-3 rounded-lg text-lg md:text-xl 
                     transition hover:bg-scarlet/90 "
        >
          ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ
        </a>
      </div>
    </div>

    {/* Правая часть (фото) */}
    <div className="rounded-2xl overflow-hidden shadow-soft">
      <img
        src="/images/cta.jpg"
        alt="Тренер ReForma"
        className="w-full h-full object-cover"
      />
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
    768: { slidesOffsetBefore: 40, slidesOffsetAfter: 40 }
  }}
  className="w-full"
>

      {(reviews || []).map((r, i) => {
        const src = typeof r === 'string' ? r : r.img;
        return (
          <SwiperSlide key={i} style={{ width: 280 }}> {/* шире карточка */}
            <div className="rounded-2xl overflow-hidden bg-black/5">
              <img
                src={src}
                alt={`Отзыв ${i + 1}`}
                className="w-full h-[380px] md:h-[480px] object-cover" // пропорционально выше
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  </div>
</Section>


      
    </>
    
  )
}
