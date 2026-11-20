// Ilustrações vetoriais do caminhão-tanque usadas na cena pinada.
// Mesmo modelo nas vistas lateral e de topo (consistência entre as cenas).

export const paints = [
  { body: "url(#steel)", band: "#22E6FF", nome: "Água" },
  { body: "#FFC400", band: "#061CE0", nome: "Combustível" },
  { body: "#E9ECF1", band: "#8E97A6", nome: "Estacionário" },
  { body: "#F7F7F5", band: "#2E8B57", nome: "Saneamento" },
  { body: "#2F8F3A", band: "#FFC400", nome: "Agrícola" },
];

/** Caminhão lateral com ponte rolante. viewBox 0 -300 820 544 (base = linha das rodas). */
export function TruckSide() {
  return (
    <svg viewBox="0 -300 820 544" className="h-auto w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdfdfd" />
          <stop offset=".35" stopColor="#d9dde3" />
          <stop offset=".62" stopColor="#f4f5f7" />
          <stop offset="1" stopColor="#9aa2ad" />
        </linearGradient>
        <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".4" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".22" />
        </linearGradient>
        <clipPath id="tank-shape"><rect x="70" y="70" width="520" height="104" rx="42" /></clipPath>
      </defs>

      {/* Ponte rolante */}
      <g data-crane>
        <rect x="-600" y="-292" width="2020" height="26" fill="#FFC400" />
        <rect x="-600" y="-266" width="2020" height="6" fill="#0B0B0C" />
        <g fill="#0B0B0C" opacity=".85">
          {Array.from({ length: 40 }).map((_, i) => (
            <path key={i} d={`M${-600 + i * 52} -292 l20 0 l-26 26 l-20 0z`} />
          ))}
        </g>
        <rect x="290" y="-266" width="80" height="30" rx="4" fill="#26272b" />
        <circle cx="306" cy="-270" r="7" fill="#9aa2ad" /><circle cx="354" cy="-270" r="7" fill="#9aa2ad" />
      </g>

      {/* Chassi + rodas */}
      <g>
        <rect x="56" y="176" width="730" height="16" rx="3" fill="#1b1c1f" />
        <rect x="300" y="192" width="104" height="26" rx="3" fill="#2d2f34" />
        <rect x="60" y="192" width="22" height="30" fill="#1b1c1f" />
        <g fill="#c62828"><rect x="60" y="212" width="22" height="8" /></g>
        <path d="M120 192 a54 54 0 0 1 166 0" fill="#1b1c1f" />
        {[150, 240, 700].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="214" r="30" fill="#111214" />
            <circle cx={cx} cy="214" r="15" fill="#c9ced6" />
            <circle cx={cx} cy="214" r="5" fill="#5b616b" />
          </g>
        ))}
      </g>

      {/* Cabine */}
      <g>
        <path d="M612 192 V96 Q612 70 638 70 H722 Q748 70 762 96 L794 152 V192 Z" fill="#061CE0" />
        <path d="M612 192 V96 Q612 70 638 70 H722 Q748 70 762 96 L794 152 V192 Z" fill="url(#shade)" />
        <path d="M688 84 H726 Q740 84 748 100 L770 142 H688 Z" fill="#0a1150" />
        <path d="M694 90 H712 L700 136 H694 Z" fill="#fff" opacity=".18" />
        <path d="M676 84 V186" stroke="#0a1150" strokeWidth="2" opacity=".5" />
        <rect x="652" y="150" width="16" height="4" rx="2" fill="#0a1150" opacity=".6" />
        <rect x="780" y="160" width="20" height="34" rx="3" fill="#111214" />
        <rect x="786" y="152" width="10" height="8" rx="2" fill="#FFC400" />
        <rect x="764" y="86" width="5" height="40" rx="2" fill="#111214" />
        <text x="626" y="180" fill="#fff" fontFamily="var(--font-anton)" fontSize="16" letterSpacing="1">ALFA</text>
      </g>

      {/* Corpo do tanque (descido pela ponte rolante) */}
      <g data-tank>
        <g data-cables>
          <path d="M180 66 L330 -60 L480 66" fill="none" stroke="#26272b" strokeWidth="3" />
          <path d="M330 -84 V-900" stroke="#26272b" strokeWidth="4" />
          <rect x="314" y="-84" width="32" height="30" rx="5" fill="#FFC400" stroke="#0B0B0C" strokeWidth="3" />
          <path d="M330 -54 v8 a8 8 0 1 1 -8 8" fill="none" stroke="#0B0B0C" strokeWidth="4" />
        </g>
        <g stroke="#7d8591" strokeWidth="3">
          <path d="M120 58 H560" />
          {[120, 230, 340, 450, 560].map((x) => <path key={x} d={`M${x} 58 V72`} />)}
        </g>
        <rect x="70" y="70" width="520" height="104" rx="42" fill="url(#steel)" />
        {paints.map((p, i) => (
          <g key={p.nome} data-paint={i} opacity={i === 0 ? 1 : 0} clipPath="url(#tank-shape)">
            <rect x="70" y="70" width="520" height="104" fill={p.body} />
            <rect x="70" y="140" width="520" height="12" fill={p.band} />
          </g>
        ))}
        <rect x="70" y="70" width="520" height="104" rx="42" fill="url(#shade)" />
        {[160, 310, 460].map((x) => <rect key={x} x={x} y="62" width="54" height="10" rx="3" fill="#8e97a6" />)}
        <circle cx="180" cy="66" r="5" fill="#26272b" /><circle cx="480" cy="66" r="5" fill="#26272b" />
        <g stroke="#5b616b" strokeWidth="3"><path d="M84 76 V170 M100 76 V170" />{[90, 112, 134, 156].map((y) => <path key={y} d={`M84 ${y} H100`} />)}</g>
        <text x="330" y="124" textAnchor="middle" fill="#061CE0" fontFamily="var(--font-anton)" fontSize="34" letterSpacing="2">ALFA</text>
        <text x="330" y="138" textAnchor="middle" fill="#0B0B0C" fontFamily="var(--font-archivo)" fontWeight="800" fontSize="8" letterSpacing="2">EQUIPAMENTOS RODOVIÁRIOS</text>
      </g>
    </svg>
  );
}

