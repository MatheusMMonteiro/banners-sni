import {
  SIZE, FONTS, text, whatsapp, line, pill, logos, flow, drawLogos, fillRect, roundRect,
  dots, halftone, flower, leaf, leafOutline, sparkle, seeded,
} from './draw';

const join = (separator, ...parts) => parts.filter(Boolean).join(separator);

// Cabeçalho "Associação ... convida:" + WhatsApp, comum a quase todos os modelos.
function header(t, color, size = 46, font = FONTS.hand) {
  return [
    text(t.convite, { font, size, color, lineHeight: 1.2 }),
    whatsapp(t.whatsapp, { font, size: size * 0.75, color, align: 'right', gap: 4 }),
  ];
}

function speaker(t, color, size = 40, font = FONTS.body, weight = 400) {
  return [
    text(t.cargo, { font, size, color, weight, gap: 10, lineHeight: 1.15 }),
    text(t.preletor, { font, size, color, weight, gap: 2, lineHeight: 1.15 }),
  ];
}

// ---------- 1. Verde com faixa dourada ----------
function verde(ctx, t, imgs) {
  const green = '#1e5b3f';
  fillRect(ctx, green, 0, 0, SIZE, SIZE);
  dots(ctx, { color: '#d9bd4f', count: 140, seed: 11, minR: 4, maxR: 13 });
  fillRect(ctx, '#ffffff', 45, 54, 990, 980);
  dots(ctx, { color: '#e3c95f', count: 40, seed: 5, minR: 3, maxR: 9, avoid: { x: 0, y: 0, w: SIZE, h: 1000 } });
  fillRect(ctx, '#d8c18d', 45, 650, 990, 160);
  fillRect(ctx, green, 538, 670, 4, 120);

  flow(ctx, { x: 90, y: 80, w: 900, h: 550 }, [
    ...header(t, green),
    text(t.tema, { font: FONTS.script, size: 84, color: green, gap: 26 }),
    text(t.livro, { font: FONTS.hand, size: 36, color: green }),
    ...speaker(t, green, 38, FONTS.script),
    text(t.endereco, { font: FONTS.body, size: 32, color: green }),
  ], { spread: 18 });
  flow(ctx, { x: 70, y: 665, w: 450, h: 130 }, [
    text(t.dataLonga, { font: FONTS.hand, size: 58, color: green }),
  ]);
  flow(ctx, { x: 560, y: 665, w: 450, h: 130 }, [
    text(t.horario, { font: FONTS.hand, size: 58, color: green }),
    text(t.tipo, { font: FONTS.hand, size: 28, color: green, gap: 0 }),
  ]);
  flow(ctx, { x: 90, y: 830, w: 900, h: 195 }, [
    logos(imgs, { size: 150 }),
    text(t.mensagem, { font: FONTS.hand, size: 30, color: green, gap: 12 }),
  ]);
}

// ---------- 2. Bege com onda verde-água ----------
function onda(ctx, t, imgs) {
  const teal = '#4db38f';
  fillRect(ctx, '#f7f2e4', 0, 0, SIZE, SIZE);
  halftone(ctx, { color: '#e2dbc6', cx: 0, cy: 260, radius: 560 });
  ctx.fillStyle = teal;
  ctx.beginPath();
  ctx.ellipse(1000, 640, 650, 820, 0, 0, Math.PI * 2);
  ctx.fill();

  flow(ctx, { x: 60, y: 45, w: 960, h: 640 }, [
    ...header(t, '#1c1c1c'),
    pill(t.tipoCurto, { font: FONTS.hand, size: 40, upper: true, background: '#2e8f6c', color: '#fff', rotate: -6, gap: 26 }),
    text(t.tema, { font: FONTS.script, size: 84, color: '#1c1c1c', gap: 10 }),
    text(t.livro, { font: FONTS.body, size: 36, color: '#1c1c1c' }),
    ...speaker(t, '#1c1c1c', 36, FONTS.body, 700),
  ], { spread: 14 });
  flow(ctx, { x: 560, y: 700, w: 490, h: 350 }, [
    text(t.dataLonga, { font: FONTS.hand, size: 56, color: '#fff' }),
    text(t.horario, { font: FONTS.hand, size: 56, color: '#fff', gap: 0 }),
    text(t.endereco, { font: FONTS.body, size: 30, color: '#fff' }),
    text(t.mensagem, { font: FONTS.body, size: 26, color: '#fff' }),
  ]);
  drawLogos(ctx, imgs, { x: 50, y: 830, w: 480, h: 200 });
}

