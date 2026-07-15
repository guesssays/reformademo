import Section from "../components/Section.jsx";
import { asAvif } from "../lib/avif.js";

/** Универсальный helper: AVIF + fallback */
function AvifPicture({ src, alt = "", className = "", imgProps = {} }) {
  const avif = asAvif(src);
  return (
    <picture>
      {avif && <source type="image/avif" srcSet={avif} />}
      <img src={src} alt={alt} className={className} {...imgProps} />
    </picture>
  );
}

const fmt = (n) => {
  const s = typeof n === "number" ? n.toLocaleString("ru-RU") : String(n);
  return s.replace(/\s/g, "\u00A0");
};

const PriceRow = ({ name, value, monthly, months }) => {
  const displayValue = fmt(value);
  const showBreakdown = typeof monthly === "number" && typeof months === "number";
  return (
    <div className="flex items-baseline justify-between py-2 border-b border-ink/10 last:border-b-0">
      <div className="font-helvCond text-[18px] md:text-[20px] text-[#161A1D]">{name}</div>
      <div className="font-bebas text-[20px] md:text-[24px] text-[#161A1D] whitespace-nowrap tabular-nums">
        <span>{displayValue}</span>
        {showBreakdown && <span className="whitespace-nowrap">{` (\u00A0${fmt(monthly)}\u00A0×\u00A0${months}\u00A0)`}</span>}
      </div>
    </div>
  );
};

/* ===== Компоненты расписания ===== */
const ScheduleDay = ({ day, items }) => (
  <details className="group rounded-xl border border-ink/10 bg-white [&_ul]:list-disc [&_ul]:pl-5">
    <summary className="cursor-pointer select-none px-4 py-3 md:px-5 md:py-4 font-bebas text-[22px] md:text-[26px] flex items-center justify-between">
      <span className="text-[#161A1D]">{day}</span>
      <span className="ml-4 text-ink/60 text-base md:text-lg transition-transform group-open:rotate-180">▾</span>
    </summary>
    <div className="px-4 pb-4 md:px-5 md:pb-5 -mt-2 text-[#161A1D] font-helvCond text-[16px] md:text-[18px] leading-snug">
      <ul className="space-y-2">
        {items.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
    </div>
  </details>
);

const ScheduleBlock = ({ title, scheduleObj }) => {
  const days = Object.entries(scheduleObj);
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-soft">
      <h3 className="font-bebas text-[22px] md:text-[26px] mb-3 text-[#161A1D]">{title}</h3>
      <div className="space-y-2">
        {days.map(([day, items]) => (
          <ScheduleDay key={day} day={day} items={items} />
        ))}
      </div>
    </div>
  );
};