/** Caminhão visto de cima, apontando para +x (para autoRotate). Centro em 0,0. */
export function TruckTop({ id = "truck-top" }: { id?: string }) {
  return (
    <g id={id}>
      <rect x="-128" y="-30" width="256" height="60" rx="6" fill="#000" opacity=".25" transform="translate(6 6)" />
      {[-96, -66, 92].map((x) => (
        <g key={x} fill="#111214"><rect x={x} y="-34" width="22" height="8" rx="2" /><rect x={x} y="26" width="22" height="8" rx="2" /></g>
      ))}
      <rect x="-128" y="-28" width="186" height="56" rx="26" fill="url(#steel-top)" stroke="#8e97a6" strokeWidth="2" />
      {[-90, -30, 30].map((x) => <circle key={x} cx={x} cy="0" r="11" fill="#c9ced6" stroke="#5b616b" strokeWidth="3" />)}
      <path d="M-120 -14 H50 M-120 14 H50" stroke="#7d8591" strokeWidth="2" strokeDasharray="4 6" />
      <rect x="64" y="-28" width="62" height="56" rx="8" fill="#061CE0" />
      <rect x="100" y="-24" width="20" height="48" rx="5" fill="#0a1150" />
      <rect x="70" y="-22" width="26" height="44" rx="4" fill="#fff" opacity=".14" />
    </g>
  );
}

export function SteelTopDefs() {
  return (
    <linearGradient id="steel-top" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#9aa2ad" />
      <stop offset=".5" stopColor="#ffffff" />
      <stop offset="1" stopColor="#9aa2ad" />
    </linearGradient>
  );
}
