# Elfarofando — Brief de design e implementação

Domínio: `www.elfarofando.com`
Slug: `elfarofando`

## O que é

Portal brasileiro de comida: notícias gastronômicas, avaliações de restaurantes e lanchonetes, e receitas. O nome brinca com "farofa" e com "farofar" (comer, se lambuzar, aproveitar). Tom: direto, bem-humorado, apetitoso, sem frescura. Nunca pomposo.

## Público e job principal

Quase todo o tráfego chega pelo celular vindo de TikTok e Instagram (link na bio, link em story). O visitante chega com um polegar, pouca paciência e muita fome. O site precisa:

1. Impressionar nos primeiros 2 segundos no celular (a animação do hambúrguer é a isca).
2. Levar em 1 toque para o conteúdo que o post nas redes prometeu (receita, avaliação, notícia).
3. Ser compartilhável: botões nativos de compartilhar, OG image por página.

**Mobile é o alvo primário. Desktop é adaptação.** Projetar no viewport 390×844 primeiro.

## Tokens

### Cor

| Nome | Hex | Uso |
|---|---|---|
| Açaí | `#2A1633` | Fundo do hero e das seções escuras, texto sobre claro |
| Farofa | `#E8A33D` | Cor de marca: logo, CTAs, destaques, cursor de progresso |
| Pimenta | `#E63946` | Acento raro: badge "novo", nota de avaliação, hover de CTA |
| Coentro | `#3C7A4E` | Tag de receitas / vegetariano |
| Papel | `#FFFDF9` | Fundo das páginas de leitura (quase branco, levemente quente, NÃO creme) |
| Tinta | `#1B1420` | Texto principal sobre Papel |

Regra: Farofa é a única cor viva que aparece em toda página. Pimenta aparece no máximo uma vez por viewport. Não usar gradientes decorativos; gradiente só como luz do hero 3D.

### Tipografia

Uma única família: **Bricolage Grotesque** (Google Fonts, variável, eixos wght + opsz + wdth), carregada via `next/font/google`.

| Papel | Peso | Tamanho mobile / desktop | Notas |
|---|---|---|---|
| Display (hero, título de matéria) | 800 | 44px / 88px | line-height 0.95, letter-spacing −0.02em, largura 100 |
| H2 seção | 700 | 32px / 56px | line-height 1.0 |
| H3 card | 600 | 20px / 24px | |
| Corpo | 400 | 17px / 19px | line-height 1.55, máx. 68ch |
| Meta (autor, data) | 500 | 14px | sentence case, sem caixa alta |

Proibido: caixa alta em labels, uma palavra colorida isolada no título, eyebrow em cima de todo heading, setas "→" em links.

### Layout

Coluna única no mobile com sangria total (full-bleed) para imagens e canvas. Conteúdo alinhado à esquerda, ritmo vertical de 8px, container máximo 1200px no desktop com grid de 12 colunas.

```
MOBILE (390px)                    DESKTOP (1440px)
┌──────────────────────┐          ┌──────────────────────────────────────────┐
│ ☰  elfarofando   🔍  │          │ elfarofando   Receitas Avaliações Notícias│
├──────────────────────┤          ├──────────────────────────────────────────┤
│                      │          │                      │                   │
│   [canvas 3D fixo]   │ sticky   │  Pão.                │   [canvas 3D      │
│                      │ 300vh    │  Carne.              │    fixo, ocupa    │
│  Pão.                │          │  Queijo.             │    metade dir.]   │
│  (linhas aparecem    │          │  ...                 │                   │
│   conforme camadas)  │          │  Elfarofando.        │                   │
├──────────────────────┤          ├──────────────────────┴───────────────────┤
│ ▌Saiu do forno       │          │ Saiu do forno                            │
│ ┌──────────────────┐ │          │ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│ │ [foto full-bleed]│ │          │ │          │ │          │ │          │   │
│ │ Título grande    │ │          │ └──────────┘ └──────────┘ └──────────┘   │
│ │ receita · 25 min │ │          ├──────────────────────────────────────────┤
│ └──────────────────┘ │          │ [canvas 3D prato de macarrão, sticky]    │
│ ┌──────────────────┐ │          │  "Do rolo ao prato"                      │
│ │ ...              │ │          ├──────────────────────────────────────────┤
├──────────────────────┤          │ Avaliações (lista com nota em Pimenta)   │
│ [canvas 3D macarrão] │          ├──────────────────────────────────────────┤
│  Do rolo ao prato    │          │ Notícias                                 │
├──────────────────────┤          ├──────────────────────────────────────────┤
│ Avaliações           │          │ Footer: TikTok Instagram YouTube         │
├──────────────────────┤          └──────────────────────────────────────────┘
│ Notícias             │
├──────────────────────┤
│ Footer               │
└──────────────────────┘
```

