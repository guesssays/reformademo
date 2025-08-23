// src/pages/StudioPage.jsx
import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Section from "../components/Section.jsx";
import { directions as allDirections, studios as studiosBase } from "../data/homeData.js";
import { studiosPageData } from "../data/studiosPageData.js";
import TrialModal from "../components/TrialModal.jsx"; // ← модалка
import { useEffect } from "react";


function InfoCarousel({ images = [] }) {
  const pics = (Array.isArray(images) ? images : []).filter(Boolean);
  const [i, setI] = useState(0);

  if (pics.length === 0) return null;

  const next = () => setI((p) => (p + 1) % pics.length);
  const prev = () => setI((p) => (p - 1 + pics.length) % pics.length);

  // Один кадр — просто картинка с тем же аспектом
  if (pics.length === 1) {
    return (
      <div className="relative rounded-xl overflow-hidden">
        <div className="pb-[62%]" />
        <img src={pics[0]} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    );
  }

  // Несколько — карусель
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
      {/* фиксированный аспект */}
      <div className="pb-[62%]" />

      {/* Слайды */}
      {pics.map((src, idx) => (
        <img
          key={src + idx}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
          loading={idx === i ? "eager" : "lazy"}
        />
      ))}

      {/* Градиенты по краям, чтобы стрелки читались */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/25 to-transparent" />


<button
  type="button"
  onClick={prev}
  className="absolute left-2 top-1/2 -translate-y-1/2
             h-11 min-w-11 px-3
             rounded-full border border-white/20
             bg-black/35 backdrop-blur-sm
             text-white shadow-md
             opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100
             transition-opacity hover:bg-black/45 focus:outline-none focus:ring-2 focus:ring-white/50
             flex items-center justify-center"
  aria-label="Предыдущая фотография"
>
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
</button>


<button
  type="button"
  onClick={next}
  className="absolute right-2 top-1/2 -translate-y-1/2
             h-11 min-w-11 px-3
             rounded-full border border-white/20
             bg-black/35 backdrop-blur-sm
             text-white shadow-md
             opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100
             transition-opacity hover:bg-black/45 focus:outline-none focus:ring-2 focus:ring-white/50
             flex items-center justify-center"
  aria-label="Следующая фотография"
>
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
</button>


      {/* Точки-индикаторы */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {pics.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Слайд ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all
                        ${idx === i ? "w-6 bg-white shadow" : "w-2.5 bg-white/70 hover:bg-white"}`}
          />
        ))}
      </div>
    </div>
  );
}



export default function StudioPage() {
  const { id } = useParams(); // st-aly | st-alm
  const base = studiosBase.find((s) => s.id === id);
  const data = studiosPageData[id];
  const [modalOpen, setModalOpen] = useState(false); // ← состояние модалки
  useEffect(() => {
  const open = () => setModalOpen(true);
  window.addEventListener("open-trial-modal", open);
  return () => window.removeEventListener("open-trial-modal", open);
}, []);

  if (!base || !data) {
    return (
      <div className="edge py-24 text-center">
        <h1 className="font-bebas text-5xl">Студия не найдена</h1>
        <a href="/#studios" className="btn btn--accent mt-6">К студиям</a>
      </div>
    );
  }

  const studioDirections = useMemo(() => {
    const set = new Set((data.directionsList || []).map((t) => t.toLowerCase()));
    return allDirections.filter((d) => set.has((d.title || "").toLowerCase()));
  }, [data]);

  const city = data?.info?.city || "ТАШКЕНТ";

  // соберём список бейджей из объекта направления
  const getBadges = (d) => {
    if (Array.isArray(d.badges)) return d.badges.filter(Boolean);
    if (d.badge) return [d.badge];
    // сейчас в твоих данных есть только tag — используем его
    return d.tag ? [d.tag] : [];
  };

  return (
    <>
      {/* ========= HERO ========= */}
      <section className="relative">
        <div className="relative min-h-[78svh] sm:min-h-[82svh] md:min-h-[72vh]">
          <img
            src={data.heroImage || base.img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* затемнение по всей картинке */}
          <div className="absolute inset-0 bg-black/50" />
          {/* дополнительный градиент сверху */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          <div className="edge relative z-10 h-full">
            <div
              className="h-full w-full max-w-[1200px] mx-auto
                         flex flex-col items-center justify-center text-center gap-2
                         px-6 md:px-10
                         pb-14 sm:pb-20 md:pb-20
                         translate-y-[14svh] sm:translate-y-[16svh] md:translate-y-[8svh]"
            >
              {/* хлебные крошки */}
              <nav className="text-paper/80 text-xs md:text-sm font-helvCond mb-1">
                <Link to="/" className="hover:underline">Главная</Link>
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
                onClick={() => setModalOpen(true)}
                className="mt-5 inline-block bg-scarlet hover:bg-scarlet/90 text-white
                           font-bebas px-6 py-3 rounded-full text-lg md:text-xl"
              >
                ЗАПИСАТЬСЯ НА ПРОБНОЕ ЗАНЯТИЕ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======= Карточка Адрес/График: налезает на hero и уже на 1/3 ======= */}
      <Section className="bg-ink">
        <div className="relative -mt-[14svh] sm:-mt-[16svh] md:-mt-32 lg:-mt-40 xl:-mt-48 z-20">
          <div className="mx-auto w-[94%] md:w-2/3 lg:w-3/5">
            <div className="bg-white rounded-[22px] p-4 md:p-6 lg:p-8 shadow-soft">
              <div className="grid md:grid-cols-[1.05fr,1fr] gap-6 items-stretch">
        
                 {/* Фото слева → карусель */}
<InfoCarousel images={(data.info.photos && data.info.photos.length ? data.info.photos : [data.info.photo])} />

  

                {/* Текст справа */}
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
                      onClick={() => setModalOpen(true)}
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
          СТУДИЯ <span><span className="text-scarlet">R</span>E<span className="text-scarlet">F</span>ORMA</span> {data.titleHero} НА КАРТЕ
        </h2>
        <div className="rounded-2xl overflow-hidden border border-paper/10">
          <iframe
            title="map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(data.info.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            className="w-full h-[360px] md:h-[520px]"
            loading="lazy"
          />
        </div>
      </Section>

     {/* ===== Преимущества ===== */}
<Section className="bg-paper">
  <h2 className="font-bebas text-[32px] md:text-[44px] leading-tight text-[#161A1D] mb-6">
    {data.advantages.title}
  </h2>
  <div className="bg-white rounded-2xl p-6 md:p-10 shadow-soft">
    <div className="grid lg:grid-cols-[1.15fr,1fr] gap-8 items-center">
      
      {/* Фото с фиксированным аспектом */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="pb-[65%]" /> {/* задаём высоту через padding-bottom (примерно 3:2) */}
        <img 
          src={data.advantages.image} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
      </div>

      {/* Текст справа */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data.advantages.blocks.map((b, i) => (
          <div key={i}>
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


      {/* ===== Направления: квадратные карточки, большие бейджи/заголовки на десктопе ===== */}
      <Section className="bg-paper">
        <h2 className="font-bebas text-[32px] md:text-[44px] leading-tight text-[#161A1D]">
          {data.directionsTitle}
        </h2>

        {/* 👉 на lg и выше 5 колонок */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {studioDirections.map((d, i) => (
            <a
              key={i}
              href={`/directions/${d.slug || encodeURIComponent(d.title.trim().toLowerCase().replace(/\s+/g, "-"))}`}
              className="relative block rounded-xl overflow-hidden group"
            >
              {/* фон/картинка */}
              <img
                src={d.img}
                alt={d.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

              {/* бейджи */}
              {getBadges(d).length > 0 && (
                <div className="absolute left-2 top-2 flex gap-1 flex-wrap">
                  {getBadges(d).map((b, bi) => (
                    <span
                      key={bi}
                      className="bg-scarlet text-white font-bebas rounded-full shadow-md leading-none
                                 text-[11px] px-2 py-0.5
                                 md:text-[14px] md:px-3 md:py-1
                                 lg:text-[15px] lg:px-3.5 lg:py-1.5"
                    >
                      {String(b)}
                    </span>
                  ))}
                </div>
              )}

              {/* название */}
              <div className="absolute bottom-2 left-2 right-2">
                <div className="font-bebas text-white leading-none drop-shadow text-lg md:text-xl lg:text-2xl">
                  {d.title}
                </div>
              </div>

              {/* компактный аспект */}
              <div className="pb-[85%]" />
            </a>
          ))}
        </div>
      </Section>

      {/* ===== CTA (больше шрифты) ===== */}
      <Section className="bg-paper">
        <div className="relative rounded-2xl overflow-hidden shadow-soft">
          <img
            src={data.cta.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />

          <div className="relative z-10 flex items-center h-[360px] sm:h-[440px] md:h-[520px] lg:h-[580px]">
            <div className="px-7 md:px-12 lg:px-14 w-full">
              <div className="max-w-[720px]">
                <h3
                  className="font-bebas text-white leading-[0.9] tracking-tight
                             text-[40px] sm:text-[56px] md:text-[72px] lg:text-[84px]"
                >
                  НЕ ЗНАЕШЬ, КАКОЕ<br />НАПРАВЛЕНИЕ ВЫБРАТЬ?
                </h3>

                <p
                  className="mt-5 text-white/90 font-helvCond leading-relaxed
                             text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px]"
                >
                  {data.cta.text}
                </p>

                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
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
{/* ===== Расписание ===== */}
<Section className="bg-paper">
  <h2 className="font-bebas text-[32px] md:text-[44px] leading-tight text-[#161A1D] mb-6">
    {data.scheduleTitle}
  </h2>

  {(() => {
    const values = Object.values(data.schedule || {});
    const first = values[0];
    const isMultiHall = first && typeof first === "object" && !Array.isArray(first);

    // ВАРИАНТ 1: один зал (как было раньше)
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
                  <li key={i} className="bg-ink/5 rounded-md px-3 py-2 text-[14px] font-helvCond">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }

    // ВАРИАНТ 2: несколько залов (ЗАЛ №1, ЗАЛ №2 ...)
    return (
      <div className="space-y-10">
        {Object.entries(data.schedule).map(([hallName, hallSchedule]) => (
          <div key={hallName}>
            <div className="font-bebas text-[26px] md:text-[32px] mb-4">
              {hallName}
            </div>
            <div className="grid md:grid-cols-3 xl:grid-cols-6 gap-4">
              {Object.entries(hallSchedule).map(([day, items]) => (
                <div key={day} className="bg-white rounded-2xl p-4 shadow-soft">
                  <div className="bg-scarlet text-white rounded-lg px-3 py-2 font-bebas text-lg text-center mb-3">
                    {day}
                  </div>
                  <ul className="space-y-2">
                    {items.map((t, i) => (
                      <li key={i} className="bg-ink/5 rounded-md px-3 py-2 text-[14px] font-helvCond">
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


      {/* ===== сама модалка ===== */}
      <TrialModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
