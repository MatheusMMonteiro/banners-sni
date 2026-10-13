# Criar convite — Seicho-No-Ie

Site para montar os convites/banners das reuniões a partir de modelos prontos.
A pessoa escolhe o modelo, escreve os textos, marca os logos e baixa a imagem (1654×1654 PNG).

Pensado para público idoso: letras grandes, passos numerados, data por calendário
(o dia da semana sai sozinho) e o texto se ajusta sozinho para caber no desenho.

## Como funciona

- Tudo que é digitado fica salvo no navegador (`localStorage`) — as informações do núcleo
  (quem convida, WhatsApp, endereço, mensagem) não precisam ser digitadas de novo.
- "Começar convite novo" apaga só tema, livro, preletor e data.
- No celular aparece "Enviar pelo WhatsApp", que abre o compartilhamento com a imagem anexada.
- Os modelos são desenhados em `<canvas>` (`src/banner/templates.js`), recriados a partir das
  artes originais. O motor de layout (`src/banner/draw.js`) esconde campos vazios e diminui
  as fontes até tudo caber.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera dist/ — site estático
```

`dist/` pode ser publicado em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel).

## Adicionar um modelo

Crie uma função `(ctx, t, imgs)` em `src/banner/templates.js` e registre em `TEMPLATES`.
`t` traz os textos já formatados (`toBannerText` em `src/banner/data.js`) e `imgs` os logos marcados.
# banners-sni
