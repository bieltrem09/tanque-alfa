# Filme: caminhão-tanque Alfa andando em pista reta e trocando de tanque (fotos reais compostas).
import sys, json, math, numpy as np
from PIL import Image, ImageDraw, ImageFilter
S = sys.argv[1]; MODE = sys.argv[2]  # "test" ou "full"
W, H, FPS = 1920, 720, 30
meta = json.load(open("/home/user/tanque-alfa/content/cena-real.json"))
SLUGS = ["agua", "combustivel", "saneamento", "agricola"]

# ---------- cenário fixo: mundo branco + pista vista de lado ----------
bg = Image.new("RGB", (W, H), (244, 244, 242))
WHEEL_Y = 470
Y0, Y1 = WHEEL_Y - 112, WHEEL_Y + 122      # faixa da pista
from PIL import ImageFont
FONT = ImageFont.truetype(f"{S}/vid/Anton-Regular.ttf", 360)
TXT = "NOSSOS TANQUES"
bb = FONT.getbbox(TXT)
txt = Image.new("RGBA", (bb[2] + 40, bb[3] + 10), (0, 0, 0, 0))
ImageDraw.Draw(txt).text((0, 0), TXT, font=FONT, fill=(227, 227, 223, 255))
txt = txt.crop((0, bb[1], txt.width, bb[3]))
tile = Image.open(f"{S}/final/estrada-reta.png").convert("RGB")
band_h = Y1 - Y0
tw = int(tile.width * band_h / tile.height * 2.0)
tile = tile.resize((tw, band_h), Image.LANCZOS)
reps = W // tw + 3
strip = Image.new("RGB", (tw * reps, band_h))
for k in range(reps): strip.paste(tile, (k * tw, 0))
a = np.array(strip).astype(float)
for yy in range(band_h):                # escorço: borda distante mais clara, próxima mais escura
    tt = yy / band_h
    a[yy] *= (0.82 + 0.22 * tt) if tt < 0.5 else (1.04 - 0.14 * (tt - 0.5))
# desfoque de movimento horizontal (caixa de 28 px, só no eixo x)
k = 28; c = np.cumsum(np.pad(a, ((0, 0), (k, 0), (0, 0)), mode="wrap"), axis=1)
a = (c[:, k:] - c[:, :-k]) / k
strip = Image.fromarray(a.clip(0, 255).astype(np.uint8))

# ---------- caminhões ----------
TW = 1000
trucks, wheels = {}, {}
for s in SLUGS:
    im = Image.open(f"{S}/final/c-lateral-{s}.png").convert("RGBA")
    th = int(im.height * TW / im.width)
    trucks[s] = im.resize((TW, th), Image.LANCZOS)
    ws = []
    for kk, r in enumerate(meta["laterais"][s]["rodas"]):
        d = int(round(r["d"] * TW))
        disc = Image.open(f"{S}/final/rodas/{s}-{kk}.png").convert("RGBA").resize((d, d), Image.LANCZOS)
        ws.append((disc, r["x"] * TW, r["y"] * th, d))
    wheels[s] = ws
TH = trucks["agua"].height
TX, TY = (W - TW) // 2, WHEEL_Y - TH

SPEED = 520                              # px/s do asfalto
R_PX = wheels["agua"][0][3] / 2 / 0.97   # raio do pneu em px
def truck_frame(s, t):
    img = trucks[s].copy()
    ang = math.degrees(SPEED * t / R_PX)
    step = math.degrees(SPEED / FPS / R_PX)          # giro dentro de 1 quadro (obturador ~180°)
    for disc, x, y, d in wheels[s]:
        acc = None
        n = 7
        for j in range(n):                            # desfoque de rotação: média de n posições
            r = np.asarray(disc.rotate(-(ang - step * 0.5 * j / (n - 1)), resample=Image.BICUBIC), dtype=np.float32)
            acc = r if acc is None else acc + r
        rot = Image.fromarray((acc / n).clip(0, 255).astype(np.uint8), "RGBA")
        img.alpha_composite(rot, (int(round(x)), int(round(y))))
    return img

