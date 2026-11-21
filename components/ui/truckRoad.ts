// "Nossos tanques": caminhão real andando na pista e trocando de tanque, desenhado ao vivo num <canvas>.
// Tudo em "unidades de quadro": 1000 u = largura do caminhão = largura do contêiner [data-side].
// A pista é repetida em toda a largura da tela (sem cortes), e o tempo `t` vem do scroll (0 → DUR).

export const DUR = 13.6;
const SLUGS = ["agua", "combustivel", "saneamento", "agricola"] as const;
type Slug = (typeof SLUGS)[number];
const PLAN: [number, Slug, Slug][] = [[2.6, "agua", "combustivel"], [5.4, "combustivel", "saneamento"], [8.2, "saneamento", "agricola"]];  // termina no agrícola: sem voltar ao primeiro tanque
const SWEEP = 1.1;
const CX = 960, TX = 460, TW = 1000, WHEEL_Y = 470, Y0 = 358, Y1 = 592;
const TH = (769 * TW) / 1772, TY = WHEEL_Y - TH;
const TILE_W = 499; // largura de um ladrilho da pista (u)
const SPEED = 300; // u de pista por unidade de t
const RODAS = [{ x: 0.17269, y: 0.75032, d: 0.10383 }, { x: 0.30362, y: 0.75032, d: 0.10383 }, { x: 0.80135, y: 0.74903, d: 0.1061 }];
const R_WHEEL = (RODAS[0].d * TW) / 2 / 0.97;
const BG = "rgb(244,244,242)";

const ease = (p: number) => 0.5 - 0.5 * Math.cos(Math.PI * p);
function state(t: number): [Slug, Slug | null, number] {
  let cur: Slug = "agua";
  for (const [t0, a, b] of PLAN) {
    if (t < t0) return [cur, null, 0];
    if (t < t0 + SWEEP) return [a, b, (t - t0) / SWEEP];
    cur = b;
  }
  return [cur, null, 0];
}
const loadImg = (src: string) =>
  new Promise<HTMLImageElement>((res, rej) => {
    const im = new Image();
    im.decoding = "async";
    im.onload = () => (im.decode ? im.decode().catch(() => {}).then(() => res(im)) : res(im));
    im.onerror = rej;
    im.src = src;
  });

// barra de luz (scanner) pré-desenhada uma vez
function makeBar() {
  const w = 320, h = 2 * (WHEEL_Y - 26 - (TY + 20)), c = document.createElement("canvas");
  c.width = w; c.height = h;
  const g = c.getContext("2d")!, img = g.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    const fy = Math.min(1, y / 80, (h - y) / 80);
    for (let x = 0; x < w; x++) {
      const dx = (x - w / 2) / 2;
      const a = Math.min(1, Math.exp(-((dx / 5) ** 2)) + 0.45 * Math.exp(-((dx / 26) ** 2))) * fy;
      const i = (y * w + x) * 4;
      img.data[i] = 255; img.data[i + 1] = 250; img.data[i + 2] = 232; img.data[i + 3] = a * 255;
    }
  }
  g.putImageData(img, 0, 0);
  return c;
}

