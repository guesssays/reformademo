// src/pages/Direction.jsx
import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Section from "../components/Section.jsx";
import { directionsData } from "../data/directions.js";
import { studios as allStudios } from "../data/homeData.js";
import { MapPin, Phone } from "lucide-react";
import TrialModal from "../components/TrialModal.jsx"; // ← модалка
import { useEffect } from "react";
function GradientNumber({ value, className = "" }) {
  const id = `grad-${value}`;
  return (
    <svg className={className} viewBox="0 0 140 110" preserveAspectRatio="xMidYMid meet">
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
}

export default function Direction() {
  const { slug } = useParams();
  const data = useMemo(() => directionsData.find((d) => d.slug === slug), [slug]);
  const [modalOpen, setModalOpen] = useState(false); // ← состояние модалки

  useEffect(() => {
  const open = () => setModalOpen(true);
  window.addEventListener("open-trial-modal", open);
  return () => window.removeEventListener("open-trial-modal", open);
}, []);

  if (!data) {
    return (
      <Section className="text-center">
        <h1 className="font-bebas text-5xl mb-4">Направление не найдено</h1>
        <Link className="btn btn--accent" to="/">На главную</Link>
      </Section>
    );
  }

  const { hero, intro, benefitsBlock, prepareSteps, studios, gallery, seo, title, tag } = data;
  const studiosResolved = studios
    .map((id) => allStudios.find((s) => s.id === id))
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: `ReForma — ${title}`,
    description: seo?.description || `${title} в ReForma`,
    image: hero?.image,
    address: studiosResolved.map((s) => s.title),
    telephone: studiosResolved[0]?.phone,
  };

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>{seo?.title || `${title} — ReForma`}</title>
          {seo?.description && <meta name="description" content={seo.description} />}
          {seo?.keywords && <meta name="keywords" content={seo.keywords} />}
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>

        {/* HERO */}
        <section className="relative">
          <div className="bleed">
            <div className="edge">
              <div className="rounded-3xl overflow-hidden">
                <div className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
                  <img
                    src={hero.image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-ink/60" />
                  <div className="relative z-10 w-full p-6 md:p-12">
                    <div className="container mx-auto max-w-6xl">
                      <div className="inline-block bg-scarlet/95 text-white rounded-full px-5 py-2 font-bebas text-lg tracking-wide mb-4">
                        {tag}
                      </div>
                      <h1 className="font-bebas text-white leading-none text-[64px] md:text-[92px] tracking-tight">
                        {hero.title || title}
                      </h1>
                      <p className="text-white/90 font-helvCond text-xl md:text-2xl max-w-2xl mt-3">
                        {hero.subtitle}
                      </p>
                      <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className="btn btn--accent mt-6 font-bebas text-lg"
                      >
                        {hero.ctaText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Интро-блок */}
        <Section className="bg-paper">
          <div className="grid md:grid-cols-2 gap-10 items-center">
         <div className="order-1">
  <div className="relative w-full pb-[66%] rounded-xl overflow-hidden"> 
    {/* pb-[66%] → соотношение 3:2 (высота ~2/3 от ширины) */}
    <img
      src={intro.imageLeft}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>
</div>

            <div className="order-2">
              <h3 className="font-bebas text-[40px] md:text-[56px] text-[#161A1D] leading-tight">
                {intro.title}
              </h3>
              <p className="mt-6 font-helvCond text-[20px] md:text-[22px] text-[#161A1D]">
                {intro.text}
              </p>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="mt-8 inline-block bg-scarlet text-white font-bebas text-[22px] px-8 py-4 rounded-xl hover:bg-red-700 transition"
              >
                {hero.ctaText}
              </button>
            </div>
          </div>
        </Section>

        {/* Преимущества */}
        <Section className="bg-paper">
          <h2 className="font-bebas text-[42px] md:text-[64px] text-[#161A1D] mb-8">
            {benefitsBlock.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {benefitsBlock.items.map((b, i) => (
              <div key={i} className="flex gap-4 items-start bg-white rounded-2xl p-6 shadow-soft">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-scarlet text-white mt-1">
                  ✓
                </span>
                <div>
                  <div className="font-helvCondBold text-lg">{b.title}</div>
                  <div className="font-helvCond text-[17px] text-ink/80 mt-1">{b.text}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Как подготовиться */}
        <Section className="bg-paper">
          <h2 className="font-bebas text-[42px] md:text-[64px] text-[#161A1D] mb-8">
            КАК ПОДГОТОВИТЬСЯ К ТРЕНИРОВКЕ
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {prepareSteps.map((s) => (
              <div key={s.n} className="bg-white rounded-2xl p-6 shadow-soft">
                <GradientNumber value={s.n} className="w-[120px] h-auto -mt-2 -mb-2" />
                <div className="font-bebas text-2xl mt-2">{s.title}</div>
                <div className="font-helvCond text-ink/80 mt-1">{s.text}</div>
              </div>
            ))}
          </div>
        </Section>
{/* Студии этого направления */}
<Section id="studios" className="bg-paper">
  <h2 className="font-bebas text-[42px] md:text-[64px] text-[#161A1D]">
    СТУДИИ, В КОТОРЫХ ПРЕДСТАВЛЕНО НАПРАВЛЕНИЕ
  </h2>
  <p className="font-helvCond text-ink/70 mt-2">
    Расписание уточняйте по телефону или через форму обратной связи.
  </p>

  <div className="mt-8 grid md:grid-cols-2 gap-5">
    {studiosResolved.map((s, i) => (
      <Link
        key={i}
        to={`/studios/${s.id}`} // 👉 теперь ведёт на страницу студии
        className="relative block rounded-2xl overflow-hidden group"
      >
        <img
          src={s.img}
          alt={s.short}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute top-4 left-4 px-4 py-1.5 bg-scarlet/90 text-white font-bebas text-lg rounded-lg shadow-md">
          {s.short}
        </div>
        <div className="absolute bottom-5 left-5 right-5 space-y-2">
          <div className="flex items-center gap-2 text-white text-lg font-helvCondBold drop-shadow">
            <MapPin size={20} className="text-scarlet" /> {s.title}
          </div>
          <div className="flex items-center gap-2 text-white/90 text-base drop-shadow">
            <Phone size={18} className="text-scarlet" /> {s.phone}
          </div>
        </div>
      </Link>
    ))}
  </div>
</Section>


      {/* ===== CTA (как в StudioPage: full-bleed с оверлеем) ===== */}
<Section className="bg-paper">
  <div className="relative rounded-2xl overflow-hidden shadow-soft">
    <img
      src={hero.image}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
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
            Если вы давно хотите начать заниматься спортом, но не можете
            определиться с направлением — запишитесь на пробную тренировку
            в одну из студий ReForma.
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
            {hero.ctaText}
          </button>
        </div>
      </div>
    </div>
  </div>
</Section>


        {/* Галерея (опционально) */}
        {gallery?.length > 0 && (
          <Section className="bg-paper">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((src, i) => (
                <div key={i} className="rounded-xl overflow-hidden">
                  <img src={src} alt={`${title} фото ${i + 1}`} className="w-full h-64 object-cover" />
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* сама модалка */}
        <TrialModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    </HelmetProvider>
  );
}
