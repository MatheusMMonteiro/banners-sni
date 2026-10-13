export const SIZE = 1080;
const MIN_FONT_PX = 27;

export const FONTS = {
  script: 'Courgette',
  hand: 'Sriracha',
  body: 'Kalam',
  serif: 'Abril Fatface',
  sans: 'Montserrat',
};

export const FONT_LIST = Object.values(FONTS);

const WHATSAPP_PATH =
  'M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z';

let whatsappPath2D;

// ---------- itens de layout ----------

export const text = (value, opts = {}) => ({ kind: 'text', value, ...opts });
export const whatsapp = (value, opts = {}) => ({ kind: 'whatsapp', value, ...opts });
export const line = (opts = {}) => ({ kind: 'line', value: true, width: 160, thickness: 8, ...opts });
export const pill = (value, opts = {}) => ({ kind: 'pill', value, ...opts });
export const logos = (images, opts = {}) => ({ kind: 'logos', value: images.length > 0, images, size: 150, ...opts });

function fontString(item, px) {
  return `${item.italic ? 'italic ' : ''}${item.weight || 400} ${px}px "${item.font || FONTS.body}"`;
}

function applyFont(ctx, item, px) {
  ctx.font = fontString(item, px);
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${(item.spacing || 0) * px}px`;
}

function displayText(item) {
  return item.upper ? item.value.toUpperCase() : item.value;
}

function wrapLines(ctx, value, maxWidth) {
  const lines = [];
  let widest = 0;
  value.split('\n').forEach((paragraph) => {
    let current = '';
    paragraph.split(/\s+/).filter(Boolean).forEach((word) => {
      const candidate = current ? `${current} ${word}` : word;
      if (current && ctx.measureText(candidate).width > maxWidth) {
        lines.push(current);
        current = word;
      } else {
        current = candidate;
      }
    });
    lines.push(current);
  });
  lines.forEach((l) => {
    widest = Math.max(widest, ctx.measureText(l).width);
  });
  return { lines, widest };
}

function measureItem(ctx, item, scale, width) {
  // Textos pequenos têm piso legível; quem encolhe primeiro são os grandes.
  const size = item.size || 40;
  const px = Math.max(size * scale, Math.min(size, MIN_FONT_PX));
  switch (item.kind) {
    case 'text': {
      applyFont(ctx, item, px);
      const { lines, widest } = wrapLines(ctx, displayText(item), width);
      return { px, lines, height: lines.length * px * (item.lineHeight || 1.25), fits: widest <= width + 1 };
    }
    case 'whatsapp': {
      applyFont(ctx, item, px);
      const textWidth = ctx.measureText(item.value).width;
      return { px, textWidth, height: px * 1.3, fits: textWidth + px * 1.4 <= width };
    }
    case 'pill': {
      applyFont(ctx, item, px);
      const textWidth = ctx.measureText(displayText(item)).width;
      return { px, textWidth, height: px * 1.7, fits: textWidth + px * 1.6 <= width };
    }
    case 'line':
      return { height: item.thickness, fits: true };
    case 'logos':
      return { height: item.size * scale, fits: true };
    default:
      return { height: 0, fits: true };
  }
}

/**
 * Empilha itens dentro de uma caixa. Itens vazios somem sem deixar buraco
 * e, se o texto não couber, tudo diminui na mesma proporção.
 */
export function flow(ctx, box, items, options = {}) {
  const { align = 'center', valign = 'center', gap = 18, spread = 0 } = options;
  const visible = items.filter((item) => item && item.value);
  if (!visible.length) return;

  let scale = 1;
  let measured;
  let total;
  for (;;) {
    measured = visible.map((item) => measureItem(ctx, item, scale, box.w));
    total = measured.reduce((sum, m, i) => sum + m.height + (i ? (visible[i].gap ?? gap) * scale : 0), 0);
    if ((total <= box.h && measured.every((m) => m.fits)) || scale < 0.3) break;
    scale *= 0.95;
  }

  // Espaço que sobrou: parte vira respiro entre itens (até `spread` px), o resto alinha.
  const gaps = visible.length - 1;
  const extraPerGap = gaps ? Math.min(spread, (box.h - total) / gaps) : 0;
  const leftover = box.h - total - extraPerGap * gaps;
  let y = box.y + (valign === 'top' ? 0 : valign === 'bottom' ? leftover : leftover / 2);

  visible.forEach((item, i) => {
    if (i) y += (item.gap ?? gap) * scale + extraPerGap;
    drawItem(ctx, item, measured[i], { x: box.x, y, w: box.w }, item.align || align);
    y += measured[i].height;
  });
}

function anchorX(box, align, width) {
  if (align === 'left') return box.x;
  if (align === 'right') return box.x + box.w - width;
  return box.x + (box.w - width) / 2;
}

function drawItem(ctx, item, m, box, align) {
  ctx.save();
  ctx.fillStyle = item.color || '#222';
  ctx.textBaseline = 'middle';
  switch (item.kind) {
    case 'text': {
      applyFont(ctx, item, m.px);
      const lh = m.px * (item.lineHeight || 1.25);
      m.lines.forEach((l, i) => {
        const w = ctx.measureText(l).width;
        ctx.fillText(l, anchorX(box, align, w), box.y + lh * (i + 0.5));
      });
      break;
    }
    case 'whatsapp': {
      applyFont(ctx, item, m.px);
      const icon = m.px * 1.05;
      const x = anchorX(box, align, icon + m.px * 0.35 + m.textWidth);
      const cy = box.y + m.height / 2;
      drawWhatsappIcon(ctx, x, cy - icon / 2, icon);
      ctx.fillStyle = item.color || '#222';
      ctx.fillText(item.value, x + icon + m.px * 0.35, cy);
      break;
    }
    case 'pill': {
      applyFont(ctx, item, m.px);
      const w = m.textWidth + m.px * 1.4;
      const x = anchorX(box, align, w);
      ctx.translate(x + w / 2, box.y + m.height / 2);
      ctx.rotate(((item.rotate || 0) * Math.PI) / 180);
      if (item.background) {
        ctx.fillStyle = item.background;
        roundRect(ctx, -w / 2, -m.height / 2, w, m.height, m.height / 2);
        ctx.fill();
      }
      ctx.fillStyle = item.color || '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(displayText(item), 0, 0);
      break;
    }
    case 'line': {
      ctx.fillStyle = item.color || '#e2b43c';
      ctx.fillRect(anchorX(box, align, item.width), box.y, item.width, item.thickness);
      break;
    }
    case 'logos': {
      drawLogos(ctx, item.images, { x: box.x, y: box.y, w: box.w, h: m.height }, { align });
      break;
    }
    default:
  }
  ctx.restore();
}

export function drawWhatsappIcon(ctx, x, y, size) {
  whatsappPath2D = whatsappPath2D || new Path2D(WHATSAPP_PATH);
  ctx.save();
  ctx.fillStyle = '#25d366';
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.translate(x + size * 0.12, y + size * 0.12);
  ctx.scale((size * 0.76) / 24, (size * 0.76) / 24);
  ctx.fillStyle = '#fff';
  ctx.fill(whatsappPath2D);
  ctx.restore();
}

/** Distribui os logos numa linha ou coluna, cada um do maior tamanho que couber. */
export function drawLogos(ctx, images, box, { direction = 'row', align = 'center', gap = 40 } = {}) {
  if (!images.length) return;
  const n = images.length;
  const cellW = direction === 'row' ? (box.w - gap * (n - 1)) / n : box.w;
  const cellH = direction === 'row' ? box.h : (box.h - gap * (n - 1)) / n;
  const sizes = images.map((img) => {
    const s = Math.min(cellW / img.width, cellH / img.height);
    return { w: img.width * s, h: img.height * s };
  });

  if (direction === 'row') {
    const total = sizes.reduce((sum, s) => sum + s.w, 0) + gap * (n - 1);
    let x = anchorX(box, align, total);
    images.forEach((img, i) => {
      ctx.drawImage(img, x, box.y + (box.h - sizes[i].h) / 2, sizes[i].w, sizes[i].h);
      x += sizes[i].w + gap;
    });
  } else {
    const total = sizes.reduce((sum, s) => sum + s.h, 0) + gap * (n - 1);
    let y = box.y + (box.h - total) / 2;
    images.forEach((img, i) => {
      ctx.drawImage(img, box.x + (box.w - sizes[i].w) / 2, y, sizes[i].w, sizes[i].h);
      y += sizes[i].h + gap;
    });
  }
}

// ---------- formas e enfeites ----------

export function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function fillRect(ctx, color, x, y, w, h) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

/** Gerador pseudoaleatório com semente: o enfeite sai igual toda vez. */
export function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function dots(ctx, { color, count, seed, minR, maxR, avoid }) {
  const rand = seeded(seed);
  ctx.fillStyle = color;
  for (let i = 0; i < count; i += 1) {
    const x = rand() * SIZE;
    const y = rand() * SIZE;
    const r = minR + rand() * (maxR - minR);
    if (avoid && x > avoid.x - r && x < avoid.x + avoid.w + r && y > avoid.y - r && y < avoid.y + avoid.h + r) continue;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Retícula de pontos que diminui a partir de um canto. */
export function halftone(ctx, { color, cx, cy, radius, step = 22, maxDot = 7 }) {
  ctx.fillStyle = color;
  for (let x = 0; x <= SIZE; x += step) {
    for (let y = 0; y <= SIZE; y += step) {
      const d = Math.hypot(x - cx, y - cy);
      if (d > radius) continue;
      const r = maxDot * (1 - d / radius);
      if (r < 0.6) continue;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export function flower(ctx, { x, y, r, petals = 5, color, center, rotate = 0, petalWidth = 0.42 }) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotate);
  ctx.fillStyle = color;
  for (let i = 0; i < petals; i += 1) {
    ctx.rotate((Math.PI * 2) / petals);
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.55, r * petalWidth, r * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  if (center) {
    ctx.fillStyle = center;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export function leaf(ctx, { x, y, length, width = 0.38, angle, color, vein }) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(length * 0.5, -length * width, length, 0);
  ctx.quadraticCurveTo(length * 0.5, length * width, 0, 0);
  ctx.fillStyle = color;
  ctx.fill();
  if (vein) {
    ctx.strokeStyle = vein;
    ctx.lineWidth = Math.max(1.5, length * 0.02);
    ctx.beginPath();
    ctx.moveTo(length * 0.05, 0);
    ctx.lineTo(length * 0.9, 0);
    ctx.stroke();
  }
  ctx.restore();
}

export function leafOutline(ctx, { x, y, length, angle, color, lineWidth = 3 }) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(length * 0.5, -length * 0.4, length, 0);
  ctx.quadraticCurveTo(length * 0.5, length * 0.4, 0, 0);
  ctx.moveTo(0, 0);
  ctx.lineTo(length * 0.85, 0);
  for (let i = 1; i <= 3; i += 1) {
    const vx = length * 0.2 * i;
    ctx.moveTo(vx, 0);
    ctx.lineTo(vx + length * 0.12, -length * 0.16);
    ctx.moveTo(vx, 0);
    ctx.lineTo(vx + length * 0.12, length * 0.16);
  }
  ctx.stroke();
  ctx.restore();
}

export function sparkle(ctx, x, y, r, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.quadraticCurveTo(x, y, x, y + r);
  ctx.quadraticCurveTo(x, y, x - r, y);
  ctx.quadraticCurveTo(x, y, x, y - r);
  ctx.fill();
  ctx.restore();
}
