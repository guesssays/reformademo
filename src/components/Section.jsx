export default function Section({ id, className = "", children }) {
  const isBleed = className.includes("section--bleed")

  return (
    <section id={id} className={`section ${className}`}>
      <div className="bleed">
        {/* edge только если НЕ bleed */}
        <div className={isBleed ? "" : "edge"}>
          {children}
        </div>
      </div>
    </section>
  )
}