## Princípios

1. **Uma cena por vez.** A ousadia inteira vai nos dois canvases 3D. Todo o resto (cards, listas, tipografia) é quieto e disciplinado. Nenhum card tem hover animado, nenhuma seção tem fade-in genérico.
2. **A rolagem é o controle.** Toda animação 3D é dirigida pelo scroll (progress 0→1), nunca por tempo. Se a pessoa para de rolar, a cena para. Isso é o que torna a rolagem "profissional".
3. **Peso baixo no celular.** Canvas com `dpr` limitado a `[1, 1.5]`, geometria procedural (sem GLB pesado), `frameloop="demand"` com `invalidate()` no scroll, carregamento do canvas via `next/dynamic` com `ssr: false` e um poster estático como fallback. Respeitar `prefers-reduced-motion`: sem scroll-driven, mostrar a cena montada e estática.
4. **Conteúdo real desde o início.** Copy em português brasileiro, com títulos que pareçam de um portal de comida de verdade, não lorem ipsum.

## Cena 1 — Hambúrguer que se monta com a rolagem (hero)

Implementar com `three` + `@react-three/fiber` + `@react-three/drei`, geometria 100% procedural (sem arquivos de modelo):

| Camada (de baixo para cima) | Geometria | Material |
|---|---|---|
| Pão de baixo | `LatheGeometry` com perfil arredondado (disco com borda curva) | `meshStandardMaterial` cor `#D9913F`, roughness 0.75 |
| Carne | `CylinderGeometry` levemente irregular (deslocar vértices com ruído leve) | cor `#5A2E1B`, roughness 0.9 |
| Queijo | `PlaneGeometry` quadrada subdividida, com vértices das bordas "caindo" (deformação no eixo Y pelas pontas) | cor `#F2B233`, roughness 0.4 |
| Tomate ×2 | `CylinderGeometry` finos | cor `#C8302B`, roughness 0.5 |
| Alface | anel de `PlaneGeometry` ondulada (seno nas bordas) | cor `#5FA05A`, roughness 0.8, `side: DoubleSide` |
| Pão de cima | `LatheGeometry` domo + 20–30 gergelins (`SphereGeometry` achatada) espalhados no topo | cor `#D9913F` / gergelim `#F4E3B5` |

Comportamento: o hero ocupa 300vh de rolagem com o canvas `position: sticky; top: 0; height: 100dvh`. Progress `p` do scroll (via `useScroll` do framer-motion / motion, ou cálculo manual com `IntersectionObserver`/`scrollY`). Cada camada tem uma janela `[start, end]` em `p`: entra de cima (y +4 unidades) com leve rotação, e assenta na posição final com easing `easeOutCubic`. A ordem é de baixo para cima. A cena inteira gira lentamente em Y proporcional a `p` (0 → 0.6 rad). Luz: `Environment preset="city"` do drei (ou `studio`) + uma `directionalLight` quente. Sombra de contato no piso: `ContactShadows` do drei.

Texto do hero: a cada camada que assenta, uma linha do headline aparece à esquerda (mobile: acima do canvas, alinhada à esquerda): "Pão." "Carne." "Queijo." "Tomate." "Alface." e por fim "Elfarofando." em Farofa. Subtítulo curto ao final: "Notícias, avaliações e receitas pra quem come de verdade." CTA: "Ver o que saiu do forno" (rola para a seção seguinte).

## Cena 2 — Prato de macarrão (seção "Do rolo ao prato")

Segundo canvas, mesma stack, sticky por 200vh. Prato fundo (`LatheGeometry` branco, roughness 0.2) e 60–90 fios de espaguete gerados com `TubeGeometry` sobre `CatmullRomCurve3` com pontos aleatórios dentro de um disco, cor `#EBC56B`, roughness 0.35. Molho: disco levemente irregular vermelho `#B8321F` sob os fios. Manjericão: 3–5 `PlaneGeometry` com forma de folha (shader simples ou alpha map desenhado em canvas 2D) verde `#3C7A4E`. Realismo vem de: iluminação `Environment`, `MeshStandardMaterial` com `roughness`/`metalness` corretos, `ContactShadows`, e câmera com `fov` baixo (30) para look fotográfico.

