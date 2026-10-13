import { useEffect, useState } from 'react';
import { SIZE, FONT_LIST } from './draw';
import { findTemplate } from './templates';
import { toBannerText } from './data';

export const LOGOS = [
  { id: 'pombaBranca', nome: 'Pomba Branca (APB)', src: './logos/pomba-branca.png' },
  { id: 'seichoNoIe', nome: 'Seicho-No-Ie', src: './logos/seicho-no-ie.png' },
  { id: 'emblema', nome: 'Emblema SNI', src: './logos/emblema-sni.png' },
];

// Tamanho padrão das artes originais; o desenho é feito em SIZE e ampliado.
export const EXPORT_PIXELS = 1654;

/** Desenha o banner no canvas; `pixels` é a largura final da imagem. */
export function renderBanner(canvas, data, logoImages, pixels = EXPORT_PIXELS, templateId = data.modelo) {
  canvas.width = pixels;
  canvas.height = pixels;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(pixels / SIZE, 0, 0, pixels / SIZE, 0, 0);
  ctx.clearRect(0, 0, SIZE, SIZE);
  const selected = LOGOS.filter((logo) => data.logos[logo.id] && logoImages[logo.id]).map((logo) => logoImages[logo.id]);
  findTemplate(templateId).draw(ctx, toBannerText(data), selected);
}

/** Espera fontes e logos carregarem; antes disso o canvas sairia com letra errada. */
export function useBannerAssets() {
  const [assets, setAssets] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fonts = Promise.all(
      FONT_LIST.flatMap((family) => [
        document.fonts.load(`400 40px "${family}"`),
        document.fonts.load(`700 40px "${family}"`),
        document.fonts.load(`italic 400 40px "${family}"`),
      ]),
    ).catch(() => null);
    const images = Promise.all(
      LOGOS.map(
        (logo) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve([logo.id, img]);
            img.onerror = () => resolve([logo.id, null]);
            img.src = logo.src;
          }),
      ),
    );
    Promise.all([fonts, images]).then(([, loaded]) => {
      if (!cancelled) setAssets(Object.fromEntries(loaded));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return assets;
}

export function bannerFileName(data) {
  const base = [data.tema, data.data].filter(Boolean).join(' ') || 'convite';
  const slug = base
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  return `${slug || 'convite'}.png`;
}
