import { useEffect, useState } from "react";
import { directions, studios } from "../data/homeData";
import { Menu, X, ChevronDown } from "lucide-react";

/* ссылки "О нас", "Контакты" должны работать с любой страницы */
const moreLinks = [
  { title: "О нас", href: "/#about" },
  { title: "Контакты", href: "/#contacts" },
];

/* безопасный href на страницу направления — доступен всем компонентам файла */
const dirHref = (d) =>
  `/directions/${
    d.slug ||
    encodeURIComponent(
      d.title.trim().toLowerCase().replace(/\s+/g, "-")
    )
  }`;

export default function Header() {
  const [showFixed, setShowFixed] = useState(false);
  const [hidden, setHidden] = useState(false);

  // выпадашки расписания (десктоп)
  const [scheduleOpenStatic, setScheduleOpenStatic] = useState(false);
  const [scheduleOpenFixed, setScheduleOpenFixed] = useState(false);

  // мобильное прикреплённое меню
  const [mobileOpenStatic, setMobileOpenStatic] = useState(false);
  const [mobileOpenFixed, setMobileOpenFixed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        setShowFixed(true);
        setHidden(false);
        setMobileOpenStatic(false);
      } else if (window.scrollY > 40) {
        setHidden(true);
        setShowFixed(false);
        setMobileOpenFixed(false);
      } else {
        setHidden(false);
        setShowFixed(false);
        setMobileOpenFixed(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // клик вне расписания закрывает его
  useEffect(() => {
    const onClick = (e) => {
      const panels = document.querySelectorAll(".schedule-panel, .schedule-btn");
      if (![...panels].some((el) => el.contains(e.target))) {
        setScheduleOpenStatic(false);
        setScheduleOpenFixed(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {/* --- Статичный хедер --- */}
      {!showFixed && !hidden && (
        <header className="absolute top-0 left-0 w-full z-40">
          <div className="bleed">
            <div className="edge relative flex items-center gap-6 py-3 lg:py-4">
              <Logo />
              <Nav />
              <RightPart
                setMobileOpen={() => setMobileOpenStatic((v) => !v)}
                scheduleOpen={scheduleOpenStatic}
                setScheduleOpen={setScheduleOpenStatic}
              />
              <MobilePanel
                open={mobileOpenStatic}
                onClose={() => setMobileOpenStatic(false)}
              />
            </div>
          </div>
        </header>
      )}

      {/* --- Фиксированный хедер --- */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
          showFixed ? "translate-y-0 bg-paper/95 backdrop-blur" : "-translate-y-full"
        }`}
      >
        <div className="bleed">
          <div className="edge relative flex items-center gap-6 py-3 lg:py-4">
            <Logo />
            <Nav />
            <RightPart
              setMobileOpen={() => setMobileOpenFixed((v) => !v)}
              scheduleOpen={scheduleOpenFixed}
              setScheduleOpen={setScheduleOpenFixed}
            />
            <MobilePanel
              open={mobileOpenFixed}
              onClose={() => setMobileOpenFixed(false)}
            />
          </div>
        </div>
      </header>
    </>
  );
}

function Logo() {
  return (
    <a href="/#hero" className="shrink-0 flex items-center">
      <img src="/images/logolead.png" alt="ReForma" className="h-11 w-auto" />
    </a>
  );
}

/* ---------- Десктопное меню ---------- */
function Nav() {
  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-6 xl:gap-8 font-bebas text-[20px] tracking-wide">
        <li>
          <a href="/#hero" className="nav-a flex items-center gap-1">ГЛАВНАЯ</a>
        </li>

        {/* НАПРАВЛЕНИЯ */}
        <li className="relative group before:absolute before:inset-x-0 before:top-full before:h-2">
          <a href="/#directions" className="nav-a flex items-center gap-1">
            НАПРАВЛЕНИЯ <Caret />
          </a>
          <div className="menu-panel absolute left-0 top-full z-50 w-[480px]
                          opacity-0 -translate-y-1 invisible
                          group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible">
            <div className="grid grid-cols-3 gap-4 p-4">
              {["MOVEMENT", "MINDSET", "RECOVERY"].map((tag) => (
                <div key={tag}>
                  <div className="text-sm font-bebas text-white/70 mb-2">{tag}</div>
                  <ul className="space-y-1">
                    {directions.filter(d => d.tag === tag).map((d, i) => (
                      <li key={i}>
                        <a href={dirHref(d)} className="menu-item">{d.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </li>

        {/* СТУДИИ */}
        <li className="relative group before:absolute before:inset-x-0 before:top-full before:h-2">
          <a href="/#studios" className="nav-a flex items-center gap-1">
            СТУДИИ <Caret />
          </a>
          <div className="menu-panel absolute left-0 top-full z-50 min-w-[260px]
                          opacity-0 -translate-y-1 invisible
                          group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible">
            <ul className="p-2">
              {studios.map((s, i) => (
                <li key={i}>
                  <a href={`/studios/${s.id}`} className="menu-item">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </li>

        {/* ЕЩЁ */}
        <li className="relative group before:absolute before:inset-x-0 before:top-full before:h-2">
          <span className="nav-a flex items-center gap-1 cursor-pointer">
            ЕЩЁ <Caret />
          </span>
          <div className="menu-panel absolute left-0 top-full z-50 min-w-[200px]
                          opacity-0 -translate-y-1 invisible
                          group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible">
            <ul className="p-2">
              {moreLinks.map((m, i) => (
                <li key={i}>
                  <a href={m.href} className="menu-item">{m.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}

/* ---------- Правая часть ---------- */
function RightPart({ setMobileOpen, scheduleOpen, setScheduleOpen }) {
  return (
    <div className="ml-auto flex items-center gap-3">
      {/* Бургер — только мобилки */}
      <button
        onClick={setMobileOpen}
        className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md bg-ink/10 text-ink"
        aria-label="Открыть меню"
      >
        <Menu size={22} />
      </button>

      {/* Десктоп: соцсети + расписание */}
      <div className="hidden lg:flex items-center gap-3">
        <a href="https://t.me/" target="_blank" rel="noreferrer" className="icon-btn" aria-label="Telegram">
          <TelegramIcon />
        </a>
        <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="icon-btn" aria-label="Instagram">
          <InstagramIcon />
        </a>

        <div className="relative">
          <button
            onClick={() => setScheduleOpen((v) => !v)}
            className="schedule-btn font-helvCondBold schedule-btn"
          >
            РАСПИСАНИЕ
            <svg className={`ml-2 h-3 w-3 transition ${scheduleOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.25 7.5l4.75 4.75L14.75 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>

<div className={`menu-panel schedule-panel absolute right-0 top-full mt-2 min-w-[240px] z-50 ${
  scheduleOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-1"
}`}>
  <ul className="p-2">
    {studios.map((s, i) => (
      <li key={i}>
        <a href={`/studios/${s.id}#schedule`} className="menu-item">
          {s.title}
        </a>
      </li>
    ))}
  </ul>
</div>

        </div>
      </div>
    </div>
  );
}

/* ---------- Прикреплённая мобильная панель ---------- */
function MobilePanel({ open, onClose }) {
  const [dirOpen, setDirOpen] = useState(false);
  const [studOpen, setStudOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [schedOpen, setSchedOpen] = useState(false);

  return (
    <div
      className={`
        lg:hidden absolute left-0 right-0 top-full origin-top
        bg-paper text-ink shadow-xl rounded-b-2xl overflow-hidden
        transition-all duration-300
        ${open ? "max-h-[80vh] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}
      `}
      aria-hidden={!open}
    >
      <div className="px-5 pt-3 pb-5">
        {/* Главная */}
        <a href="/#hero" onClick={onClose} className="block py-2 font-bebas tracking-wide text-base">
          ГЛАВНАЯ
        </a>

        {/* Заголовок и крестик */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-bebas tracking-wide text-lg text-ink/70">МЕНЮ</span>
          <button onClick={onClose} aria-label="Закрыть" className="p-2 rounded-md text-ink hover:bg-ink/5">
            <X size={20} />
          </button>
        </div>
{/* НАПРАВЛЕНИЯ — внутренний скролл и без onClose у ссылок */}
<DropItem title="НАПРАВЛЕНИЯ" open={dirOpen} onToggle={() => setDirOpen(!dirOpen)}>
  <div
    className={`
      grid grid-cols-1 gap-3
      max-h-[45vh] overflow-y-auto overscroll-contain pr-2 -mr-2
    `}
    style={{ WebkitOverflowScrolling: "touch" }}
  >
    {["MOVEMENT", "MINDSET", "RECOVERY"].map((tag) => (
      <div key={tag}>
        <div className="text-xs font-bebas tracking-wide text-ink/60 mb-1">{tag}</div>
        <ul className="space-y-1">
          {directions.filter(d => d.tag === tag).map((d, i) => (
            <li key={`${tag}-${i}`}>
              {/* ВАЖНО: без onClick={onClose} */}
              <a
                href={dirHref(d)}
                className="menu-item !px-0 !py-1.5 !text-ink hover:!bg-ink/5"
              >
                {d.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</DropItem>


        {/* СТУДИИ */}
        <DropItem title="СТУДИИ" open={studOpen} onToggle={() => setStudOpen(!studOpen)}>
          <ul className="space-y-1">
            {studios.map((s, i) => (
              <li key={i}>
                <a href={`/studios/${s.id}`} className="menu-item !px-0 !py-1.5" onClick={onClose}>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </DropItem>

        {/* ЕЩЁ */}
        <DropItem title="ЕЩЁ" open={moreOpen} onToggle={() => setMoreOpen(!moreOpen)}>
          <ul className="space-y-1">
            {moreLinks.map((m, i) => (
              <li key={i}>
                <a href={m.href} className="menu-item !px-0 !py-1.5" onClick={onClose}>
                  {m.title}
                </a>
              </li>
            ))}
          </ul>
        </DropItem>

        {/* Соцкнопки — по центру */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <a href="https://t.me/" target="_blank" rel="noreferrer"
             className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-ink/10 text-ink hover:bg-ink/15">
            <TelegramIcon />
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer"
             className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-ink/10 text-ink hover:bg-ink/15">
            <InstagramIcon />
          </a>
        </div>

        {/* Действия: звонок + выпадающий список РАСПИСАНИЕ */}
        <div className="mt-4 flex flex-col gap-3">
          <a href="tel:+998933775697" className="inline-flex items-center justify-center rounded-full bg-scarlet text-white px-5 py-2 font-bebas tracking-wide hover:bg-crimson">
            Позвонить
          </a>

          <button
            onClick={() => setSchedOpen(v => !v)}
            className="inline-flex items-center justify-center rounded-full border border-ink/20 text-ink px-5 py-2 font-helvCond hover:bg-ink/5"
          >
            Расписание
            <ChevronDown className={`ml-2 h-4 w-4 transition ${schedOpen ? "rotate-180" : ""}`} />
          </button>

        <div className={`overflow-hidden transition-all duration-300 ${schedOpen ? "max-h-[400px] mt-2" : "max-h-0"}`}>
  <ul className="rounded-xl border border-ink/10 divide-y divide-ink/10 bg-white">
    {studios.map((s, i) => (
      <li key={i}>
        <a
          href={`/studios/${s.id}#schedule`}
          className="block px-4 py-3 hover:bg-ink/5"
          onClick={onClose}
        >
          {s.title}
        </a>
      </li>
    ))}
  </ul>
</div>

        </div>
      </div>
    </div>
  );
}

function DropItem({ title, open, onToggle, children }) {
  return (
    <div className="border-b border-ink/10 py-3">
      <button onClick={onToggle} className="w-full flex items-center justify-between text-left font-bebas tracking-wide">
        <span>{title}</span>
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[1000px] mt-2" : "max-h-0"}`}>
        {children}
      </div>
    </div>
  );
}

function Caret() {
  return (
    <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor">
      <path d="M5.25 7.5l4.75 4.75L14.75 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M9.03 14.83l-.37 5.23c.53 0 .76-.22 1.04-.49l2.5-2.39 5.18 3.79c.95.52 1.63.25 1.88-.88l3.41-15.99c.3-1.39-.5-1.93-1.41-1.59L1.44 9.36c-1.34.52-1.32 1.3-.22 1.64l5.16 1.61 11.98-7.52c.56-.36 1.07-.16.65.2" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3a5 5 0 110 10 5 5 0 010-10zm0 2.2a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zM17.5 6.5a1 1 0 110 2 1 1 0 010-2z" />
    </svg>
  );
}
