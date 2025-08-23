// src/components/TrialModal.jsx
import { useEffect, useRef, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { studios } from "../data/homeData";

// короткие названия для модалки
const modalStudios = [
  { id: "st-alm", label: "Алимкент" },
  { id: "st-aly", label: "Алайский" },
];

/* Кастомный селект, стилизованный как инпут */
function NiceSelect({ value, onChange, options, placeholder = "Выберите..." }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const listRef = useRef(null);

  const current = options.find((o) => o.id === value);

  // закрытие по клику вне
  useEffect(() => {
    const onDocClick = (e) => {
      if (!btnRef.current || !listRef.current) return;
      if (
        !btnRef.current.contains(e.target) &&
        !listRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // клавиатура
  useEffect(() => {
    const onKey = (e) => {
      if (!open) return;
      const idx = options.findIndex((o) => o.id === value);
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = options[Math.min(idx + 1, options.length - 1)];
        onChange(next.id);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = options[Math.max(idx - 1, 0)];
        onChange(prev.id);
      }
      if (e.key === "Enter") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, options, value, onChange]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          w-full rounded-xl border border-[#161A1D]/15 bg-[#161A1D]/5 
          px-4 py-3 pr-10 text-left outline-none focus:border-scarlet
          text-sm font-helvCond text-[#161A1D]/90 hover:bg-[#161A1D]/10 transition
        "
      >
        {current ? current.label : <span className="text-[#161A1D]/50">{placeholder}</span>}
        <ChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#161A1D]/60 transition
            ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* выпадающий список */}
      {open && (
        <ul
          ref={listRef}
          className="
            absolute z-20 mt-1 w-full overflow-auto rounded-xl border border-[#161A1D]/15 bg-white
            shadow-xl max-h-56
          "
        >
          {options.map((o) => {
            const active = o.id === value;
            return (
              <li key={o.id}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.id);
                    setOpen(false);
                  }}
                  className={`
                    block w-full text-left px-4 py-2.5 text-sm font-helvCond
                    ${active ? "bg-scarlet/10 text-[#161A1D]" : "text-[#161A1D]"}
                    hover:bg-[#161A1D]/5
                  `}
                >
                  {o.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function TrialModal({ open, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [studio, setStudio] = useState(modalStudios[0].id);

  // блокируем прокрутку страницы, пока модалка открыта
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = original);
  }, [open]);

  // Esc — закрыть
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const canSubmit =
    name.trim() && phone.replace(/\D/g, "").length >= 10 && studio;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    const stFull = studios.find((s) => s.id === studio)?.title || "";
    const msg = encodeURIComponent(
      `Здравствуйте! Хочу записаться на пробное занятие.\nИмя: ${name}\nТелефон: ${phone}\nСтудия: ${stFull}`
    );
    window.open(`https://wa.me/998933775697?text=${msg}`, "_blank");
    onClose?.();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* фон-оверлей */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* карточка */}
      <div className="relative z-[101] w-[92%] max-w-[480px]">
        <div className="rounded-3xl bg-white overflow-hidden shadow-2xl">
          {/* верхняя картинка */}
          <div className="relative h-32 sm:h-40">
            <img
              src="/images/top.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <button
              onClick={onClose}
              aria-label="Закрыть"
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#161A1D] hover:bg-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* форма */}
          <div className="p-5 sm:p-7">
            <h3 className="font-bebas text-[#161A1D] text-[24px] sm:text-[28px] md:text-[32px] leading-none">
              ЗАПИШИТЕСЬ НА ПРОБНОЕ ЗАНЯТИЕ
            </h3>
            <p className="mt-2 font-helvCond text-[#161A1D]/80 text-[14px] sm:text-[16px]">
              Заполните все поля — менеджер свяжется с вами в ближайшее время.
            </p>

            <form className="mt-5 space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="block text-xs font-helvCond text-[#161A1D]/70 mb-1">
                  Имя
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="w-full rounded-xl border border-[#161A1D]/15 bg-[#161A1D]/5 px-4 py-3 outline-none focus:border-scarlet"
                />
              </div>

              <div>
                <label className="block text-xs font-helvCond text-[#161A1D]/70 mb-1">
                  Телефон
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 93 377 56 97"
                  className="w-full rounded-xl border border-[#161A1D]/15 bg-[#161A1D]/5 px-4 py-3 outline-none focus:border-scarlet"
                />
              </div>

              <div>
                <label className="block text-xs font-helvCond text-[#161A1D]/70 mb-1">
                  Выберите студию
                </label>
                <NiceSelect
                  value={studio}
                  onChange={setStudio}
                  options={modalStudios}
                  placeholder="Студия"
                />
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full rounded-full px-6 py-3 font-bebas tracking-wide text-white shadow-md transition
                ${canSubmit ? "bg-scarlet hover:bg-scarlet/90" : "bg-ink/30 cursor-not-allowed"}`}
              >
                ОТПРАВИТЬ
              </button>

              <p className="text-[11px] text-[#161A1D]/60">
                Нажимая «Отправить», вы соглашаетесь на обработку персональных данных.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
