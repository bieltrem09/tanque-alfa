"use client";
// 7.2 — CENA PINADA "A FÁBRICA": uma única timeline pinada com scrub: 1.
// 2a montagem → 2b horizonte → 2c linhas de produto → 2d estrada vista de cima → 2e mergulho → 2f vapor
import Link from "next/link";
import { useRef } from "react";
import { Droplets, Fuel, Cylinder, Waves, Sprout, ShieldCheck, PencilRuler, Wrench, Factory, Gem, ClipboardCheck, Flame, CalendarCheck, ChevronRight } from "lucide-react";
import { fabrica } from "@/content/site";
import { tanques } from "@/content/tanques";
import { gsap, SplitText, useGSAP, reducedMotion } from "@/lib/gsap";
import { TruckSide, TruckTop, SteelTopDefs } from "@/components/ui/TruckSvgs";
import type { RealAssets } from "@/lib/realAssets";
import { HeroBackdrop, HeroUI, HeroStatic } from "./HeroCeu";
import { READY_EVENT } from "./Preloader";
import { createTruckRoad } from "@/components/ui/truckRoad";

const prodIcons = [Droplets, Fuel, Cylinder, Waves, Sprout];
const difIcons = [ShieldCheck, PencilRuler, Wrench, Factory];
const benIcons = [Gem, ClipboardCheck, Flame, CalendarCheck];

const ROAD = "M880,-120 C880,140 700,170 700,330 C700,480 880,470 880,600 L880,1200";
const ROUTE = "M880,-120 C880,140 700,170 700,330 C700,480 880,470 880,600";

