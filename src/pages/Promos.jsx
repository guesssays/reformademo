import { useEffect, useState, useMemo, useCallback } from "react";
import Section from "../components/Section.jsx";
import TrialModal from "../components/TrialModal.jsx";
import { promos } from "../data/homeData.js";
import { asAvif } from "../lib/avif.js";

/* Универсальный helper: AVIF + fallback */
function AvifPicture({ src, alt = "", className = "", imgProps = {} }) {
  if (!src) return null;
  const avif = asAvif(src);
  return (
    <picture>
      {avif && <source type="image/avif" srcSet={avif} />}
      <img src={src} alt={alt} className={className} {...imgProps} />
    </picture>
  );
}

const FilterBtn = ({ active, children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "px-4 py-2 rounded-full text-sm md:text-base font-helvCond transition",
      active ? "bg-scarlet text-white" : "text-[#161A1D] hover:bg-ink/5",
    ].join(" ")}
  >
    {children}
  </button>
);

export default function PromosPage() {
  const [trialOpen, setTrialOpen] = useState(false);
  useEffect(() => {
    const open = () => setTrialOpen(true);
    window.addEventListener("open-trial-modal", open);
    return () => window.removeEventListener("open-trial-modal", open);
  }, []);

  const [filter, setFilter] = useState("all"); // all | training | massage
  const filtered = useMemo(
    () => promos.filter((p) => (filter === "all" ? true : p.category === filter)),
    [filter]
  );

  const openTrial = useCallback(() => setTrialOpen(true), []);

  return (
    <>
      <TrialModal open={trialOpen} onClose={() => setTrialOpen(false)} />

      <Section className="bg-paper">
        <div className="rounded-3xl bg-white shadow-soft p-5 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="font-bebas text-[32px] md:text-[44px] text-[#161A1D] leading-none">
              АКЦИИ КЛУБА
            </h1>

            <div className="inline-flex rounded-full border border-ink/10 bg-ink/3 p-1">
              <FilterBtn active={filter === "all"} onClick={() => setFilter("all")}>Все</FilterBtn>
              <FilterBtn active={filter === "training"} onClick={() => setFilter("training")}>Тренировки</FilterBtn>
              <FilterBtn active={filter === "massage"} onClick={() => setFilter("massage")}>Массаж</FilterBtn>
            </div>
          </div>

          <p className="mt-2 text-[#161A1D]/70 font-helvCond">
            Здесь собраны текущие специальные предложения на тренировки, массаж и SPA.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <article key={p.id} className="relative rounded-2xl border border-ink/5 bg-white p-4 md:p-5">
                <div className="flex items-center justify-between">
                  {p.badge && (
                    <span className="inline-flex items-center rounded-full bg-scarlet/10 text-scarlet px-3 py-1 text-xs md:text-sm font-helvCond">
                      {p.badge}
                    </span>
                  )}
                  <span className="text-xs md:text-sm font-helvCond text-[#161A1D]/70">
                    {p.category === "training" ? "Тренировки" : "Массаж"}
                  </span>
                </div>

                <h3 className="mt-3 font-bebas text-[20px] md:text-[22px] text-[#161A1D] leading-tight">
                  {p.title}
                </h3>
                {p.note && (
                  <p className="mt-1 font-helvCond text-[16px] md:text-[18px] text-[#161A1D]/85">
                    {p.note}
                  </p>
                )}

                {/* Картинка промо: AVIF + fallback (если в данных есть поле image) */}
                {p.image && (
                  <div className="mt-4 relative rounded-xl overflow-hidden">
                    <div className="pb-[56%]" />
                    <AvifPicture
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      imgProps={{ loading: "lazy", decoding: "async" }}
                    />
                  </div>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {p.links?.instagram && (
                    <a
                      href={p.links.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full border border-ink/10 px-3 py-2 text-sm font-helvCond hover:bg-ink/5"
                    >
                      Instagram
                    </a>
                  )}
                  {p.links?.telegram && (
                    <a
                      href={p.links.telegram}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full border border-ink/10 px-3 py-2 text-sm font-helvCond hover:bg-ink/5"
                    >
                      Telegram
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={openTrial}
                    className="ml-auto inline-flex items-center justify-center rounded-full bg-scarlet hover:bg-scarlet/90 text-white font-bebas tracking-wide px-4 py-2 text-base shadow-md"
                  >
                    Записаться
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