// ---------- 3. Creme com seta verde-água ----------
function seta(ctx, t, imgs) {
  const teal = '#4eb58f';
  fillRect(ctx, '#f6f1df', 0, 0, SIZE, SIZE);
  halftone(ctx, { color: '#e4dcc3', cx: 0, cy: 0, radius: 760 });
  halftone(ctx, { color: '#e4dcc3', cx: 1080, cy: 1080, radius: 500 });
  ctx.fillStyle = '#fcfaf1';
  ctx.beginPath();
  ctx.arc(560, 620, 430, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = teal;
  ctx.beginPath();
  ctx.moveTo(470, 905);
  ctx.lineTo(560, 740);
  ctx.lineTo(SIZE, 740);
  ctx.lineTo(SIZE, 1070);
  ctx.lineTo(560, 1070);
  ctx.closePath();
  ctx.fill();

  flow(ctx, { x: 60, y: 45, w: 960, h: 670 }, [
    ...header(t, '#1c1c1c'),
    pill(t.tipoCurto, { font: FONTS.hand, size: 44, upper: true, background: teal, color: '#fff', gap: 26 }),
    text(t.tema, { font: FONTS.script, size: 84, color: '#1c1c1c', gap: 10 }),
    text(t.livro, { font: FONTS.body, size: 36, color: '#1c1c1c' }),
    ...speaker(t, '#1c1c1c', 36, FONTS.body, 700),
  ], { spread: 14 });
  flow(ctx, { x: 580, y: 755, w: 480, h: 300 }, [
    text(t.dataLonga, { font: FONTS.hand, size: 56, color: '#fff' }),
    text(t.horario, { font: FONTS.hand, size: 56, color: '#fff', gap: 0 }),
    text(t.endereco, { font: FONTS.body, size: 30, color: '#fff' }),
    text(t.mensagem, { font: FONTS.body, size: 26, color: '#fff' }),
  ], { gap: 10 });
  drawLogos(ctx, imgs, { x: 40, y: 790, w: 420, h: 200 });
}

// ---------- 4. Azul-marinho com aba branca ----------
function marinho(ctx, t, imgs) {
  fillRect(ctx, '#262a3f', 0, 0, SIZE, SIZE);
  fillRect(ctx, '#ffffff', 0, 440, 220, 450);
  drawLogos(ctx, imgs, { x: 20, y: 460, w: 180, h: 410 }, { direction: 'column', gap: 30 });

  flow(ctx, { x: 60, y: 35, w: 980, h: 230 }, header(t, '#fff'));
  flow(ctx, { x: 40, y: 285, w: 1000, h: 130 }, [
    text(t.dataLonga, { font: FONTS.hand, size: 44, color: '#fff' }),
    text(t.horario, { font: FONTS.hand, size: 44, color: '#fff', gap: 0 }),
  ], { align: 'left' });
  flow(ctx, { x: 250, y: 430, w: 800, h: 470 }, [
    text(t.tema, { font: FONTS.hand, size: 78, color: '#fff', spacing: 0.03 }),
    text(t.livro, { font: FONTS.body, size: 34, color: '#fff' }),
    ...speaker(t, '#fff', 38),
    text(t.tipo, { font: FONTS.sans, size: 28, color: '#e8b83a', upper: true, spacing: 0.15 }),
    text(t.endereco, { font: FONTS.body, size: 34, color: '#fff' }),
    line({ color: '#e8b83a', width: 140, thickness: 8 }),
  ], { spread: 12 });
  flow(ctx, { x: 60, y: 920, w: 960, h: 120 }, [
    text(t.mensagem, { font: FONTS.sans, size: 28, color: '#fff', upper: true, spacing: 0.15, weight: 500 }),
  ]);
}

// ---------- 5. Coluna amarela + azul-marinho ----------
function amarelo(ctx, t, imgs) {
  fillRect(ctx, '#e9b93c', 0, 0, 230, SIZE);
  fillRect(ctx, '#262a3f', 230, 0, 850, SIZE);

  flow(ctx, { x: 10, y: 250, w: 210, h: 270 }, [
    text(t.diaNumero, { font: FONTS.serif, size: 170, color: '#111', lineHeight: 1 }),
    text(t.diaSemanaCurto, { font: FONTS.body, size: 36, color: '#111', upper: true, italic: true, gap: 4 }),
  ]);
  drawLogos(ctx, imgs, { x: 20, y: 580, w: 190, h: 460 }, { direction: 'column', gap: 30 });

  flow(ctx, { x: 260, y: 30, w: 790, h: 230 }, header(t, '#fff', 42));
  flow(ctx, { x: 260, y: 285, w: 790, h: 620 }, [
    text(t.tema, { font: FONTS.hand, size: 78, color: '#fff' }),
    text(t.livro, { font: FONTS.body, size: 34, color: '#fff' }),
    ...speaker(t, '#fff', 40),
    text(t.dataLonga, { font: FONTS.hand, size: 52, color: '#fff', gap: 26 }),
    text(t.horario, { font: FONTS.hand, size: 52, color: '#fff', gap: 0 }),
    text(t.tipo, { font: FONTS.hand, size: 34, color: '#fff', upper: true }),
    text(t.endereco, { font: FONTS.body, size: 38, color: '#fff' }),
  ], { spread: 10 });
  flow(ctx, { x: 260, y: 915, w: 790, h: 140 }, [
    line({ color: '#e8b83a', width: 140, thickness: 8 }),
    text(t.mensagem, { font: FONTS.sans, size: 26, color: '#fff', upper: true, spacing: 0.15, weight: 500, gap: 26 }),
  ]);
}

// ---------- 6. Raios cinza e bege ----------
function raios(ctx, t, imgs) {
  const colors = ['#c4c4c4', '#ece6d3', '#9fb0bd', '#ece6d3'];
  const wedges = 32;
  for (let i = 0; i < wedges; i += 1) {
    const a1 = (i / wedges) * Math.PI * 2;
    const a2 = ((i + 1) / wedges) * Math.PI * 2;
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.moveTo(540, 540);
    ctx.lineTo(540 + Math.cos(a1) * 1000, 540 + Math.sin(a1) * 1000);
    ctx.lineTo(540 + Math.cos(a2) * 1000, 540 + Math.sin(a2) * 1000);
    ctx.closePath();
    ctx.fill();
  }
  fillRect(ctx, '#fbfaf2', 60, 60, 960, 960);

  const ink = '#1c1c1c';
  flow(ctx, { x: 100, y: 80, w: 880, h: 920 }, [
    ...header(t, ink),
    text(t.tema, { font: FONTS.script, size: 88, color: ink, gap: 30 }),
    text(t.livro, { font: FONTS.body, size: 32, color: ink }),
    ...speaker(t, ink, 40),
    text(t.dataLonga, { font: FONTS.hand, size: 56, color: ink, gap: 26 }),
    text(t.horario, { font: FONTS.hand, size: 56, color: ink, gap: 0 }),
    text(t.tipo, { font: FONTS.hand, size: 30, color: ink, gap: 0 }),
    text(t.endereco, { font: FONTS.body, size: 32, color: ink }),
    logos(imgs, { size: 130 }),
    text(t.mensagem, { font: FONTS.hand, size: 30, color: ink }),
  ], { spread: 14 });
}

// ---------- 7. Coluna de folhas + barra marrom ----------
function folhas(ctx, t, imgs) {
  fillRect(ctx, '#ebe3cb', 0, 0, 320, SIZE);
  const rand = seeded(23);
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, 320, SIZE);
  ctx.clip();
  for (let y = -40; y < SIZE + 60; y += 120) {
    for (let x = -20; x < 360; x += 120) {
      leafOutline(ctx, { x: x + rand() * 40, y: y + rand() * 40, length: 90, angle: rand() * Math.PI * 2, color: '#f8f3e3' });
    }
  }
  ctx.restore();
  fillRect(ctx, '#6b3e1f', 320, 0, 18, SIZE);
  fillRect(ctx, '#fbf7e8', 338, 0, 742, SIZE);

  flow(ctx, { x: 10, y: 250, w: 300, h: 280 }, [
    text(t.diaNumero, { font: FONTS.serif, size: 170, color: '#111', lineHeight: 1 }),
    text(t.diaSemanaCurto, { font: FONTS.body, size: 36, color: '#111', upper: true, italic: true, gap: 4 }),
  ]);
  drawLogos(ctx, imgs, { x: 50, y: 580, w: 220, h: 460 }, { direction: 'column', gap: 30 });

  const ink = '#1c1c1c';
  flow(ctx, { x: 370, y: 50, w: 680, h: 230 }, header(t, ink, 38));
  flow(ctx, { x: 370, y: 300, w: 680, h: 740 }, [
    text(t.tema, { font: FONTS.script, size: 84, color: ink }),
    text(t.livro, { font: FONTS.body, size: 32, color: ink }),
    ...speaker(t, ink, 40),
    text(join(' - ', t.dataLonga, t.horario), { font: FONTS.hand, size: 40, color: ink }),
    text(t.tipo, { font: FONTS.hand, size: 32, color: ink, gap: 4 }),
    text(t.endereco, { font: FONTS.body, size: 32, color: ink }),
    text(t.mensagem, { font: FONTS.hand, size: 30, color: ink }),
  ], { spread: 16 });
}

