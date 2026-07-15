// Локальные бренд-иконки.
// В lucide-react v1 удалены бренд-логотипы (Instagram, Facebook и т.п.) по причинам
// товарных знаков. Эти компоненты повторяют прежние SVG lucide 1:1
// (viewBox 24, fill none, stroke currentColor, stroke-width 2, round) — чтобы
// внешний вид сайта не изменился. API совместим с lucide: size / color / strokeWidth.

function baseProps({ size = 24, color = "currentColor", strokeWidth = 2, ...rest }) {
  return {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...rest,
  };
}

export function Instagram(props) {
  return (
    <svg {...baseProps(props)}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Facebook(props) {
  return (
    <svg {...baseProps(props)}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