export default function PricesPage() {
  const note =
    "Цены указаны с учётом 10% скидки, которую можно получить при покупке абонемента в течение 7 дней после посещения пробного занятия.";

  /* ===== ДАННЫЕ: АЛАЙСКИЙ — ЦЕНЫ ===== */
  const alai = {
    training_08_19: [{ name: "12 занятий (08:00–19:00)", value: 1_100_000 }],
    training_19_21: [{ name: "12 занятий (19:00–21:00)", value: 1_200_000 }],
    specials: [
      { name: "Аэройога / Аэростретчинг / Йога для беременных — 12 занятий", value: 1_250_000 },
      { name: "Аэройога / Аэростретчинг / Йога для беременных — 8 занятий", value: 990_000 },
    ],
    kpop: [{ name: "K-pop — 12 занятий", value: 600_000 }],
    extras: [
      { name: "Пробное занятие", value: 90_000 },
      { name: "Разовое занятие", value: 150_000 },
      { name: "Микс абонемент — 12 занятий (неограниченное количество направлений)", value: 1_300_000 },
    ],
    oneDirection: [
      { name: "12 месяцев (1 направление) — бесплатная заморозка 4 недели", value: 7_740_000, monthly: 645_000, months: 12 },
      { name: "6 месяцев (1 направление) — бесплатная заморозка 2 недели", value: 4_480_000, monthly: 745_000, months: 6 },
      { name: "3 месяца (1 направление) — бесплатная заморозка 1 неделя", value: 2_535_000, monthly: 845_000, months: 3 },
    ],
  };

  /* ===== ДАННЫЕ: АЛИМКЕНТ — ЦЕНЫ ===== */
  const alim = {
    training_08_19: [{ name: "12 занятий (08:00–19:00)", value: 900_000 }],
    training_19_21: [{ name: "12 занятий (19:00–21:00)", value: 1_000_000 }],
    jumping: [{ name: "Джампинг фитнес — 12 занятий", value: 1_100_000 }],
    extras: [
      { name: "Пробное занятие", value: 70_000 },
      { name: "Разовое занятие", value: 130_000 },
      { name: "Микс абонемент — 12 занятий (неограниченное количество направлений)", value: 1_200_000 },
    ],
    oneDirection: [
      { name: "12 месяцев (1 направление) — бесплатная заморозка 4 недели", value: 7_740_000, monthly: 645_000, months: 12 },
      { name: "6 месяцев (1 направление) — бесплатная заморозка 2 недели", value: 4_480_000, monthly: 745_000, months: 6 },
      { name: "3 месяца (1 направление) — бесплатная заморозка 1 неделя", value: 2_535_000, monthly: 845_000, months: 3 },
    ],
  };

  /* ===== РАСПИСАНИЕ ===== */
  const scheduleAly = {
    "ЗАЛ №1": {
      "ПОНЕДЕЛЬНИК": ["09:30–10:45 — Йога", "11:00–12:15 — Йога", "16:00–17:15 — Йогатерапия", "17:45–19:00 — Аэройога"],
      "ВТОРНИК": [
        "08:30–09:45 — Женская йога",
        "10:00–11:00 — Йога для беременных",
        "11:15–12:15 — Йога для беременных",
        "15:00–16:00 — Тверк",
        "16:00–17:00 — Тверк",
        "18:00–19:00 — Пилатес + Стретчинг",
        "19:00–20:00 — Аэростретчинг",
      ],
      "СРЕДА": ["09:30–10:45 — Йога", "11:00–12:15 — Йога", "16:00–17:15 — Йогатерапия", "17:45–19:00 — Женское здоровье", "19:00–20:00 — Аэройога"],
      "ЧЕТВЕРГ": [
        "08:30–09:45 — Женская йога",
        "10:00–11:00 — Йога для беременных",
        "11:15–12:15 — Йога для беременных",
        "15:00–16:00 — Тверк",
        "16:00–17:00 — Тверк",
        "18:00–19:00 — Пилатес + стретчинг",
        "19:00–20:00 — Аэростретчинг",
      ],
      "ПЯТНИЦА": ["09:30–10:45 — Йога", "11:00–12:15 — Йога", "16:00–17:15 — Йогатерапия", "17:45–19:00 — Женское здоровье", "19:00–20:00 — Аэройога"],
      "СУББОТА": ["08:30–09:45 — Женская йога", "11:15–12:15 — Йога для беременных", "15:00–16:00 — Тверк", "16:00–17:00 — Тверк"],
    },
    "ЗАЛ №2": {
      "ПОНЕДЕЛЬНИК": [
        "08:00–09:00 — Фитнес + Стретчинг",
        "09:00–10:00 — Фитнес + Стретчинг",
        "10:45–11:45 — Фитнес + Пилатес",
        "12:00–13:00 — Пилатес (50+)",
        "15:00–16:00 — Узбекские танцы",
        "16:00–17:00 — Зумба + Стретчинг",
        "17:00–18:00 — Арабские танцы + Фитнес",
        "18:00–19:00 — K-POP",
        "19:00–20:00 — Фитнес + Пилатес",
        "20:00–21:00 — Пилатес",
      ],
      "ВТОРНИК": ["09:00–10:00 — Фитнес микс", "10:00–11:00 — Фитнес микс", "19:00–20:00 — Фитнес микс", "20:00–21:00 — Фитнес + пилатес"],
      "СРЕДА": [
        "08:00–09:00 — Фитнес + стретчинг",
        "09:00–10:00 — Фитнес + стретчинг",
        "10:45–11:45 — Фитнес + пилатес",
        "12:00–13:00 — Пилатес (50+)",
        "15:00–16:00 — Узбекские танцы",
        "16:00–17:00 — Зумба + стретчинг",
        "17:00–18:00 — Арабские танцы + фитнес",
        "18:00–19:00 — K-pop",
        "19:00–20:00 — Фитнес + Пилатес",
        "20:00–21:00 — Пилатес",
      ],
      "ЧЕТВЕРГ": ["09:00–10:00 — Фитнес микс", "10:00–11:00 — Фитнес микс", "19:00–20:00 — Фитнес микс", "20:00–21:00 — Фитнес + пилатес"],
      "ПЯТНИЦА": [
        "08:00–09:00 — Фитнес + стретчинг",
        "09:00–10:00 — Фитнес + стретчинг",
        "10:45–11:45 — Фитнес + пилатес",
        "12:00–13:00 — Пилатес (50+)",
        "15:00–16:00 — Узбекские танцы",
        "16:00–17:00 — Зумба + стретчинг",
        "17:00–18:00 — Арабские танцы + фитнес",
        "18:00–19:00 — K-pop",
        "19:00–20:00 — Фитнес + Пилатес",
        "20:00–21:00 — Пилатес",
      ],
      "СУББОТА": ["09:00–10:00 — Фитнес микс", "10:00–11:00 — Фитнес микс", "19:00–20:00 — Фитнес микс", "20:00–21:00 — Фитнес + пилатес"],
    },
  };

  const scheduleAlm = {
    "ПОНЕДЕЛЬНИК": ["10:00–11:00 — Фитнес микс", "15:00–16:00 — Фитнес микс", "17:30–18:30 — Похудейка", "18:30–19:30 — Фитнес + стретчинг", "19:30–20:30 — Похудейка", "20:30–21:30 — Стретчинг"],
    "ВТОРНИК": ["08:00–09:00 — Фитнес на батутах", "09:00–10:00 — Стретчинг", "18:15–19:30 — Йогатерапия", "19:30–20:30 — Похудейка", "20:30–21:30 — Фитнес + Стретчинг"],
    "СРЕДА": ["10:00–11:00 — Фитнес микс", "15:00–16:00 — Фитнес микс", "17:30–18:30 — Похудейка", "18:30–19:30 — Фитнес + стретчинг", "19:30–20:30 — Похудейка", "20:30–21:30 — Стретчинг"],
    "ЧЕТВЕРГ": ["08:00–09:00 — Фитнес на батутах", "09:00–10:00 — Стретчинг", "18:15–19:30 — Йогатерапия", "19:30–20:30 — Похудейка", "20:30–21:30 — Фитнес + Стретчинг"],
    "ПЯТНИЦА": ["10:00–11:00 — Фитнес микс", "15:00–16:00 — Фитнес микс", "17:30–18:30 — Похудейка", "18:30–19:30 — Фитнес + стретчинг", "19:30–20:30 — Похудейка", "20:30–21:30 — Стретчинг"],
    "СУББОТА": ["08:00–09:00 — Фитнес на батутах", "09:00–10:00 — Стретчинг", "19:30–20:30 — Похудейка", "20:30–21:30 — Фитнес + Стретчинг"],
  };

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="bleed">
          <div className="edge">
            <div className="rounded-3xl overflow-hidden">
              <div className="relative min-h-[48vh] flex items-center">
                <AvifPicture
                  src="/images/cta.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  imgProps={{ loading: "eager", decoding: "async", fetchpriority: "high" }}
                />
                <div className="absolute inset-0 bg-ink/65" />
                <div className="relative z-10 w-full p-6 md:p-12">
                  <div className="container mx-auto max-w-6xl">
                    <h1 className="font-bebas text-white leading-none text-[48px] md:text-[84px] tracking-tight">РАСПИСАНИЕ И ЦЕНЫ</h1>
                    <p className="text-white/90 font-helvCond text-xl md:text-2xl mt-2 max-w-3xl">{note}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* АЛАЙСКИЙ — ЦЕНЫ */}
      <Section id="alaiskiy" className="bg-paper scroll-mt-24">
        <h2 className="font-bebas text-[28px] md:text-[36px] text-[#161A1D] leading-tight mb-4">Студия «Алайский»</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">Тренировки (08:00–19:00)</h3>
            {alai.training_08_19.map((i) => <PriceRow key={i.name} {...i} />)}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">Тренировки (19:00–21:00)</h3>
            {alai.training_19_21.map((i) => <PriceRow key={i.name} {...i} />)}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">Аэройога / Аэростретчинг / Йога для беременных</h3>
            {alai.specials.map((i) => <PriceRow key={i.name} {...i} />)}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <h3 className="font-бебas text-[22px] md:text-[26px] mb-2">K-pop</h3>
            {alai.kpop.map((i) => <PriceRow key={i.name} {...i} />)}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-soft md:col-span-2">
            <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">Дополнительно</h3>
            {alai.extras.map((i) => <PriceRow key={i.name} {...i} />)}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-soft md:col-span-2">
            <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">Абонементы на 1 направление</h3>
            {alai.oneDirection.map((i) => <PriceRow key={i.name} {...i} />)}
          </div>
        </div>
      </Section>

      {/* АЛАЙСКИЙ — РАСПИСАНИЕ */}
      <Section id="alaiskiy-schedule" className="bg-paper">
        <h2 className="font-bebas text-[26px] md:text-[34px] text-[#161A1D] leading-tight mb-4">Расписание студии «Алайский»</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <ScheduleBlock title="ЗАЛ №1" scheduleObj={scheduleAly["ЗАЛ №1"]} />
          <ScheduleBlock title="ЗАЛ №2" scheduleObj={scheduleAly["ЗАЛ №2"]} />
        </div>
      </Section>

      {/* АЛИМКЕНТ — ЦЕНЫ */}
      <Section id="alimkent" className="bg-paper scroll-mt-24">
        <h2 className="font-bebas text-[28px] md:text-[36px] text-[#161A1D] leading-tight mb-4">Студия «Алимкент»</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">Тренировки (08:00–19:00)</h3>
            {alim.training_08_19.map((i) => <PriceRow key={i.name} {...i} />)}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">Тренировки (19:00–21:00)</h3>
            {alim.training_19_21.map((i) => <PriceRow key={i.name} {...i} />)}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">Джампинг фитнес</h3>
            {alim.jumping.map((i) => <PriceRow key={i.name} {...i} />)}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-soft md:col-span-2">
            <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">Дополнительно</h3>
            {alim.extras.map((i) => <PriceRow key={i.name} {...i} />)}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-soft md:col-span-2">
            <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">Абонементы на 1 направление</h3>
            {alim.oneDirection.map((i) => <PriceRow key={i.name} {...i} />)}
          </div>
        </div>
      </Section>

      {/* АЛИМКЕНТ — РАСПИСАНИЕ */}
      <Section id="alimkent-schedule" className="bg-paper">
        <h2 className="font-bebas text-[26px] md:text-[34px] text-[#161A1D] leading-tight mb-4">Расписание студии «Алимкент»</h2>
        <ScheduleBlock title="График по дням" scheduleObj={scheduleAlm} />
      </Section>
    </>
  );
}
