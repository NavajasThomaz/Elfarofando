# Elfarofando

Portal brasileiro de comida: noticias gastronomicas, avaliacoes de restaurantes e receitas. Disponivel em [www.elfarofando.com](https://www.elfarofando.com).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/postcss`)
- Three.js + React Three Fiber 9 + Drei 10 (cenas 3D procedurais)
- Motion 12 (animacoes)
- Lucide React (icones)

## Rodar local

```bash
# Instalar dependencias (gera o lockfile na primeira vez)
pnpm install

# Servidor de desenvolvimento
pnpm dev
```

O site roda em `http://localhost:3000`.

## Deploy

O deploy usa Docker + Cloudflare Tunnel. Nenhuma porta e exposta ao host; o cloudflared roteia o trafego.

```bash
# 1. Criar o tunnel e gerar cloudflared-config.yml
chmod +x setup-cloudflared.sh && ./setup-cloudflared.sh

# 2. Configurar DNS no painel Cloudflare
#    CNAME @ -> <TUNNEL_ID>.cfargotunnel.com (Proxied)
#    CNAME www -> <TUNNEL_ID>.cfargotunnel.com (Proxied)

# 3. Subir
docker compose up -d --build

# 4. Acompanhar logs
docker compose logs -f
```

## Estrutura de pastas

```
Elfarofando/
├── app/                    # App Router (layout, pages, globals.css)
│   ├── [categoria]/[slug]/ # Pagina de artigo dinamica
│   ├── receitas/           # Listagem de receitas com filtro
│   ├── avaliacoes/         # Listagem de avaliacoes
│   └── noticias/           # Listagem de noticias
├── components/             # Componentes React
│   ├── three/              # Cenas 3D (burger, pasta, hooks)
│   ├── header.tsx          # Header fixo com menu mobile
│   ├── footer.tsx          # Footer com redes sociais
│   ├── post-card.tsx       # Card de conteudo
│   └── share-button.tsx    # Botao de compartilhar
├── content/                # Conteudo estatico tipado (posts)
├── lib/                    # Utilitarios (cn)
├── public/posters/         # Posters SVG para fallback 3D
├── docs/                   # Brief e notas de design
├── Dockerfile
├── docker-compose.yml
├── cloudflared-config.example.yml
└── setup-cloudflared.sh
```

## Onde editar conteudo

O conteudo fica em `content/`:
- `content/receitas.ts` — receitas
- `content/avaliacoes.ts` — avaliacoes de restaurantes
- `content/noticias.ts` — noticias

Cada item segue a interface `Post` definida em `content/types.ts`. Adicione novos itens ao array correspondente e eles aparecem automaticamente nas listagens e na home.

## Nota

O primeiro `pnpm install` gera o `pnpm-lock.yaml`. Ele sera versionado a partir dai.