// ---------- 8. Xadrez azul ----------
function xadrez(ctx, t, imgs) {
  const blue = '#1f4e8c';
  fillRect(ctx, '#ffffff', 0, 0, SIZE, SIZE);
  ctx.fillStyle = 'rgba(74, 134, 200, 0.5)';
  for (let p = 0; p < SIZE; p += 72) {
    ctx.fillRect(p, 0, 36, SIZE);
    ctx.fillRect(0, p, SIZE, 36);
  }
  fillRect(ctx, '#fdfdfb', 72, 72, 936, 936);
  [[110, 110], [970, 110], [110, 970], [970, 970]].forEach(([x, y]) => sparkle(ctx, x, y, 18, blue));

  flow(ctx, { x: 140, y: 85, w: 800, h: 260 }, [
    text(t.convite, { font: FONTS.hand, size: 46, color: blue, lineHeight: 1.2 }),
    whatsapp(t.whatsapp, { font: FONTS.hand, size: 34, color: '#222', align: 'right', gap: 4 }),
  ]);
  flow(ctx, { x: 110, y: 355, w: 860, h: 150 }, [
    text(t.tema, { font: FONTS.hand, size: 78, color: blue }),
  ]);
  drawLogos(ctx, imgs, { x: 110, y: 520, w: 230, h: 400 }, { direction: 'column', gap: 30 });
  flow(ctx, { x: 360, y: 515, w: 620, h: 420 }, [
    text(t.livro, { font: FONTS.body, size: 30, color: blue }),
    ...speaker(t, blue, 40, FONTS.script),
    text(t.tipo, { font: FONTS.body, size: 38, color: blue, upper: true }),
    line({ color: blue, width: 420, thickness: 3, gap: 4 }),
    text(t.diaSemana, { font: FONTS.script, size: 44, color: blue }),
    text(t.dataLonga, { font: FONTS.script, size: 44, color: blue, gap: 0 }),
    text(t.horario, { font: FONTS.script, size: 44, color: blue, gap: 0 }),
    text(t.endereco, { font: FONTS.body, size: 28, color: blue }),
  ], { gap: 12, spread: 8 });
  flow(ctx, { x: 140, y: 945, w: 800, h: 50 }, [
    text(t.mensagem, { font: FONTS.sans, size: 26, color: blue, weight: 500 }),
  ]);
}