Comportamento com a rolagem: em `p` 0→0.5 os fios "caem" no prato um a um (posição Y de +3 para 0, com stagger); em 0.5→1 um garfo (cilindro + 4 dentes em `BoxGeometry`, material metálico `metalness 0.9 roughness 0.2`) desce e a câmera orbita 40° para a direita. Se ficar pesado no celular, reduzir para 40 fios e `tubularSegments` 24.

**Fallback obrigatório:** se `prefers-reduced-motion` estiver ativo ou WebGL não estiver disponível, renderizar a imagem estática `public/posters/burger.jpg` e `public/posters/pasta.jpg` (gerar esses posters como SVG estilizado se não houver imagens reais; não deixar buraco em branco).

## Páginas e conteúdo

| Rota | Conteúdo |
|---|---|
| `/` | Hero 3D, "Saiu do forno" (6 últimos itens misturados), Cena 2, Avaliações (4), Notícias (4), footer |
| `/receitas` | Lista de receitas com filtro por tag (rápidas, vegetarianas, doces, boteco) |
| `/avaliacoes` | Lista de avaliações com nota de 0 a 10 em Pimenta |
| `/noticias` | Lista de notícias |
| `/[categoria]/[slug]` | Página do artigo: imagem full-bleed, título display, meta (autor, data, tempo de leitura), corpo em `max-w-[68ch]`, para receitas: ingredientes + passos numerados (aqui o número é legítimo, é uma sequência), botão "Compartilhar" usando `navigator.share` com fallback de copiar link |

Conteúdo em `content/posts.ts` (array tipado, 12–16 itens: 6 receitas, 5 avaliações, 4 notícias) com campos: `slug, categoria, titulo, resumo, autor, data, tempoLeitura, imagem, tags, corpo (markdown simples ou array de parágrafos), ingredientes?, passos?, nota?`. Imagens: usar `https://images.unsplash.com/...` com parâmetros `?w=1200&q=70&auto=format` e escolher fotos coerentes com o título (hambúrguer, coxinha, feijoada, pão de queijo, brigadeiro, macarrão, pizza, açaí, etc.). Como `images.unoptimized` é true, usar `<img loading="lazy">` ou `next/image` com `unoptimized`.

Copy exemplo (usar como tom, escrever mais):
- Receita: "Coxinha de frango com massa de mandioquinha: crocante fora, sem estresse dentro"
- Avaliação: "Fomos no hambúrguer mais hypado de Pinheiros. Nota 6,5 e a gente explica."
- Notícia: "Pão de queijo entra em lista de melhores pães do mundo e Minas comemora"

## Navegação

Header fixo, fundo Açaí translúcido com `backdrop-blur`, logo "elfarofando" em Bricolage 800 minúsculas com o "o" final em Farofa. No mobile: menu hambúrguer (sim, a piada é intencional; o ícone pode ser um hambúrguer estilizado de três linhas com o meio mais grosso) abrindo uma sheet de tela cheia. Footer: links TikTok, Instagram, YouTube (ícones lucide ou SVG simples), "Fale com a gente" (mailto), "Sobre", © ano.

## SEO e compartilhamento

`metadata` no layout com título "Elfarofando", descrição, `openGraph` e `twitter` card. Cada artigo gera `generateMetadata` com título, descrição e imagem. `app/robots.ts` e `app/sitemap.ts` simples. `<html lang="pt-BR">`.

## Qualidade mínima (não negociável)

- Lighthouse mobile: sem layout shift no hero (reservar altura do canvas), fontes com `display: swap`.
- Foco visível em todo elemento interativo (anel Farofa 2px).
- `prefers-reduced-motion` respeitado nos dois canvases e em qualquer transição.
- Contraste AA em todo texto (Tinta sobre Papel, Papel sobre Açaí, Açaí sobre Farofa para botões).
- Nenhum texto dentro de imagem.

## Dependências

```
next@16 react@19 react-dom@19 typescript @types/react @types/react-dom @types/node
tailwindcss@4 @tailwindcss/postcss postcss
three @types/three @react-three/fiber@9 @react-three/drei@10
motion (framer-motion v12+; importar de "motion/react")
lucide-react clsx tailwind-merge
```

Usar versões estáveis mais recentes compatíveis com React 19 e Next 16.
