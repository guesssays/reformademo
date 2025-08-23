// src/components/Footer.jsx
import { Instagram, Facebook, Send } from "lucide-react";
import { directions, studios } from "../data/homeData";

// тот же безопасный генератор href для направления, что и в Header
const dirHref = (d) =>
  `/directions/${
    d.slug ||
    encodeURIComponent(d.title.trim().toLowerCase().replace(/\s+/g, "-"))
  }`;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0b0d] text-white mt-auto">
      <div className="pl-6 md:pl-10 pr-6 md:pr-10 py-10">
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-4">
          {/* ===== COL 1 ===== */}
          <div className="space-y-4">
 <div className="flex items-center font-bold text-2xl leading-none">
  <span className="text-scarlet">R</span>
  <span className="text-white tracking-[-1px]">e</span>
  <span className="text-scarlet">F</span>
  <span className="text-white tracking-[-1px]">orma</span>
</div>


            <div className="text-xs md:text-sm text-white/70 space-y-2">
              <div>© {year} “REFORMA”. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</div>
              <div>СП “Service Improvement”</div>
              <div>Юр. адрес: г. Ташкент, Алимкент 33</div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="text-base md:text-lg font-bebas text-white/60">Правовые документы</div>
              <ul className="text-sm text-white/80 space-y-1">
                <li><a href="/privacy" className="hover:text-scarlet">Политика конфиденциальности</a></li>
                <li><a href="/offer" className="hover:text-scarlet">Договор оферты</a></li>
              </ul>
            </div>
          </div>

          {/* ===== COL 2 ===== */}
          <div>
            <div className="text-base md:text-lg font-bebas text-white/60 mb-3">Меню:</div>
            <ul className="text-sm text-white/80 space-y-2">
              <li><a href="/" className="hover:text-scarlet">Главная</a></li>
              <li><a href="/about" className="hover:text-scarlet">О компании</a></li>
              <li><a href="/massage" className="hover:text-scarlet">Массаж</a></li>
       
            </ul>
          </div>

          {/* ===== COL 3: Направления (динамически, ссылки на страницы направлений) ===== */}
          <div>
            <div className="text-base md:text-lg font-bebas text-white/60 mb-3">Направления:</div>
            <ul className="text-sm text-white/80 space-y-2">
              {directions.slice(0, 7).map((d, i) => (
                <li key={i}>
                  <a href={dirHref(d)} className="hover:text-scarlet">
                    {d.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== COL 4: Студии ===== */}
          <div className="space-y-6">
            <div>
              <div className="text-base md:text-lg font-bebas text-white/60 mb-3">Студии:</div>
              <ul className="text-sm text-white/80 space-y-2">
                {studios.map((s, i) => (
                  <li key={i}>
                    <a href={`/studios/${s.id}`} className="hover:text-scarlet">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-base md:text-lg font-bebas text-white/60 mb-3">Контакты</div>
              <div className="text-sm text-white/80 space-y-2">
                <div>+998 93 377 56 97</div>
                <div>+998 93 377 56 97</div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <a href="https://t.me/reforma_fitness" aria-label="Telegram" className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-white hover:bg-white/10 transition">
                  <Send size={18} />
                </a>
                <a href="https://www.instagram.com/reforma_uz/?hl=ru" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-white hover:bg-white/10 transition">
                  <Instagram size={18} />
                </a>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
