import sharp from 'sharp';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const poster = path.join(root, 'assets/images/sevgiline-kavus-afis-ust.png');
const qr = path.join(root, 'assets/images/oyun-qr.png');
const out = path.join(root, 'assets/images/sevgiline-kavus-afis-qr.png');

if (!existsSync(poster) || !existsSync(qr)) {
  console.error('Gorsel veya QR bulunamadi');
  process.exit(1);
}

const W = 1080;
const H = 1440;
const ART_H = 880;
const PANEL_H = H - ART_H;

const art = await sharp(poster)
  .resize(W, ART_H, { fit: 'cover', position: 'top' })
  .png()
  .toBuffer();

const fade = Buffer.from(
  `<svg width="${W}" height="140" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a0f2e" stop-opacity="0"/>
        <stop offset="100%" stop-color="#1a0f2e" stop-opacity="1"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="140" fill="url(#g)"/>
  </svg>`,
);

const panel = Buffer.from(
  `<svg width="${W}" height="${PANEL_H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a0f2e"/>
        <stop offset="100%" stop-color="#2d1b4e"/>
      </linearGradient>
      <linearGradient id="title" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#ff6b9d"/>
        <stop offset="55%" stop-color="#c084fc"/>
        <stop offset="100%" stop-color="#818cf8"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${PANEL_H}" fill="url(#bg)"/>
    <rect x="60" y="8" width="${W - 120}" height="2" rx="1" fill="#c084fc" opacity="0.5"/>

    <text x="${W / 2}" y="58" text-anchor="middle" font-family="Arial, sans-serif" font-size="21" fill="#e9d5ff" letter-spacing="2">SANA ÖZEL BİR HEDİYE</text>

    <text x="${W / 2}" y="118" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="48" font-weight="900" fill="url(#title)">SEVGİLİNE KAVUŞ</text>

    <text x="${W / 2}" y="156" text-anchor="middle" font-family="Georgia, serif" font-size="24" font-style="italic" fill="#c4b5fd">Senin için yaptığım küçük bir oyun</text>

    <text x="548" y="248" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#ffffff">Telefonunla tara</text>
    <text x="548" y="282" font-family="Arial, sans-serif" font-size="20" fill="#ddd6fe">Oyun açılır · Ana ekrana ekle · Oyna</text>
    <text x="548" y="318" font-family="Arial, sans-serif" font-size="18" fill="#a78bfa">Bizim anılarımızdan bir macera seni bekliyor</text>

    <text x="${W / 2}" y="${PANEL_H - 28}" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#7c6faa">Kıbrıs  ·  Gaziantep  ·  İzmir  ·  İstanbul</text>
  </svg>`,
);

const QR_SIZE = 190;
const QR_PAD = 12;
const QR_BOX = QR_SIZE + QR_PAD * 2;
const qrX = 108;
const qrY = ART_H + 168;

const qrFrame = Buffer.from(
  `<svg width="${QR_BOX}" height="${QR_BOX}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${QR_BOX}" height="${QR_BOX}" rx="20" fill="#ffffff"/>
    <rect x="3" y="3" width="${QR_BOX - 6}" height="${QR_BOX - 6}" rx="17" fill="none" stroke="#ff6b9d" stroke-width="3"/>
    <rect x="7" y="7" width="${QR_BOX - 14}" height="${QR_BOX - 14}" rx="14" fill="none" stroke="#c084fc" stroke-width="2"/>
  </svg>`,
);

const qrImg = await sharp(qr).resize(QR_SIZE, QR_SIZE).png().toBuffer();

await sharp({
  create: { width: W, height: H, channels: 3, background: { r: 26, g: 15, b: 46 } },
})
  .composite([
    { input: art, top: 0, left: 0 },
    { input: fade, top: ART_H - 120, left: 0 },
    { input: panel, top: ART_H, left: 0 },
    { input: qrFrame, top: qrY, left: qrX },
    { input: qrImg, top: qrY + QR_PAD, left: qrX + QR_PAD },
  ])
  .png()
  .toFile(out);

console.log('Kaydedildi:', out);
