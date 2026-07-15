import Section from "../components/Section.jsx";
import { aboutData as data } from "../data/aboutData.js";
import { asAvif } from "../lib/avif.js";

const H = ({ children, className = "" }) => (
  <h2 className={`font-bebas text-white leading-[0.9] tracking-tight ${className}`}>{children}</h2>
);

/** Небольшой хелпер для AVIF + fallback */
function AvifPicture({ src, alt = "", className = "", imgProps = {} }) {
  const avif = asAvif(src);
  return (
    <picture>
      {avif && <source type="image/avif" srcSet={avif} />}
      <img src={src} alt={alt} className={className} {...imgProps} />
    </picture>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="bleed">
          {/* убрали edge + скругления */}
          <div className="relative min-h-[60vh] flex items-center">
            <AvifPicture
              src={data.hero.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              imgProps={{
                loading: "eager",
                decoding: "async",
                fetchpriority: "high",
              }}
            />
            <div className="absolute inset-0 bg-ink/60" />
            <div className="relative z-10 w-full p-6 md:p-12">
              <div className="container mx-auto max-w-6xl">
                <h1 className="font-bebas text-white leading-none text-[64px] md:text-[92px] tracking-tight">
                  КОМАНДА <span className="text-scarlet">R</span>E
                  <span className="text-scarlet">F</span>ORMA
                </h1>
                {/* описания нет по ТЗ */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ТОЛЬКО СЕТКА КОМАНДЫ */}
      <Section className="bg-[#161A1D]">
        <H className="text-[30px] sm:text-[36px] md:text-[44px] mb-6">НАША КОМАНДА</H>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.team.map((p, i) => (
            <figure key={p.name || i} className="rounded-2xl overflow-hidden bg-black/10">
              <div className="relative w-full pb-[66%]">
                <AvifPicture
                  src={p.photo}
                  alt={`${p.name} — ${p.role}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  imgProps={{ loading: "lazy", decoding: "async" }}
                />
              </div>
              <figcaption className="p-3">
                <div className="font-bebas text-white text-xl leading-none">{p.name}</div>
                <div className="text-white/80 font-helvCond text-lg">{p.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </>
  );
}
