import { Link } from "react-router-dom";
import Section from "../components/Section.jsx";
import { aboutData as data } from "../data/aboutData";

// заголовки c HTML-вставками (подсветка букв)
function H({ children, className = "" }) {
  return (
    <h3
      className={`font-bebas text-white leading-tight ${className}`}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ====== Глобальный тёмный фон + красный размытый круг ====== */}
    <div className="relative bg-[#161A1D] overflow-hidden">
  {/* красный «свет» на фоне */}
<div
  aria-hidden
  className="
    pointer-events-none absolute
    left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
    w-[1200px] h-[1200px] rounded-full
    bg-red-600/20 blur-[220px]
  "
/>



        {/* ========= HERO ========= */}
        <section className="relative">
          <div className="relative min-h-[78svh] sm:min-h-[82svh] md:min-h-[72vh]">
            <img
              src={data.hero.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

            <div className="edge relative z-10 h-full">
              <div
                className="
                  mx-auto w-full max-w-[1200px] px-6 md:px-10
                  min-h-[78svh] sm:min-h-[82svh] md:min-h-[72vh]
                  flex flex-col justify-center gap-3
                  items-center text-center sm:items-start sm:text-left
                  pb-14 sm:pb-20 md:pb-20
                "
              >
                {/* хлебные крошки */}
                <nav className="text-paper/80 text-xs md:text-sm font-helvCond">
                  <Link to="/" className="hover:underline">Главная</Link>
                  <span className="opacity-70 mx-2">/</span>
                  <span className="opacity-90">О компании</span>
                </nav>

                <h1 className="font-bebas text-white leading-[0.9] tracking-tight
                               text-[40px] sm:text-[58px] md:text-[76px]">
                  О КОМПАНИИ
                  <span className="block sm:inline ml-0 sm:ml-2">
                    <span className="font-xolo font-bold
                                     tracking-[-2px] sm:tracking-[-3px] md:tracking-[-5px]">
                      <span className="text-scarlet"> R</span>
                      <span className="text-white">e</span>
                      <span className="text-scarlet">F</span>
                      <span className="text-white">orma</span>
                    </span>
                  </span>
                </h1>

                <p className="font-helvCond text-white/90 text-[14px] sm:text-[16px] md:text-[18px] max-w-[720px]">
                  {data.hero.subtitle}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========= Блоки с фотографиями и текстами ========= */}
        <Section className="bg-[#161A1D]">
          <div className="space-y-8 md:space-y-12">
            {data.features.map((b, i) => (
              <div
                key={i}
                className={`grid gap-5 md:gap-8 items-center
                            ${b.imageLeft ? "md:grid-cols-[1.05fr,1fr]" : "md:grid-cols-[1fr,1.05fr]"}`}
              >
                {/* картинка */}
                <div className={`${b.imageLeft ? "md:order-1" : "md:order-2"} rounded-2xl overflow-hidden`}>
                  <img src={b.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>

                {/* текст */}
            {/* текст */}
<div className={`${b.imageLeft ? "md:order-2" : "md:order-1"}`}>
  <H className="text-[30px] sm:text-[36px] md:text-[44px]">{b.title}</H>
  <p className="mt-4 font-helvCond text-white/90 whitespace-pre-line
                text-[20px] sm:text-[22px] md:text-[24px] leading-relaxed">
    {b.text}
  </p>
</div>

              </div>
            ))}
          </div>
        </Section>

        {/* ========= Красный баннер (градиент) ========= */}
        <Section className="bg-[#161A1D]">
          <div className="rounded-3xl overflow-hidden shadow-soft">
            <div className="bg-gradient-to-r from-[#B40018] via-[#E3202C] to-[#FF5A5F]">
              <div className="px-6 md:px-10 py-8 md:py-10">
                <p className="text-white font-bebas leading-tight
                              text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px]">
                  {data.redBanner}
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ========= Команда ========= */}
        <Section className="bg-[#161A1D]">
          <h2 className="font-bebas text-white text-[28px] md:text-[36px] leading-tight mb-4">
            {data.teamTitle.split(" ")[0]}{" "}
            <span className="text-scarlet">{data.teamTitle.split(" ")[1]}</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {data.team.map((p, i) => (
              <article key={i} className="bg-[#1C2023] rounded-2xl overflow-hidden">
                <div className="relative">
                  <div className="pb-[78%]" />
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="px-3.5 py-3">
                  <div className="font-bebas text-white text-[18px] leading-none">{p.name}</div>
                  <div className="font-helvCond text-white/70 text-[14px] mt-1">{p.role}</div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
