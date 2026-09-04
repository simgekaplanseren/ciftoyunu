/** Emoji kullanmadan pembe piksel kalp (#ff6b9d) */

const HEART_ROWS = [
  '0110110',
  '1111111',
  '1111111',
  '0111110',
  '0011100',
  '0001000',
];

export function drawPixelHeart(ctx, cx, cy, size, color = '#ff6b9d') {
  const cols = HEART_ROWS[0].length;
  const rows = HEART_ROWS.length;
  const unit = size / Math.max(cols, rows);
  const ox = cx - (cols * unit) / 2;
  const oy = cy - (rows * unit) / 2;

  ctx.fillStyle = color;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (HEART_ROWS[r][c] === '1') {
        ctx.fillRect(
          Math.floor(ox + c * unit),
          Math.floor(oy + r * unit),
          Math.ceil(unit),
          Math.ceil(unit),
        );
      }
    }
  }
}

export function createHudHeart(filled = true) {
  const el = document.createElement('span');
  el.className = 'heart-icon' + (filled ? '' : ' lost');
  el.setAttribute('aria-hidden', 'true');
  return el;
}