// ---------- 9. Flores cor-de-rosa ----------
function floresRosa(ctx, t, imgs) {
  fillRect(ctx, '#fbeef0', 0, 0, SIZE, SIZE);
  ctx.fillStyle = '#fff9f7';
  ctx.beginPath();
  ctx.arc(540, 560, 420, 0, Math.PI * 2);
  ctx.fill();

  const rand = seeded(9);
  const pinks = ['#f4a7b9', '#f7c5d0', '#ec8fa8', '#f9d6de'];
  const spots = [];
  for (let i = 0; i < 70; i += 1) {
    const side = rand();
    if (side < 0.45) spots.push([rand() * 150, rand() * 700]);
    else if (side < 0.85) spots.push([SIZE - rand() * 140, rand() * 760]);
    else spots.push([rand() * SIZE, rand() * 40]);
  }
  spots.forEach(([x, y]) => {
    flower(ctx, {
      x, y, r: 26 + rand() * 46, petals: 5, color: pinks[Math.floor(rand() * pinks.length)],
      center: '#f6e27a', rotate: rand() * Math.PI, petalWidth: 0.48,
    });
  });

  const rose = '#a2456a';
  const brown = '#6b3a1e';
  flow(ctx, { x: 150, y: 30, w: 780, h: 230 }, header(t, rose, 44));
  flow(ctx, { x: 180, y: 270, w: 720, h: 500 }, [
    text(t.tipo, { font: FONTS.body, size: 38, color: brown, upper: true }),
    text(t.tema, { font: FONTS.hand, size: 84, color: brown, spacing: 0.02 }),
    text(t.livro, { font: FONTS.body, size: 34, color: brown }),
    ...speaker(t, brown, 42, FONTS.body, 700),
    text(t.mensagem, { font: FONTS.sans, size: 26, color: rose, weight: 500 }),
  ], { spread: 12 });
  drawLogos(ctx, imgs, { x: 30, y: 680, w: 210, h: 380 }, { direction: 'column', gap: 30 });
  flow(ctx, { x: 300, y: 790, w: 740, h: 260 }, [
    text(t.diaSemana, { font: FONTS.hand, size: 46, color: brown }),
    text(t.dataLonga, { font: FONTS.hand, size: 46, color: brown, gap: 0 }),
    text(t.horario, { font: FONTS.hand, size: 46, color: brown, gap: 0 }),
    text(t.endereco, { font: FONTS.body, size: 28, color: brown }),
  ], { gap: 10 });
}

