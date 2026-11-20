// Faixa de asfalto com faixa amarela tracejada correndo em loop
export default function Road({ className = "", height = 56 }: { className?: string; height?: number }) {
  return (
    <div aria-hidden="true" className={`relative overflow-hidden bg-[#151517] ${className}`} style={{ height }}>
      <div className="absolute inset-x-0 top-[6px] h-px bg-white/10" />
      <div
        className="absolute left-0 top-1/2 -mt-[3px] h-[6px] w-[200%]"
        style={{
          background: "repeating-linear-gradient(90deg, var(--alfa-accent) 0 70px, transparent 70px 120px)",
          animation: "road-move 1.4s linear infinite",
        }}
      />
      <div className="absolute inset-x-0 bottom-[6px] h-px bg-white/10" />
    </div>
  );
}

// Variante: onda de líquido
export function LiquidWave({ className = "", height = 56, color = "var(--liquid)" }: { className?: string; height?: number; color?: string }) {
  return (
    <div aria-hidden="true" className={`relative overflow-hidden ${className}`} style={{ height }}>
      <svg className="absolute bottom-0 left-0 h-full w-[200%]" viewBox="0 0 1200 60" preserveAspectRatio="none" style={{ animation: "marquee 6s linear infinite" }}>
        <path d="M0 30 Q 75 0 150 30 T 300 30 T 450 30 T 600 30 T 750 30 T 900 30 T 1050 30 T 1200 30 V60 H0Z" fill={color} />
      </svg>
    </div>
  );
}
