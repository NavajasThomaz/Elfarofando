# Elfarofando — Notas de implementacao

## Estrutura de componentes
- `components/header.tsx` — header fixo com blur, menu mobile full-screen
- `components/footer.tsx` — links sociais, copyright
- `components/post-card.tsx` — card de conteudo (receita/avaliacao/noticia)
- `components/share-button.tsx` — "use client", navigator.share + fallback clipboard
- `components/hero-text.tsx` — "use client", linhas do hero que aparecem conforme progress
- `components/three/` — toda a logica 3D, cada cena dividida em scene/layers/geometry

## Scroll progress (como funciona)
O wrapper do hero tem 300vh (burger) ou 200vh (pasta). O canvas fica `sticky top-0 h-[100dvh]`.
Um hook `useScrollProgress(ref)` calcula `progress = (scrollY - wrapperTop) / (wrapperHeight - viewportHeight)`,
clamped entre 0 e 1, armazenado em `useRef` (nunca useState). Cada frame do R3F le o ref.current.
`frameloop="demand"` + `invalidate()` chamado dentro do onScroll garante que so renderiza quando ha mudanca.

## Janelas de cada camada do hamburguer
| Camada         | start | end  |
|----------------|-------|------|
| Pao de baixo   | 0.00  | 0.15 |
| Carne          | 0.15  | 0.30 |
| Queijo         | 0.30  | 0.45 |
| Tomate         | 0.45  | 0.58 |
| Alface         | 0.58  | 0.72 |
| Pao de cima    | 0.72  | 0.90 |
| Titulo final   | 0.90  | 1.00 |

## Checklist visual (nao cair em defaults genericos)
- Fundo Papel (#FFFDF9), NAO creme. Fundo hero/dark sections: Acai (#2A1633).
- Cards SEM sombra cinza; usar borda sutil ou fundo Papel sobre Acai.
- Labels em sentence case, NUNCA caixa alta.
- Links sem setas "->".
- Cor Farofa (#E8A33D) como unica cor viva recorrente. Pimenta max 1x por viewport.