// ---------- 10. Folhagem verde e vermelha ----------
function folhagem(ctx, t, imgs) {
  fillRect(ctx, '#ffffff', 0, 0, SIZE, SIZE);
  const rand = seeded(31);
  const greens = ['#4d7a2c', '#6b9a3b', '#3f6a25'];
  const clusters = [[0, 0, 0.6], [SIZE, 0, 2.4], [0, SIZE, -0.6], [SIZE, SIZE, -2.4], [0, 560, 0], [SIZE, 520, Math.PI]];
  clusters.forEach(([cx, cy, towards]) => {
    for (let i = 0; i < 16; i += 1) {
      const angle = towards + (rand() - 0.5) * 2.4;
      const x = cx + (rand() - 0.5) * 60;
      const y = cy + (rand() - 0.5) * 60;
      if (rand() < 0.75) {
        leaf(ctx, { x, y, length: 70 + rand() * 90, width: 0.42, angle, color: greens[Math.floor(rand() * 3)] });
      } else {
        const dist = 60 + rand() * 70;
        const bx = x + Math.cos(angle) * dist;
        const by = y + Math.sin(angle) * dist;
        leaf(ctx, { x: bx, y: by, length: 40, width: 0.3, angle: angle - 0.3, color: '#d32f2f' });
        leaf(ctx, { x: bx, y: by, length: 40, width: 0.3, angle: angle + 0.3, color: '#d32f2f' });
      }
    }
  });

  const purple = '#5562c4';
  const ink = '#1c1c1c';
  drawLogos(ctx, imgs, { x: 150, y: 50, w: imgs.length > 1 ? 300 : 170, h: 150 }, { gap: 20 });
  const headerX = imgs.length > 1 ? 470 : imgs.length ? 340 : 170;
  flow(ctx, { x: headerX, y: 60, w: 900 - headerX, h: 150 }, [
    text(t.convite, { font: FONTS.sans, size: 34, color: ink, upper: true, weight: 500, lineHeight: 1.3 }),
  ], { align: imgs.length ? 'left' : 'center' });
  flow(ctx, { x: 170, y: 240, w: 740, h: 450 }, [
    text(t.tema, { font: FONTS.script, size: 120, color: purple }),
    text(t.livro, { font: FONTS.body, size: 32, color: ink }),
    ...speaker(t, ink, 44, FONTS.hand),
  ], { spread: 16 });
  flow(ctx, { x: 170, y: 710, w: 520, h: 250 }, [
    text(join(', ', t.dataLonga, t.diaSemana), { font: FONTS.hand, size: 46, color: purple, upper: true }),
    text(t.horario, { font: FONTS.hand, size: 46, color: purple, gap: 0 }),
    text(t.tipo, { font: FONTS.hand, size: 32, color: ink }),
    text(t.endereco, { font: FONTS.hand, size: 34, color: ink }),
    text(t.mensagem, { font: FONTS.body, size: 28, color: ink }),
  ], { align: 'left', gap: 12 });
  flow(ctx, { x: 600, y: 870, w: 330, h: 70 }, [
    whatsapp(t.whatsapp, { font: FONTS.hand, size: 38, color: ink }),
  ], { align: 'right' });
}

