import Section from "../components/Section.jsx";
import { asAvif } from "../lib/avif.js";
import { studiosPageData } from "../data/studiosPageData.js";

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

  // Единый источник данных — страница студии (src/data/studiosPageData.js)
  const { fitness } = studiosPageData["st-aly"].pricing;
  const schedule = studiosPageData["st-aly"].schedule;

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
            <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">Тренировки</h3>
            {fitness.training.map((i) => <PriceRow key={i.name} {...i} />)}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">Аэройога / Аэростретчинг / Тверк / Йога для беременных</h3>
            {fitness.specials.map((i) => <PriceRow key={i.name} {...i} />)}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">K-pop</h3>
            {fitness.kpop.map((i) => <PriceRow key={i.name} {...i} />)}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">Дополнительно</h3>
            {fitness.extras.map((i) => <PriceRow key={i.name} {...i} />)}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-soft md:col-span-2">
            <h3 className="font-bebas text-[22px] md:text-[26px] mb-2">VIP абонементы</h3>
            {fitness.vip.map((i) => <PriceRow key={i.name} {...i} />)}
          </div>
        </div>
      </Section>

      {/* АЛАЙСКИЙ — РАСПИСАНИЕ */}
      <Section id="alaiskiy-schedule" className="bg-paper">
        <h2 className="font-bebas text-[26px] md:text-[34px] text-[#161A1D] leading-tight mb-4">Расписание студии «Алайский»</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <ScheduleBlock title="ЗАЛ №1" scheduleObj={schedule["ЗАЛ №1"]} />
          <ScheduleBlock title="ЗАЛ №2" scheduleObj={schedule["ЗАЛ №2"]} />
        </div>
      </Section>
    </>
  );
}