// rota da vista de cima a partir do traçado da estrada real (faixa da direita, sentido de descida)
function rotaDaCurva(c: NonNullable<RealAssets["estradaCurva"]>, H: number, ate = 0.62) {
  const lane = -c.roadW * 1000 * 0.24;
  const pts = c.pts.filter(([, y]) => y <= ate).map(([x, y]) => ({ x: x * 1000 + lane, y: y * H }));
  return [{ x: pts[0].x, y: -160 }, ...pts];
}
// Catmull-Rom → curvas Bézier (caminho suave para o MotionPath seguir)
function caminho(p: { x: number; y: number }[]) {
  let d = `M${p[0].x.toFixed(1)},${p[0].y.toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] ?? p[i], b = p[i], c = p[i + 1], e = p[i + 2] ?? c;
    const c1 = { x: b.x + (c.x - a.x) / 6, y: b.y + (c.y - a.y) / 6 };
    const c2 = { x: c.x - (e.x - b.x) / 6, y: c.y - (e.y - b.y) / 6 };
    d += ` C${c1.x.toFixed(1)},${c1.y.toFixed(1)} ${c2.x.toFixed(1)},${c2.y.toFixed(1)} ${c.x.toFixed(1)},${c.y.toFixed(1)}`;
  }
  return d;
}

export default function FactoryScene({ real }: { real: RealAssets }) {
  const film = real.nossosTanques; // vídeo do caminhão andando e trocando de tanque (controlado pelo scroll)
  const photoSide = !film && !!real.lateral[0];
  const pick = (i: number) => (real.lateral[i] ? i : 0);
  const curva = real.estradaCurva;
  const curvaH = curva ? (1000 * curva.h) / curva.w : 1000;
  const rota = curva ? rotaDaCurva(curva, curvaH) : null;
  const topoW = curva ? curva.roadW * 1000 * 0.42 : 0; // largura do caminhão ≈ 42% da pista
  const LIFT = -32; // quanto o tanque começa suspenso (% da altura do quadro)
  const craneBottom = 100 + (-LIFT / 100 - (real.montagem?.gancho?.y ?? 0.11)) * 100; // ponte logo acima do gancho
  const root = useRef<HTMLElement>(null);
  const truckRoad = useRef<ReturnType<typeof createTruckRoad> | null>(null);
  const sway = useRef({ amp: 1 }); // balanço do tanque suspenso (zera ao encaixar)
  const G = real.montagem?.gancho ?? { x: 0.4, y: 0.01 };

  // HERO: entrada, nuvens, balanço e carregamento adiado das imagens das fases seguintes
  useGSAP(() => {
    const q = gsap.utils.selector(root);
    const loadDeferred = () => {
      q("[data-defer-src]").forEach((el) => { (el as HTMLImageElement).src = el.getAttribute("data-defer-src")!; el.removeAttribute("data-defer-src"); });
      q("[data-defer-href]").forEach((el) => { el.setAttribute("href", el.getAttribute("data-defer-href")!); el.removeAttribute("data-defer-href"); });
      // caminhão na pista (canvas ao vivo): baixa as imagens só depois do carregamento inicial
      const cv = q("[data-film]")[0] as HTMLCanvasElement | undefined;
      if (cv) {
        if (!truckRoad.current) truckRoad.current = createTruckRoad(cv, fabrica.nossos.toUpperCase());
        truckRoad.current.load();
      }
      q("[data-defer-bg]").forEach((el) => { (el as HTMLElement).style.backgroundImage = `url(${el.getAttribute("data-defer-bg")})`; el.removeAttribute("data-defer-bg"); });
    };
    const idle = () => ("requestIdleCallback" in window ? (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadDeferred) : setTimeout(loadDeferred, 300));
    if (document.readyState === "complete") setTimeout(idle, 800); else window.addEventListener("load", () => setTimeout(idle, 800), { once: true });
    window.addEventListener("scroll", loadDeferred, { once: true, passive: true });

    if (reducedMotion()) return;
    gsap.set(q("[data-h-in]"), { autoAlpha: 0, y: 26 });
    gsap.set(q("[data-h-word-in]"), { yPercent: 105 });
    gsap.set(q("[data-drop]"), { y: () => -window.innerHeight * 0.75 });
    const play = () => {
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(q("[data-h-sky-in]"), { scale: 1.12, duration: 2 }, 0)
        .to(q("[data-h-word-in]"), { yPercent: 0, duration: 1.2 }, 0.1)
        .to(q("[data-drop]"), { y: 0, duration: 1.6, ease: "back.out(1.15)" }, 0.35)
        .to(q("[data-h-in]"), { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.9);
    };
    if (document.documentElement.dataset.ready) play(); else window.addEventListener(READY_EVENT, play, { once: true });
    gsap.to(q("[data-clouds]"), { xPercent: -50, duration: 140, ease: "none", repeat: -1 });
    // balanço de carga pendurada: rotação senoidal multiplicada pela "amplitude" (vai a 0 no encaixe)
    const setRot = gsap.quickSetter(q("[data-sway]"), "rotation", "deg");
    const tick = (time: number) => setRot(Math.sin(time * 1.7) * 1.2 * sway.current.amp);
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, { scope: root });

  useGSAP(() => {
    if (reducedMotion()) return;
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();

    mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767.98px)" }, (ctx) => {
      const desktop = !!ctx.conditions?.desktop;
      const stage = q("[data-stage]")[0];
      const split = SplitText.create(q("[data-final]"), { type: "lines", mask: "lines" });
      gsap.set(split.lines, { yPercent: 110 });
      gsap.set(q("[data-shutter]"), { scaleY: 0, transformOrigin: "50% 100%" });
      gsap.set(q("[data-why]"), { autoAlpha: 0 });
      gsap.set(q("[data-why-bg]"), { autoAlpha: 0 });
      gsap.set(q("[data-why-content]"), { autoAlpha: 0 });
      gsap.set(q("[data-why-in]"), { autoAlpha: 0, y: 16 });
      gsap.set(q("[data-why-bar]"), { scaleX: 0 });
      gsap.set(q("[data-ben-line]"), { scaleX: 0 });
      gsap.set(q("[data-ben]"), { autoAlpha: 0, y: 24 });

      // estados iniciais
      const has = (sel: string) => q(sel).length > 0;
      if (has("svg [data-tank]")) gsap.set(q("svg [data-tank]"), { y: -150 });
      gsap.set(q("[data-real-tank]"), { yPercent: LIFT });
      gsap.set(q("[data-persp]"), { autoAlpha: 0 });
      gsap.set(q("[data-photo-paint]"), { autoAlpha: 0 });
      gsap.set(q("[data-ink]"), { yPercent: 100 });
      gsap.set(q("[data-big]"), { xPercent: 0, x: () => window.innerWidth });
      gsap.set(q("[data-hl] > *"), { yPercent: 110 });
      gsap.set(q("[data-para]"), { autoAlpha: 0, y: 20 });
      gsap.set(q("[data-track]"), { x: () => window.innerWidth });
      gsap.set(q("[data-col]"), { autoAlpha: 0.35 });
      gsap.set(q("[data-top]"), { autoAlpha: 0 });
      if (q("[data-road]").length) gsap.set(q("[data-road]"), { drawSVG: "0%" });
      gsap.set(q("[data-curva]"), { autoAlpha: 0, scale: 1.08, transformOrigin: "50% 50%" });
      gsap.set(q("[data-dif]"), { autoAlpha: 0, y: 30 });

      const tl = gsap.timeline({ defaults: { ease: "none" } });
      gsap.set(q("[data-crane]"), { autoAlpha: 0 });
      gsap.set(q("[data-a-label]"), { autoAlpha: 0 });
      gsap.set(q("[data-chassis-in]"), { xPercent: 170 });
      gsap.set(q("[data-film]"), { autoAlpha: 0 });
      if (film) gsap.set(q("[data-big]"), { autoAlpha: 0 });

      // 2a — Montagem
      if (has("svg [data-tank]")) tl.to(q("svg [data-tank]"), { y: 0, duration: 1.6, ease: "power2.inOut" }, 0);
      if (has("[data-real-tank]")) tl.to(q("[data-real-tank]"), { yPercent: 0, duration: 1.6, ease: "power2.inOut" }, 0).to(sway.current, { amp: 0, duration: 1.4, ease: "power2.in" }, 0);
      if (has("[data-cables]")) tl.to(q("[data-cables]"), { y: -320, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, 1.7);
      // com fotos reais: o caminhão montado (sem as lingas) substitui a montagem
      if (photoSide) {
        tl.to(q("[data-photo-paint='0']"), { autoAlpha: 1, duration: 0.5 }, 1.75)
          .to(q("[data-assembly]"), { autoAlpha: 0, duration: 0.5 }, 1.75);
      }
      tl
        // 2b — Horizonte
        .to(q("[data-crane]"), { y: -120, autoAlpha: 0, duration: 0.6 }, 2.0)
        .to(q("[data-cable], [data-crane]"), { autoAlpha: 0, duration: 0.3 }, 1.7)
        .to(q("[data-a-label]"), { autoAlpha: 0, duration: 0.3 }, 2.0)
        .to(q("[data-ink]"), { yPercent: 0, duration: 0.8, ease: "power2.out" }, 2.1)
        .to(q("[data-side]"), { scale: film ? 1 : desktop ? 0.74 : 0.92, duration: 0.8, ease: "power2.out" }, 2.1)
        .to(q("[data-big]"), { x: () => -q("[data-big]")[0].offsetWidth, duration: desktop ? 4.6 : 2.6 }, 2.3)
        // 2c — Linhas de produto (headline)
        .to(q("[data-hl] > *"), { yPercent: 0, duration: 0.6, stagger: 0.12, ease: "expo.out" }, 3.0)
        .to(q("[data-para]"), { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, 3.3);

      let t = 4.2;
      if (desktop) {
        tl.to(q("[data-hl-wrap]"), { autoAlpha: 0, y: -30, duration: 0.4 }, 4.0);
        const cols = q("[data-col]");
        const colX = (i: number) => () => {
          const w = cols[0].offsetWidth;
          const vw = window.innerWidth;
          return vw * 0.5 - w * (i + 0.5);
        };
        cols.forEach((_c, i) => {
          const at = 4.2 + i * 0.7;
          tl.to(q("[data-track]"), { x: colX(i), duration: 0.6, ease: "power2.inOut" }, at)
            .to(cols, { autoAlpha: (j: number) => (j === i ? 1 : 0.35), duration: 0.3 }, at + 0.2);
          if (has("[data-paint]")) tl.to(q("[data-paint]"), { opacity: (j: number) => (j === i ? 1 : 0), duration: 0.35 }, at + 0.15);
          if (photoSide) tl.to(q("[data-photo-paint]"), { autoAlpha: (_j: number, el: HTMLElement) => (Number(el.dataset.photoPaint) === pick(i) ? 1 : 0), duration: 0.35 }, at + 0.15);
        });
        t = 4.2 + cols.length * 0.7 + 0.2;
      } else {
        // mobile: a pintura do tanque varia rapidamente; as colunas viram cards abaixo da cena
        [1, 2, 3, 4, 0].forEach((p, k) => {
          if (has("[data-paint]")) tl.to(q("[data-paint]"), { opacity: (j: number) => (j === p ? 1 : 0), duration: 0.2 }, 3.6 + k * 0.25);
          if (photoSide) tl.to(q("[data-photo-paint]"), { autoAlpha: (_j: number, el: HTMLElement) => (Number(el.dataset.photoPaint) === pick(p) ? 1 : 0), duration: 0.2 }, 3.6 + k * 0.25);
        });
        t = 5.0;
      }

      // VÍDEO "nossos tanques": entra quando o horizonte sobe; o scroll controla o tempo
      if (film) {
        const vt = { t: 0 };
        const cvEl = q("[data-film]")[0] as HTMLCanvasElement;
        if (!truckRoad.current) truckRoad.current = createTruckRoad(cvEl, fabrica.nossos.toUpperCase());
        const seek = () => truckRoad.current?.set(vt.t);
        tl.to(q("[data-film]"), { autoAlpha: 1, duration: 0.45 }, 2.05)
          .to(q("[data-assembly]"), { autoAlpha: 0, duration: 0.45 }, 2.05);
        // pontos-chave: tanque exibido em sincronia com a coluna ativa (água, combustível, —, saneamento, agrícola)
        const keys: [number, number][] = desktop
          ? [[2.1, 0], [4.5, 1.6], [5.2, 4.4], [5.9, 5.8], [6.6, 7.3], [7.3, 10.1], [t + 0.8, 13.5]]
          : [[2.1, 0], [t + 0.8, 13.5]];
        for (let k = 1; k < keys.length; k++) {
          tl.to(vt, { t: keys[k][1], duration: keys[k][0] - keys[k - 1][0], ease: "none", onUpdate: seek }, keys[k - 1][0]);
        }
      }

      // caminhão andando: asfalto corre para a esquerda e as rodas giram
      const drive = t + 0.8 - 2.1;
      tl.fromTo(q("[data-asfalto]"), { xPercent: 0 }, { xPercent: -50, duration: drive }, 2.1)
      if (has("[data-wheel]")) tl.fromTo(q("[data-wheel]"), { rotation: 0 }, { rotation: 360 * (desktop ? 9 : 5), duration: drive, transformOrigin: "50% 50%" }, 2.1);

      // virada de câmera: a estrada em perspectiva avança e vira vista de cima
      if (q("[data-persp]").length) {
        tl.to(q("[data-persp]"), { autoAlpha: 1, duration: 0.25, ease: "power1.in" }, t + 0.1)
          .fromTo(q("[data-persp] img"), { scale: 1 }, { scale: 2.6, duration: 1.1, ease: "power2.in" }, t)
          .to(q("[data-persp]"), { autoAlpha: 0, duration: 0.35 }, t + 1.0);
        t += 0.8;
      }

      // 2d — estrada vista de cima
      tl.to(q("[data-side-layer]"), { autoAlpha: 0, duration: 0.5 }, t)
        .to(q("[data-curva]"), { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power2.out" }, t)
        .to(q("[data-top]"), { autoAlpha: 1, duration: 0.5 }, t)
      if (q("[data-road]").length) tl.to(q("[data-road]"), { drawSVG: "100%", duration: 0.9, ease: "power2.out" }, t + 0.1);
      tl
        .fromTo(q("[data-sweep]"), { backgroundPosition: "100% 0" }, { backgroundPosition: "0% 0", duration: 2.2 }, t + 0.4)
        .to(q("[data-truck-top]"), {
          motionPath: { path: q("[data-route]")[0] as unknown as SVGPathElement, align: q("[data-route]")[0] as unknown as SVGPathElement, alignOrigin: [0.5, 0.5], autoRotate: true },
          duration: 2.6,
          ease: "power1.inOut",
        }, t + 0.3);
      const difs = q("[data-dif]");
      difs.forEach((d, i) => {
        tl.to(d, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, t + 0.5 + i * 0.6);
        if (!desktop && i < difs.length - 1) tl.to(d, { autoAlpha: 0, y: -20, duration: 0.25 }, t + 1.0 + i * 0.6);
      });
      t += 3.2;

      // 2e — cortinas cobalto sobem, painel "Por que a Alfa" se monta, cortinas claras entregam para a próxima seção
      const lines = split.lines;
      tl.set(q("[data-why]"), { autoAlpha: 1 }, t)
        .to(q("[data-top-text]"), { autoAlpha: 0, y: -30, duration: 0.45, ease: "power2.in" }, t)
        .to(q("[data-shutter]"), { scaleY: 1, duration: 0.7, stagger: { each: 0.06, from: "start" }, ease: "power3.inOut" }, t)
        .to(q("[data-why-bg]"), { autoAlpha: 1, duration: 0.15 }, t + 0.95)
        .set(q("[data-why-content]"), { autoAlpha: 1 }, t + 0.98)
        .to(q("[data-why-in]"), { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, t + 1.0)
        .to(lines, { yPercent: 0, duration: 0.7, stagger: 0.1, ease: "expo.out" }, t + 1.05)
        .to(q("[data-why-bar]"), { scaleX: 1, duration: 3.0 }, t + 1.0);
      q("[data-ben-line]").forEach((el, i) => {
        tl.to(el, { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, t + 1.35 + i * 0.3)
          .to(q("[data-ben]")[i], { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, t + 1.5 + i * 0.3);
      });
      t += 4.0;

      // HERO → MONTAGEM: o céu some, o caminhão-chassi entra e o MESMO tanque do hero passa ao tamanho da cena
      const side = q("[data-side]")[0] as HTMLElement;
      const heroPose = () => {
        const vw = window.innerWidth, vh = window.innerHeight;
        const W = side.offsetWidth, Hh = side.offsetHeight, left = side.offsetLeft, top = side.offsetTop;
        const s = ((desktop ? 0.7 : 1.12) * vw) / W;
        const hx = G.x * W, hy = (G.y + LIFT / 100) * Hh; // gancho (antes da escala)
        const X = left + W / 2 + (hx - W / 2) * s, Y = top + Hh + (hy - Hh) * s;
        return { s, x: (desktop ? 0.55 : 0.5) * vw - X, y: (desktop ? 0.26 : 0.27) * vh - Y };
      };
      const main = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: stage, start: "top top", end: desktop ? "+=920%" : "+=520%", pin: true, scrub: 0.5, anticipatePin: 1, invalidateOnRefresh: true },
      });
      const HP = 1.5;
      main.fromTo(side, { scale: () => heroPose().s, x: () => heroPose().x, y: () => heroPose().y }, { scale: 1, x: 0, y: 0, duration: 1.2, ease: "power2.inOut" }, 0.15)
        .to(q("[data-h-ui]"), { autoAlpha: 0, y: 40, duration: 0.45, stagger: 0.04 }, 0)
        .to(q("[data-h-word]"), { yPercent: -60, autoAlpha: 0, duration: 0.8 }, 0.05)
        .to(q("[data-h-sky]"), { autoAlpha: 0, duration: 0.8 }, 0.35)
        .to(q("[data-chassis-in]"), { xPercent: 0, duration: 1.0, ease: "power3.out" }, 0.45)
        .to(q("[data-a-label]"), { autoAlpha: 1, duration: 0.3 }, HP - 0.3)
        .add(tl, HP);

      return () => split.revert();
    });
  }, { scope: root });

  return (
    <section ref={root} id="fabrica" aria-label="A fábrica — como fabricamos seus tanques" className="relative bg-paper">
      {real.montagem && <HeroStatic tanque={real.lateral[0]?.src ?? real.montagem.tanque.src} />}
      {/* ====== Versão animada ====== */}
      <div data-stage className="relative h-[100svh] overflow-hidden motion-reduce:hidden">
        {/* Camada lateral (2a–2c) */}
        <div data-side-layer className="absolute inset-0">
          <HeroBackdrop />
          <p data-a-label className="label label-slash absolute left-4 top-24 text-ink/70 md:left-8 md:top-32">{fabrica.label}</p>

          <p
            data-big
            aria-hidden="true"
            className="display absolute bottom-[45%] left-0 z-0 mb-[-0.06em] whitespace-nowrap text-[26vw] leading-[.8] text-[#e3e3df] md:text-[22vw]"
          >
            {fabrica.nossos}
          </p>

          <div data-side className="absolute inset-x-0 bottom-[calc(45%-6svh)] z-30 mx-auto w-[min(92vw,880px,calc(55svh*1.6))] origin-bottom [container-type:inline-size]">
            {film && (
              // vídeo 1920×720: caminhão de 1000 px centralizado, rodas em y=470 → alinhado à base desta caixa
              <canvas data-film aria-hidden="true" className="invisible absolute left-1/2 top-[-3.6cqw] -ml-[50vw] h-[59.2cqw] w-[100vw] max-w-none" />
            )}
            <div data-assembly className="relative">
              {real.montagem ? (
                <>
                  <img data-chassis-in fetchPriority="low" src={real.montagem.chassi.src} alt="" width={real.montagem.chassi.w} height={real.montagem.chassi.h} className="block h-auto w-full" />
                  <div data-real-tank className="absolute inset-0">
                    <div data-drop className="absolute inset-0">
                      <div data-sway className="absolute inset-0" style={{ transformOrigin: `${G.x * 100}% ${G.y * 100}%` }}>
                        {real.montagem.gancho && (
                          <span data-cable aria-hidden="true" className="absolute w-[3px] -translate-x-1/2 bg-gradient-to-b from-[#1b1c20]/0 via-[#1b1c20]/90 to-[#1b1c20]" style={{ left: `${real.montagem.gancho.x * 100}%`, bottom: `${(1 - real.montagem.gancho.y) * 100 - 0.5}%`, height: "260%" }} />
                        )}
                        <img src={real.montagem.tanque.src} alt="Tanque de água Alfa suspenso pela ponte rolante" width={real.montagem.tanque.w} height={real.montagem.tanque.h} fetchPriority="high" className="relative h-full w-full object-contain [filter:saturate(1.15)_contrast(1.04)]" />
                      </div>
                    </div>
                  </div>
                  {real.montagem.viga && real.montagem.carro ? (
                    <>
                      <div data-crane data-defer-bg={real.montagem.viga} aria-hidden="true" className="pointer-events-none absolute left-1/2 z-10 h-[calc(clamp(40px,7svh,76px)*0.444)] w-[300vw] -translate-x-1/2" style={{ bottom: `calc(${craneBottom}% + clamp(40px,7svh,76px) * 0.289)`, backgroundRepeat: "repeat-x", backgroundSize: "auto 100%", backgroundPosition: "center" }} />
                      <img data-crane data-defer-src={real.montagem.carro.src} alt="" width={real.montagem.carro.w} height={real.montagem.carro.h} className="pointer-events-none absolute z-[11] h-[clamp(40px,7svh,76px)] w-auto max-w-none -translate-x-1/2" style={{ left: `${(real.montagem.gancho?.x ?? 0.5) * 100}%`, bottom: `${craneBottom}%` }} />
                    </>
                  ) : real.montagem.ponte ? (
                    <img data-crane src={real.montagem.ponte.src} alt="" width={real.montagem.ponte.w} height={real.montagem.ponte.h} className="pointer-events-none absolute bottom-[calc(100%+min(18svh,160px))] left-1/2 w-[220vw] max-w-none -translate-x-1/2" />
                  ) : null}
                </>
              ) : (
                <TruckSide />
              )}
            </div>
            {real.lateral.map((im, i) =>
              im ? (
                <div key={i} data-photo-paint={i} className="invisible absolute bottom-0 left-0 w-full">
                  <div className="truck-idle relative">
                    <img data-defer-src={im.src} alt="" width={im.w} height={im.h} className="block h-auto w-full" />
                    {im.rodas.map((r) => (
                      <img key={r.src} data-wheel data-defer-src={r.src} alt="" className="absolute h-auto" style={{ left: `${r.x * 100}%`, top: `${r.y * 100}%`, width: `${r.d * 100}%` }} />
                    ))}
                  </div>
                </div>
              ) : null,
            )}
          </div>

          <div data-ink className="absolute inset-x-0 bottom-0 z-20 h-[45%] bg-ink text-white">
            {/* pista lateral: asfalto real (ou desenhado) que corre sob o caminhão */}
            <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-[10svh] overflow-hidden border-b border-white/10 bg-[#1a1b1e] ${film ? "hidden" : ""}`}>
              {real.estradaReta ? (
                <div data-asfalto data-defer-bg={real.estradaReta.src} className="absolute inset-y-0 left-0 w-[400%]" style={{ backgroundRepeat: "repeat-x", backgroundSize: "auto 100%" }} />
              ) : (
                <div data-asfalto className="absolute left-0 top-1/2 h-[6px] w-[400%] -translate-y-1/2" style={{ background: "repeating-linear-gradient(90deg, var(--alfa-accent) 0 70px, transparent 70px 120px)" }} />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
            </div>
            <div data-hl-wrap className={`mx-auto grid h-full max-w-[1400px] content-center gap-6 px-4 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-12 md:px-8 ${film ? "pt-[17svh]" : "pt-[10svh]"}`}>
              <h2 data-hl className="display text-[clamp(34px,5.2vw,84px)]">
                <span className="block overflow-clip"><span className="block">{fabrica.titulo1}</span></span>
                <span className="block overflow-clip text-white/45"><span className="block">{fabrica.titulo2}</span></span>
              </h2>
              <p data-para className="max-w-md text-[15px] text-white/75 md:text-base">{fabrica.paragrafo}</p>
            </div>

            {/* colunas em scroll horizontal (desktop) */}
            <div className={`absolute inset-x-0 bottom-0 hidden items-center md:flex ${film ? "top-[17svh]" : "top-[10svh]"}`} aria-hidden="false">
              <ul data-track className="flex">
                {tanques.map((t, i) => {
                  const Icon = prodIcons[i];
                  return (
                    <li key={t.slug} data-col className="w-[30vw] max-w-[420px] shrink-0 border-l border-white/15 px-8">
                      <Icon className="h-9 w-9 text-accent" aria-hidden />
                      <h3 className="ui mt-4 text-lg">{t.curto}</h3>
                      <p className="mt-2 text-[15px] leading-snug text-white/70">{t.resumo}</p>
                      <Link href={`/tanques/${t.slug}/`} className="ui mt-4 inline-flex items-center gap-1 text-[12px] text-accent hover:underline">
                        Ver tanque <ChevronRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <HeroUI />

        {/* Virada de câmera: estrada em perspectiva */}
        {real.estradaPerspectiva && (
          <div data-persp aria-hidden="true" className="absolute inset-0 z-[35] overflow-hidden bg-white">
            <img data-defer-src={real.estradaPerspectiva.src} alt="" width={real.estradaPerspectiva.w} height={real.estradaPerspectiva.h} className="h-full w-full object-cover" style={{ transformOrigin: `${real.estradaPerspectiva.vx * 100}% ${real.estradaPerspectiva.vy * 100}%` }} />
          </div>
        )}

        {/* Camada de topo (2d) */}
        <div data-top className="absolute inset-0 z-30 bg-white">
          {curva && rota ? (
            <svg viewBox={`0 0 1000 ${curvaH}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <filter id="sombra-topo" x="-20%" y="-40%" width="140%" height="180%"><feDropShadow dx="6" dy="8" stdDeviation="7" floodOpacity=".35" /></filter>
              </defs>
              <g data-zoom>
                <image data-curva data-defer-href={curva.src} x={0} y={0} width={1000} height={curvaH} preserveAspectRatio="none" />
                <path data-route d={caminho(rota)} fill="none" stroke="none" />
                <g data-truck-top>
                  {real.topo ? (
                    <image data-defer-href={real.topo.src} x={(-topoW * real.topo.w) / real.topo.h / 2} y={-topoW / 2} width={(topoW * real.topo.w) / real.topo.h} height={topoW} filter="url(#sombra-topo)" />
                  ) : (
                    <g transform={`scale(${topoW / 60})`}><TruckTop /></g>
                  )}
                </g>
              </g>
            </svg>
          ) : (
            <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs><SteelTopDefs /></defs>
              <g data-zoom>
                <path data-road d={ROAD} fill="none" stroke="#0B0B0C" strokeWidth="150" />
                <path d={ROAD} fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="34 30" opacity=".75" />
                <path data-route d={ROUTE} fill="none" stroke="none" />
                <g data-truck-top>
                  {real.topo ? <image href={real.topo.src} x={-150} y={(-150 * real.topo.h) / real.topo.w} width={300} height={(300 * real.topo.h) / real.topo.w} /> : <TruckTop />}
                </g>
              </g>
            </svg>
          )}

          <div data-top-text className="absolute inset-0">
            <h2 className="display absolute inset-x-0 top-0 z-10 bg-white px-4 pb-4 pt-24 text-[clamp(40px,11vw,84px)] md:inset-x-auto md:left-8 md:top-1/2 md:max-w-[40vw] md:-translate-y-1/2 md:bg-transparent md:p-0 md:text-[clamp(40px,5vw,84px)] leading-[1]">
              <span className="block text-[#b5b8be]">{fabrica.estradaTitulo1}</span>
              <span
                data-sweep
                className="clip-pad block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #0B0B0C 0%, #0B0B0C 40%, var(--alfa-primary) 50%, #0B0B0C 60%, #0B0B0C 100%)", backgroundSize: "300% 100%" }}
              >
                {fabrica.estradaTitulo2}
              </span>
            </h2>
            <ul className="absolute inset-x-4 bottom-8 md:inset-x-auto md:bottom-auto md:right-8 md:top-1/2 md:w-[32vw] md:max-w-[440px] md:-translate-y-1/2 md:space-y-7">
              {fabrica.diferenciais.map((d, i) => {
                const Icon = difIcons[i];
                return (
                  <li key={d.titulo} data-dif className="absolute inset-x-0 bottom-0 flex gap-4 rounded-2xl bg-white/95 p-4 shadow-[0_10px_40px_-20px_rgba(0,0,0,.4)] md:static md:bg-transparent md:p-0 md:shadow-none">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-white"><Icon className="h-6 w-6" aria-hidden /></span>
                    <div>
                      <h3 className="ui text-[13px]">{d.titulo}</h3>
                      <p className="mt-1 text-[15px] leading-snug text-ink/70">{d.texto}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* 2e — "Por que a Alfa": cortinas cobalto fecham a estrada e abrem um painel editorial */}
        <div data-why className="pointer-events-none absolute inset-0 z-40 overflow-hidden text-white">
          <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6" aria-hidden="true">
            {Array.from({ length: 6 }, (_, i) => <span key={i} data-shutter className={`block h-full bg-[#061CE0] ${i > 3 ? "hidden md:block" : ""}`} />)}
          </div>
          <div data-why-bg aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(110% 90% at 88% 8%, #2a4bff 0%, #061CE0 32%, #04108f 72%, #020a52 100%)" }}>
            <div className="absolute inset-0 opacity-[.10] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px)] [background-size:25%_100%] md:[background-size:calc(100%/6)_100%]" />
          </div>
          <div data-why-content className="relative mx-auto grid h-full max-w-[1400px] content-center gap-8 px-5 pt-16 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-16 md:px-8 md:pt-20">
            <div>
              <p data-why-in className="label label-slash text-accent">{fabrica.porque}</p>
              <p data-final className="display mt-4 max-w-[13ch] text-[clamp(40px,6.4vw,112px)] leading-[1.08]">{fabrica.fechamento}</p>
            </div>
            <ol className="md:pl-6">
              {fabrica.beneficios.map((b, i) => {
                const Icon = benIcons[i];
                return (
                  <li key={b.titulo} className="relative py-4 md:py-6">
                    <span data-ben-line aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left bg-white/30" />
                    <div data-ben className="grid grid-cols-[auto_1fr] items-start gap-x-4 md:gap-x-6">
                      <span className="ui pt-1 text-[12px] text-accent md:pt-2">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="display flex items-center gap-3 text-[clamp(22px,2.3vw,36px)] leading-none">
                          {b.titulo}
                          <Icon className="h-5 w-5 shrink-0 text-accent md:h-6 md:w-6" aria-hidden />
                        </h3>
                        <p className="mt-1.5 text-[14px] leading-snug text-white/75 md:text-[16px]">{b.texto}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
          <span data-why-bar aria-hidden="true" className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-accent" />
        </div>
      </div>

      {/* ====== Versão estática (reduced motion) e cards mobile ====== */}
      <div className="hidden bg-ink py-16 text-white motion-reduce:block">
        <div className="mx-auto max-w-[1400px] space-y-12 px-4 md:px-8">
          <p className="label label-slash text-accent">{fabrica.label}</p>
          <h2 className="display text-[clamp(40px,6vw,90px)]">{fabrica.titulo1} <span className="text-white/45">{fabrica.titulo2}</span></h2>
          <p className="max-w-2xl text-white/75">{fabrica.paragrafo}</p>
          <h2 className="display text-[clamp(36px,5vw,72px)]">{fabrica.estradaTitulo1} {fabrica.estradaTitulo2}</h2>
          <ul className="grid gap-6 md:grid-cols-4">{fabrica.diferenciais.map((d) => <li key={d.titulo}><h3 className="ui text-sm text-accent">{d.titulo}</h3><p className="mt-2 text-white/75">{d.texto}</p></li>)}</ul>
          <ul className="grid gap-6 md:grid-cols-4">{fabrica.beneficios.map((d) => <li key={d.titulo}><h3 className="ui text-sm text-accent">{d.titulo}</h3><p className="mt-2 text-white/75">{d.texto}</p></li>)}</ul>
          <p className="display text-[clamp(40px,6vw,90px)]">{fabrica.fechamento}</p>
        </div>
      </div>
      <ul className="grid gap-px bg-ink/10 md:hidden motion-reduce:md:grid motion-reduce:md:grid-cols-5" aria-label="Linhas de produto">
        {tanques.map((t, i) => {
          const Icon = prodIcons[i];
          return (
            <li key={t.slug} className="reveal-card bg-ink px-5 py-8 text-white">
              <Icon className="h-8 w-8 text-accent" aria-hidden />
              <h3 className="ui mt-3 text-base">{t.nome}</h3>
              <p className="mt-2 text-white/70">{t.resumo}</p>
              <Link href={`/tanques/${t.slug}/`} className="ui mt-4 inline-flex min-h-11 items-center gap-1 text-[12px] text-accent">
                Ver tanque <ChevronRight className="h-4 w-4" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
