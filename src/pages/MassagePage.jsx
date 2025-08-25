// src/pages/MassagePage.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Section from "../components/Section.jsx";
import { massageContent as data } from "../data/massageData";
import MassageModal from "../components/MassageModal.jsx";

// ===== inline-иконки =====
const Check = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M20.285 6.708a1 1 0 0 1 0 1.414l-9.9 9.9a1 1 0 0 1-1.414 0l-5.257-5.257a1 1 0 1 1 1.414-1.414l4.55 4.55 9.193-9.193a1 1 0 0 1 1.414 0z" />
  </svg>
);
const Pin = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
);
const Phone = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.11.37 2.31.57 3.58.57a1 1 0 0 1 1 1v3.48a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4.99a1 1 0 0 1 1-1H7.5a1 1 0 0 1 1 1c0 1.27.2 2.47.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z" />
  </svg>
);

// единый CTA как класс (используем на button, чтобы открывать модалку)
const ctaClasses =
  "inline-flex items-center justify-center rounded-full bg-scarlet hover:bg-scarlet/90 text-white font-bebas tracking-wide px-6 py-3 text-lg shadow-md";

export default function MassagePage() {
  const bookingHref = useMemo(
    () => data.bookingLink || `tel:${data.phones?.[0]?.replace(/\s/g, "")}`,
    []
  );

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* ========= HERO (как в StudioPage: шрифты/оверлеи/смещение контента) ========= */}
      <section className="relative">
        <div className="relative">
          <img
            src={data.hero.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />

          {/* затемнение + верхний градиент */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          <div className="edge relative z-10">
            <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
              {/* min-h на флекс-контейнере */}
              <div
                className="
                  flex flex-col gap-3
                  min-h-[78svh] sm:min-h-[82svh] md:min-h-[72vh]
                  justify-center
                  items-center text-center
                  sm:items-start sm:text-left
                  pt-0 sm:pt-[18svh] md:pt-[12svh]
                  pb-14 sm:pb-20 md:pb-20
                "
              >
                {/* хлебные крошки */}
                <nav className="text-paper/80 text-xs md:text-sm font-helvCond mb-1">
                  <Link to="/" className="hover:underline">Главная</Link>
                  <span className="opacity-70 mx-2">/</span>
                  <span className="opacity-90">Массаж</span>
                </nav>

                <h1
                  className="mt-1 font-bebas text-white leading-[0.9] tracking-tight
                             text-[42px] sm:text-[64px] md:text-[92px]"
                >
                  МАССАЖ{" "}
                  <span className="block sm:inline">
                    В{" "}
                    <span
                      className="
                        font-xolo font-bold
                        tracking-[-2px] sm:tracking-[-3px] md:tracking-[-5px]
                      "
                    >
                      <span className="text-scarlet">R</span>
                      <span className="text-white">e</span>
                      <span className="text-scarlet">F</span>
                      <span className="text-white">orma</span>
                    </span>
                  </span>
                </h1>

                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className={`${ctaClasses} mt-3`}
                >
                  ЗАПИСАТЬСЯ НА МАССАЖ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= Карточка «о массаже» как у блока адрес/график (накрывает hero) ======= */}
      <Section className="bg-ink">
        <div className="relative -mt-[14svh] sm:-mt-[16svh] md:-mt-32 lg:-mt-40 xl:-mt-48 z-20">
          <div className="mx-auto w-[94%] md:w-2/3 lg:w-3/5">
            <div className="bg-white rounded-[22px] p-4 md:p-6 lg:p-8 shadow-soft">
              <div className="grid md:grid-cols-[1.05fr,1fr] gap-6 items-stretch">
                {/* Фото слева */}
                <div className="relative rounded-xl overflow-hidden">
                  <div className="pb-[66%] md:pb-[62%]" />
                  <img
                    src={data.intro.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Контент справа */}
                <div className="flex flex-col">
                  <div className="bg-ink/5 rounded-xl p-5">
                    <h2 className="font-bebas text-[24px] md:text-[28px] leading-none">
                      {data.intro.title}{" "}
                      <span className="text-scarlet">{data.studioName}</span>
                    </h2>
                    <p className="mt-2 font-helvCond text-[18px] md:text-[20px] text-[#161A1D]">
                      {data.intro.text}
                    </p>
                  </div>

                  <div className="bg-ink/5 rounded-xl p-5 mt-4">
                    <h3 className="font-bebas text-[22px] md:text-[24px] leading-none">
                      {data.intro.typesTitle}
                    </h3>
                    <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {data.intro.types.map((t, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 inline-flex h-5 w-5 shrink-0 rounded-full bg-scarlet/90">
                            <Check className="m-auto h-3.5 w-3.5 fill-white" />
                          </span>
                          <span className="font-helvCond text-[18px] md:text-[20px] text-[#161A1D]">
                            {t}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className={ctaClasses}
                    >
                      {data.intro.cta}
                    </button>
                    {/* альтернативно можно оставить прямой звонок:
                    <a href={bookingHref} className={`${ctaClasses} ml-3`}>Позвонить</a>
                    */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ================== Преимущества ================== */}
      <Section className="bg-paper">
        <h2 className="font-bebas text-[28px] md:text-[36px] text-[#161A1D] mb-6 leading-tight">
          ЗАЧЕМ ПОСЕЩАТЬ МАССАЖ В СТУДИЯХ{" "}
          <span className="text-scarlet">R</span>E<span className="text-scarlet">F</span>ORMA?
        </h2>

        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-soft">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.benefits.map((b, i) => (
              <article key={i} className="rounded-2xl overflow-hidden border border-ink/5">
                <div className="relative h-44 md:h-52">
                  <img
                    src={b.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-scarlet/90 shadow">
                    <Check className="h-4 w-4 fill-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bebas text-[20px] md:text-[22px] text-[#161A1D]">
                    {b.title}
                  </h3>
                  <p className="mt-1 font-helvCond text-[18px] md:text-[20px] text-[#161A1D]">
                    {b.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>
{/* ================== Прайс ================== */}
<Section className="bg-paper" id="pricing">
  <div className="flex items-start justify-between gap-4 mb-4">
    <h2 className="font-bebas text-[28px] md:text-[36px] text-[#161A1D] leading-tight">
      ПРАЙС НА УСЛУГИ
    </h2>

  </div>

  {/* заметка + CTA */}
  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-soft mb-6">
    <p className="font-helvCond text-[18px] md:text-[20px] text-[#161A1D]">
      {data.pricing?.note}{" "}
      <a href={`tel:${data.phones?.[0]?.replace(/\s/g,"")}`} className="underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
        {data.phones?.[0]}
      </a>{" "}
      или{" "}
      <button type="button" onClick={() => setModalOpen(true)} className="underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
        оставьте заявку
      </button>
      .
    </p>
  </div>

  {/* Сервисы */}
  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-soft mb-6">
    <h3 className="font-bebas text-[22px] md:text-[26px] text-[#161A1D] mb-3">
      {data.pricing?.servicesTitle}
    </h3>
    <div className="overflow-x-auto">
      <table className="min-w-[720px] w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left font-helvCond text-[16px] md:text-[18px] text-[#161A1D]/70">
            <th className="py-2 px-3 rounded-l-lg bg-ink/5">Услуга</th>
            <th className="py-2 px-3 bg-ink/5">Длительность</th>
            <th className="py-2 px-3 bg-ink/5">Мастер</th>
            <th className="py-2 px-3 rounded-r-lg bg-ink/5">Топ-мастер</th>
          </tr>
        </thead>
        <tbody>
          {data.pricing?.services?.map((s, idx) => (
            <tr key={idx} className="bg-ink/3">
              <td className="py-3 px-3 rounded-l-lg font-helvCond text-[18px] md:text-[20px] text-[#161A1D]">{s.name}</td>
              <td className="py-3 px-3 font-helvCond text-[18px] md:text-[20px] text-[#161A1D]">{s.duration || "—"}</td>
              <td className="py-3 px-3 font-helvCond text-[18px] md:text-[20px] text-[#161A1D]">{s.price ? `${s.price} сум` : "—"}</td>
              <td className="py-3 px-3 rounded-r-lg font-helvCond text-[18px] md:text-[20px] text-[#161A1D]">{s.topPrice ? `${s.topPrice} сум` : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* SPA пакеты */}
  <div className="grid gap-4 md:grid-cols-2">
    {/* Обычные SPA */}
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-soft">
      <h3 className="font-bebas text-[22px] md:text-[26px] text-[#161A1D] mb-3">
        {data.pricing?.spaTitle}
      </h3>
      <ul className="space-y-3">
        {data.pricing?.spa?.map((p, i) => (
          <li key={i} className="rounded-xl border border-ink/5 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bebas text-[20px] md:text-[22px] text-[#161A1D] leading-none">{p.name}</p>
                <p className="mt-1 font-helvCond text-[16px] md:text-[18px] text-[#161A1D]/85">{p.includes}</p>
              </div>
              <div className="text-right">
                <p className="font-helvCond text-[18px] md:text-[20px] text-[#161A1D]">{p.price} сум</p>
                <p className="text-sm text-[#161A1D]/70 mt-0.5">{p.duration}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>

    {/* Премиум SPA */}
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-soft">
      <h3 className="font-bebas text-[22px] md:text-[26px] text-[#161A1D] mb-3">
        {data.pricing?.premiumTitle}
      </h3>
      <ul className="space-y-3">
        {data.pricing?.premium?.map((p, i) => (
          <li key={i} className="rounded-xl border border-ink/5 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bebas text-[20px] md:text-[22px] text-[#161A1D] leading-none">{p.name}</p>
                <p className="mt-1 font-helvCond text-[16px] md:text-[18px] text-[#161A1D]/85">{p.includes}</p>
              </div>
              <div className="text-right">
                <p className="font-helvCond text-[18px] md:text-[20px] text-[#161A1D]">{p.price} сум</p>
                <p className="text-sm text-[#161A1D]/70 mt-0.5">{p.duration}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>

  {/* Аппаратные процедуры */}
  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-soft mt-6">
    <h3 className="font-bebas text-[22px] md:text-[26px] text-[#161A1D] mb-3">
      {data.pricing?.hardwareTitle}
    </h3>
    <ul className="grid gap-2 sm:grid-cols-2">
      {data.pricing?.hardware?.map((h, i) => (
        <li key={i} className="flex items-center justify-between rounded-xl border border-ink/5 px-3 py-2">
          <span className="font-helvCond text-[18px] md:text-[20px] text-[#161A1D]">{h.name}</span>
          <span className="font-helvCond text-[18px] md:text-[20px] text-[#161A1D]">{h.price} сум</span>
        </li>
      ))}
    </ul>
  </div>

  {/* нижний CTA */}
  <div className="mt-6 flex flex-wrap items-center gap-3">
    <button type="button" onClick={() => setModalOpen(true)} className={ctaClasses}>
      Оставить заявку
    </button>
    <a
      href={`tel:${data.phones?.[0]?.replace(/\s/g,"")}`}
      className="inline-flex items-center justify-center rounded-full border border-scarlet text-scarlet hover:bg-scarlet/5 font-bebas tracking-wide px-6 py-3 text-lg"
    >
      Позвонить {data.phones?.[0]}
    </a>

  </div>
</Section>

      {/* ================== Специалисты ================== */}
      <Section className="bg-paper">
        <h2 className="font-bebas text-[28px] md:text-[36px] text-[#161A1D] mb-6 leading-tight">
          {data.specialistsTitle}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {data.specialists.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 md:p-6 shadow-soft">
              <div className="grid grid-cols-[112px,1fr] gap-4 items-center">
                <img
                  src={s.photo}
                  alt={s.name}
                  className="h-[112px] w-[112px] rounded-xl object-cover"
                  loading="lazy"
                />
 <div>
  <h3 className="font-bebas text-[22px] text-[#161A1D] leading-none">
    {s.name}
  </h3>
  <p className="font-helvCond text-[18px] md:text-[20px] text-[#161A1D]/90">
    {s.role}
  </p>
  <p className="mt-2 font-helvCond text-[16px] text-[#161A1D]/80">
    {s.description}
  </p>
</div>

              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ================== Студии, где есть массаж ================== */}
      <Section id="studios" className="bg-paper">
        <h2 className="font-bebas text-[28px] md:text-[36px] text-[#161A1D] mb-6 leading-tight">
          {data.studiosTitle}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {data.studios.map((st, i) => (
            <article key={i} className="bg-white rounded-2xl overflow-hidden shadow-soft">
              <div className="relative h-48">
                <img
                  src={st.photo}
                  alt={st.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bebas text-[22px] text-[#161A1D] leading-none">
                  {st.name}
                </h3>
                <p className="mt-1 font-helvCond text-[18px] md:text-[20px] text-[#161A1D]">
                  {st.address}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-[#161A1D]">
                  <span className="inline-flex items-center gap-1">
                    <Pin className="h-4 w-4 fill-current" />
                    <a
                      href={st.mapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-ink/30 underline-offset-2 hover:decoration-ink"
                    >
                      Показать на карте
                    </a>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Phone className="h-4 w-4 fill-current" />
                    <a href={`tel:${st.phone.replace(/\s/g, "")}`}>{st.phone}</a>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className={`${ctaClasses} mt-4`}
                >
                  Записаться на массаж
                </button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ================== Большой CTA full-bleed ================== */}
      <section className="relative w-full">
        <img
          src={data.trial.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />

        <div className="relative z-10 flex items-center h-[360px] sm:h-[440px] md:h-[520px] lg:h-[580px]">
          <div className="px-7 md:px-12 lg:px-20 w-full">
            <div className="max-w-[820px]">
              <h3
                className="font-bebas text-white leading-[0.9] tracking-tight
                           text-[40px] sm:text-[56px] md:text-[72px] lg:text-[84px]"
              >
                ЗАПИШИСЬ НА ПРОБНЫЙ СЕАНС
              </h3>
              <p
                className="mt-5 text-white/90 font-helvCond leading-relaxed
                           text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px]"
              >
                {data.trial.text}
              </p>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className={`${ctaClasses} mt-6`}
              >
                {data.trial.cta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== МОДАЛКА (массаж) ===== */}
      <MassageModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