// ---------- 11. Faixas roxas com margaridas ----------
function roxo(ctx, t, imgs) {
  const purple = '#5b62b8';
  fillRect(ctx, '#ffffff', 0, 0, SIZE, SIZE);
  [[0, 0], [0, 940]].forEach(([, y]) => {
    fillRect(ctx, purple, 0, y, SIZE, 140);
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, y, SIZE, 140);
    ctx.clip();
    const rand = seeded(y + 3);
    for (let i = 0; i < 14; i += 1) {
      flower(ctx, {
        x: rand() * SIZE, y: y + rand() * 140, r: 30 + rand() * 40, petals: 8,
        color: '#c3bdf0', center: '#c3bdf0', rotate: rand(), petalWidth: 0.2,
      });
    }
    ctx.restore();
  });
  fillRect(ctx, purple, 0, 150, SIZE, 8);
  fillRect(ctx, purple, 0, 922, SIZE, 8);

  const left = imgs.filter((_, i) => i % 2 === 0);
  const right = imgs.filter((_, i) => i % 2 === 1);
  drawLogos(ctx, left, { x: 30, y: 180, w: 220, h: 260 }, { direction: 'column', gap: 16 });
  drawLogos(ctx, right, { x: 830, y: 180, w: 220, h: 260 }, { direction: 'column', gap: 16 });

  const ink = '#1c1c1c';
  const red = '#d32b2b';
  const sideW = right.length ? 260 : 270;
  flow(ctx, { x: 270, y: 180, w: SIZE - 270 - sideW, h: 260 }, header(t, ink, 40));
  flow(ctx, { x: 80, y: 460, w: 920, h: 450 }, [
    text(t.tema, { font: FONTS.script, size: 84, color: red }),
    text(t.livro, { font: FONTS.body, size: 34, color: ink }),
    text(join(' - ', t.dataLonga, t.horario), { font: FONTS.script, size: 52, color: red, gap: 24 }),
    text(join(' - ', t.tipo, t.endereco), { font: FONTS.body, size: 30, color: ink }),
    ...speaker(t, ink, 46, FONTS.hand),
    text(t.mensagem, { font: FONTS.body, size: 28, color: ink }),
  ], { spread: 12 });
}

