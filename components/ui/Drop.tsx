// Gota de líquido "congelada no ar" (SVG com brilho), usada nos heros
export default function Drop({ color, size, className = "", style, rotate = 0 }: { color: string; size: number; className?: string; style?: React.CSSProperties; rotate?: number }) {
  return (
    <svg viewBox="0 0 40 52" width={size} height={size * 1.3} className={className} style={{ ...style, rotate: `${rotate}deg` }} aria-hidden="true">
      <path d="M20 2 C 28 16 38 26 38 34 A 18 18 0 0 1 2 34 C 2 26 12 16 20 2 Z" fill={color} />
      <path d="M20 2 C 28 16 38 26 38 34 A 18 18 0 0 1 20 52 A 18 18 0 0 0 30 36 C 30 28 24 18 20 2 Z" fill="#000" opacity=".18" />
      <ellipse cx="12.5" cy="32" rx="3.2" ry="6" fill="#fff" opacity=".75" transform="rotate(20 12.5 32)" />
    </svg>
  );
}