export function createTruckRoad(canvas: HTMLCanvasElement, label: string) {
  const ctx = canvas.getContext("2d")!;
  const trucks = {} as Record<Slug, HTMLImageElement>;
  const wheels = {} as Record<Slug, HTMLImageElement[]>;
  let road: HTMLImageElement | null = null, bar: HTMLCanvasElement | null = null;
  let ready = false, started = false, t = 0, lastAng = 0, raf = 0;
  let cssW = 0, u = 1, dpr = 1;

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    cssW = r.width; u = r.height / Y1; dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
    render();
  };
  const ro = new ResizeObserver(resize);

  function drawTruck(s: Slug, bob: number, ang: number, dAng: number) {
    ctx.drawImage(trucks[s], TX, TY + bob, TW, TH);
    const n = Math.max(1, Math.min(6, Math.ceil(Math.abs(dAng) / 0.12)));
    RODAS.forEach((r, k) => {
      const d = r.d * TW, cx = TX + r.x * TW + d / 2, cy = TY + bob + r.y * TH + d / 2;
      for (let j = 0; j < n; j++) {
        ctx.save();
        ctx.globalAlpha = 1 / (j + 1); // média acumulada = desfoque de rotação
        ctx.translate(cx, cy);
        ctx.rotate(ang - (dAng * j) / n);
        ctx.drawImage(wheels[s][k], -d / 2, -d / 2, d, d);
        ctx.restore();
      }
    });
  }

  function render() {
    if (!ready || !cssW) return;
    const left = CX - cssW / 2 / u, right = CX + cssW / 2 / u; // limites visíveis em u
    ctx.setTransform(dpr * u, 0, 0, dpr * u, dpr * (cssW / 2 - CX * u), 0);
    ctx.fillStyle = BG;
    ctx.fillRect(left, 0, right - left, Y0);

    // letreiro atravessando ao fundo
    ctx.font = `360px ${(getComputedStyle(document.body).getPropertyValue("--font-anton").trim() || "Anton")}, Impact, sans-serif`;
    ctx.fillStyle = "rgb(227,227,223)";
    ctx.textBaseline = "alphabetic";
    const tw = ctx.measureText(label).width;
    ctx.fillText(label, right - (right - left + tw) * (t / DUR), Y0 + 6);

    // pista infinita
    const dist = t * SPEED;
    const off = ((dist % TILE_W) + TILE_W) % TILE_W;
    for (let x = (Math.floor((left + off) / TILE_W) - 1) * TILE_W - off; x < right; x += TILE_W) ctx.drawImage(road!, x, Y0, TILE_W + 0.5, Y1 - Y0);

    // sombra de contato
    ctx.save();
    ctx.translate(TX + 6 + TW / 2, WHEEL_Y + 1);
    ctx.scale(470, 22);
    const sg = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    sg.addColorStop(0, "rgba(0,0,0,.62)"); sg.addColorStop(0.7, "rgba(0,0,0,.35)"); sg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(0, 0, 1, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // caminhão (balanço leve) + troca de tanque com barra de luz
    const bob = Math.sin(t * 2 * Math.PI * 1.7) * 1.4 + Math.sin(t * 2 * Math.PI * 4.3) * 0.5;
    const ang = dist / R_WHEEL, dAng = ang - lastAng;
    lastAng = ang;
    const [old, nw, p] = state(t);
    drawTruck(old, bob, ang, dAng);
    if (nw) {
      const bx = TX + 0.06 * TW + 0.8 * TW * ease(p);
      ctx.save();
      ctx.beginPath(); ctx.rect(TX - 50, 0, bx - TX + 50, Y1); ctx.clip();
      drawTruck(nw, bob, ang, dAng);
      ctx.restore();
      ctx.globalAlpha = Math.min(1, p * 6, (1 - p) * 6);
      ctx.drawImage(bar!, bx - 80, TY + 20, 160, WHEEL_Y - 26 - (TY + 20));
      ctx.globalAlpha = 1;
    }
  }

  return {
    async load() {
      if (started) return;
      started = true;
      const base = "/img/real/nt";
      const [r, ...rest] = await Promise.all([
        loadImg(`${base}/pista.webp`),
        ...SLUGS.map((s) => loadImg(`${base}/caminhao-${s}.webp`)),
        ...SLUGS.flatMap((s) => RODAS.map((_, k) => loadImg(`${base}/roda-${s}-${k}.webp`))),
      ]);
      road = r;
      SLUGS.forEach((s, i) => { trucks[s] = rest[i]; wheels[s] = rest.slice(4 + i * 3, 7 + i * 3); });
      bar = makeBar();
      await document.fonts?.ready;
      ready = true;
      ro.observe(canvas);
      resize();
    },
    set(time: number) {
      t = Math.max(0, Math.min(DUR, time));
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); });
    },
    destroy() { ro.disconnect(); cancelAnimationFrame(raf); },
  };
}