// ---------- 12. Alecrim desenhado ----------
function alecrim(ctx, t, imgs) {
  fillRect(ctx, '#f4f1ec', 0, 0, SIZE, SIZE);
  const rand = seeded(47);
  ctx.strokeStyle = '#4a4a4a';
  ctx.lineCap = 'round';
  for (let s = 0; s < 5; s += 1) {
    const start = { x: 980 + rand() * 160, y: SIZE + 20 };
    const end = { x: 790 + rand() * 230, y: 140 + rand() * 300 };
    const ctrl = { x: (start.x + end.x) / 2 - 80 + rand() * 160, y: (start.y + end.y) / 2 };
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.quadraticCurveTo(ctrl.x, ctrl.y, end.x, end.y);
    ctx.stroke();
    for (let k = 0.15; k < 1; k += 0.03) {
      const x = (1 - k) ** 2 * start.x + 2 * (1 - k) * k * ctrl.x + k ** 2 * end.x;
      const y = (1 - k) ** 2 * start.y + 2 * (1 - k) * k * ctrl.y + k ** 2 * end.y;
      const dx = 2 * (1 - k) * (ctrl.x - start.x) + 2 * k * (end.x - ctrl.x);
      const dy = 2 * (1 - k) * (ctrl.y - start.y) + 2 * k * (end.y - ctrl.y);
      const dir = Math.atan2(dy, dx);
      [-1, 1].forEach((sideSign) => {
        const len = (34 + rand() * 22) * (1.1 - k * 0.5);
        const a = dir + sideSign * (0.35 + rand() * 0.2);
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(
          x + Math.cos(a - sideSign * 0.15) * len * 0.5, y + Math.sin(a - sideSign * 0.15) * len * 0.5,
          x + Math.cos(a) * len, y + Math.sin(a) * len,
        );
        ctx.stroke();
      });
    }
  }

  const ink = '#2b2b2b';
  drawLogos(ctx, imgs, { x: 30, y: 30, w: imgs.length > 1 ? 300 : 180, h: 150 }, { gap: 16 });
  const headerX = imgs.length > 1 ? 350 : imgs.length ? 230 : 60;
  flow(ctx, { x: headerX, y: 40, w: 800 - headerX, h: 160 }, [
    text(t.convite, { font: FONTS.hand, size: 34, color: ink, upper: true, lineHeight: 1.35 }),
  ]);
  flow(ctx, { x: 50, y: 230, w: 700, h: 400 }, [
    text(t.tema, { font: FONTS.script, size: 120, color: '#b5675a' }),
    text(t.livro, { font: FONTS.body, size: 32, color: ink }),
    ...speaker(t, ink, 42, FONTS.hand),
  ], { spread: 16 });
  // Fundo translúcido para o texto não brigar com o desenho do alecrim.
  ctx.fillStyle = 'rgba(244, 241, 236, 0.85)';
  roundRect(ctx, 30, 650, 640, 400, 24);
  ctx.fill();
  flow(ctx, { x: 60, y: 665, w: 590, h: 370 }, [
    text(join(', ', t.dataLonga, t.diaSemana), { font: FONTS.hand, size: 48, color: '#111', upper: true }),
    text(t.horario, { font: FONTS.hand, size: 48, color: '#111', gap: 0 }),
    text(t.tipo, { font: FONTS.body, size: 30, color: '#555' }),
    text(t.endereco, { font: FONTS.hand, size: 34, color: '#555' }),
    whatsapp(t.whatsapp, { font: FONTS.hand, size: 38, color: '#111' }),
    text(t.mensagem, { font: FONTS.body, size: 28, color: '#555' }),
  ], { align: 'left', gap: 12 });
}

export const TEMPLATES = [
  { id: 'verde', nome: 'Verde com faixa dourada', draw: verde },
  { id: 'onda', nome: 'Onda verde-água', draw: onda },
  { id: 'seta', nome: 'Creme com seta', draw: seta },
  { id: 'marinho', nome: 'Azul-marinho', draw: marinho },
  { id: 'amarelo', nome: 'Amarelo e azul', draw: amarelo },
  { id: 'raios', nome: 'Raios', draw: raios },
  { id: 'folhas', nome: 'Folhas e marrom', draw: folhas },
  { id: 'xadrez', nome: 'Xadrez azul', draw: xadrez },
  { id: 'flores-rosa', nome: 'Flores cor-de-rosa', draw: floresRosa },
  { id: 'folhagem', nome: 'Folhagem', draw: folhagem },
  { id: 'roxo', nome: 'Faixas roxas', draw: roxo },
  { id: 'alecrim', nome: 'Alecrim', draw: alecrim },
];

export function findTemplate(id) {
  return TEMPLATES.find((tpl) => tpl.id === id) || TEMPLATES[0];
}
