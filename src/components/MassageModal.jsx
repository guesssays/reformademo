// src/components/MassageModal.jsx
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { studios } from "../data/homeData";

export default function MassageModal({ open, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [studio, setStudio] = useState("st-alm"); // дефолт

  // короткие названия
  const modalStudios = [
    { id: "st-alm", label: "Алимкент" },
    { id: "st-aly", label: "Алайский" },
  ];

  const canSubmit = name.trim() && phone.replace(/\D/g, "").length >= 10 && studio;

  // блокируем прокрутку при открытии
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

  const onSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const stTitle =
      studios.find((s) => s.id === studio)?.title ||
      modalStudios.find((s) => s.id === studio)?.label ||
      "";

    const msg = encodeURIComponent(
      `Здравствуйте! Хочу записаться на массаж.\nИмя: ${name}\nТелефон: ${phone}\nСтудия: ${stTitle}`
    );
    window.open(`https://wa.me/998933775697?text=${msg}`, "_blank");
    onClose?.();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
      {/* оверлей */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* карточка */}
      <div className="relative z-[101] w-[92%] max-w-[480px]">
        <div className="rounded-3xl bg-white overflow-hidden shadow-2xl">
          {/* верхняя картинка */}
          <div className="relative h-32 sm:h-40">
            <img
              src="/images/massage3.jpg"
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
              ЗАПИШИТЕСЬ НА МАССАЖ
            </h3>
            <p className="mt-2 font-helvCond text-[#161A1D]/80 text-[14px] sm:text-[16px]">
              Заполните все поля — менеджер свяжется с вами в ближайшее время.
            </p>

            <form className="mt-5 space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="block text-xs font-helvCond text-[#161A1D]/70 mb-1">Имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="w-full rounded-xl border border-[#161A1D]/15 bg-[#161A1D]/5 px-4 py-3 outline-none focus:border-scarlet"
                />
              </div>

              <div>
                <label className="block text-xs font-helvCond text-[#161A1D]/70 mb-1">Телефон</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 93 377 56 97"
                  className="w-full rounded-xl border border-[#161A1D]/15 bg-[#161A1D]/5 px-4 py-3 outline-none focus:border-scarlet"
                />
              </div>

              {/* селект — ширина как у инпутов; кастомный контейнер выпадашки узкий, скруглённый */}
              <div>
                <label className="block text-xs font-helvCond text-[#161A1D]/70 mb-1">Выберите студию</label>
                <div className="relative">
                  <select
                    value={studio}
                    onChange={(e) => setStudio(e.target.value)}
                    className="
                      w-full rounded-xl border border-[#161A1D]/15 bg-[#161A1D]/5
                      px-4 py-3 pr-10 outline-none focus:border-scarlet
                      text-sm font-helvCond text-[#161A1D]/90
                      [appearance:none]
                    "
                  >
                    {modalStudios.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>

                  {/* стрелка */}
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#161A1D]/60"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M5.25 7.5l4.75 4.75L14.75 7.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>

                  {/* стили выпадающего списка (Chrome) */}
                  <style>{`
                    select {
                      background-clip: padding-box;
                    }
                    /* ширина и внешний вид нативного списка повлиять можно частично;
                       мы оставим системный дропдаун, а контейнер инпута — как у остальных полей */
                  `}</style>
                </div>
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