# sombra de contato
shadow = Image.new("L", (W, H), 0)
ImageDraw.Draw(shadow).ellipse((TX + 46, WHEEL_Y - 14, TX + TW - 34, WHEEL_Y + 16), fill=170)
shadow = shadow.filter(ImageFilter.GaussianBlur(11))
dark = Image.new("RGBA", (W, H), (0, 0, 0, 255)); dark.putalpha(shadow)

# ---------- roteiro (segundos) ----------
# (inicio_troca, de, para) — troca dura SWEEP s, barra de luz de trás para a frente
SWEEP = 1.1
PLAN = [(2.6, "agua", "combustivel"), (5.4, "combustivel", "saneamento"), (8.2, "saneamento", "agricola"), (11.0, "agricola", "agua")]
DUR = 13.6
x_rear, x_front = TX + 0.06 * TW, TX + 0.86 * TW   # varredura cobre o tanque (até a cabine)

def state(t):
    cur = "agua"
    for t0, a_, b_ in PLAN:
        if t < t0: return cur, None, None
        if t < t0 + SWEEP: return a_, b_, (t - t0) / SWEEP
        cur = b_
    return cur, None, None

def ease(p): return 0.5 - 0.5 * math.cos(math.pi * p)

def frame(i):
    t = i / FPS
    out = bg.copy()
    tx = int(W - (W + txt.width) * (t / DUR))           # letreiro atravessa da direita p/ a esquerda
    out.paste(txt, (tx, Y0 - txt.height + 6), txt)
    off = int((SPEED * t) % tw)
    out.paste(strip.crop((off, 0, off + W, band_h)), (0, Y0))
    out.paste((11, 11, 12), (0, Y1, W, H))              # abaixo da pista: preto da seção do site
    out = out.convert("RGBA")
    out.alpha_composite(dark)
    bob = math.sin(t * 2 * math.pi * 1.7) * 1.4 + math.sin(t * 2 * math.pi * 4.3) * 0.5
    old, new, p = state(t)
    tr_old = truck_frame(old, t)
    if new is None:
        out.alpha_composite(tr_old, (TX, int(TY + bob)))
    else:
        tr_new = truck_frame(new, t)
        bx = x_rear + (x_front - x_rear) * ease(p)           # posição da barra na tela
        cut = int(bx - TX)
        comp = tr_old.copy()
        comp.paste(tr_new.crop((0, 0, cut, TH)), (0, 0))      # atrás da barra: tanque novo
        out.alpha_composite(comp, (TX, int(TY + bob)))
        # barra de luz vertical (scanner)
        g = np.zeros((H, W), float)
        xs = np.arange(W)
        prof = np.exp(-((xs - bx) / 5.0) ** 2) * 1.0 + np.exp(-((xs - bx) / 26.0) ** 2) * 0.45
        top, bot = TY + 20, WHEEL_Y - 26
        g[top:bot, :] = prof[None, :]
        fade = np.ones(H); fade[top:top + 40] = np.linspace(0, 1, 40); fade[bot - 40:bot] = np.linspace(1, 0, 40)
        g *= fade[:, None] * min(1, p * 6, (1 - p) * 6)
        col = np.zeros((H, W, 4), np.uint8); col[..., 0] = 255; col[..., 1] = 250; col[..., 2] = 232
        col[..., 3] = (g.clip(0, 1) * 255).astype(np.uint8)
        out.alpha_composite(Image.fromarray(col))
    return out.convert("RGB")

if MODE == "test":
    for t in [0.5, 3.0, 3.25, 6.0, 9.0, 12.4]:
        frame(int(t * FPS)).save(f"{S}/vid/w{t}.jpg", quality=90)
else:
    import subprocess
    n = int(DUR * FPS)
    p = subprocess.Popen(["ffmpeg", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
                          "-c:v", "libx264", "-preset", "slow", "-crf", "14", "-pix_fmt", "yuv420p", "-movflags", "+faststart", f"{S}/vid/web-master.mp4"], stdin=subprocess.PIPE)
    for i in range(n):
        p.stdin.write(frame(i).tobytes())
        if i % 60 == 0: print(i, "/", n, flush=True)
    p.stdin.close(); p.wait(); print("ok")
