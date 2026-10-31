#!/bin/bash

# Script de configuracao do Cloudflare Tunnel — Elfarofando
set -e

echo "Configuracao do Cloudflare Tunnel — Elfarofando"
echo "================================================"
echo ""

# Verificar se cloudflared esta instalado
if ! command -v cloudflared &> /dev/null; then
    echo "cloudflared nao encontrado."
    echo ""
    echo "Instale primeiro:"
    echo "  Linux (Ubuntu/Debian):"
    echo "    wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb"
    echo "    sudo dpkg -i cloudflared-linux-amd64.deb"
    echo ""
    echo "  Ou use via Docker (nao e necessario instalar localmente)"
    exit 1
fi

echo "cloudflared encontrado"
echo ""

# Solicitar informacoes
read -p "Nome do tunnel [elfarofando]: " TUNNEL_NAME
TUNNEL_NAME=${TUNNEL_NAME:-elfarofando}

read -p "Hostname do dominio [elfarofando.com]: " HOSTNAME
HOSTNAME=${HOSTNAME:-elfarofando.com}

echo ""
echo "Criando tunnel..."
cloudflared tunnel create "$TUNNEL_NAME"

# Obter o ID do tunnel
TUNNEL_ID=$(cloudflared tunnel list | grep "$TUNNEL_NAME" | awk '{print $1}')

if [ -z "$TUNNEL_ID" ]; then
    echo "Erro ao criar ou encontrar o tunnel"
    exit 1
fi

echo "Tunnel criado com ID: $TUNNEL_ID"
echo ""

# Criar diretorio .cloudflared se nao existir
mkdir -p .cloudflared

# Verificar se as credenciais existem
CREDENTIALS_FILE="$HOME/.cloudflared/$TUNNEL_ID.json"
if [ -f "$CREDENTIALS_FILE" ]; then
    echo "Copiando credenciais..."
    cp "$CREDENTIALS_FILE" ".cloudflared/$TUNNEL_ID.json"
    echo "Credenciais copiadas para .cloudflared/"
else
    echo "Arquivo de credenciais nao encontrado em $CREDENTIALS_FILE"
    echo "As credenciais podem estar em outro local."
fi

echo ""

# Copiar o exemplo se o config real nao existir
if [ ! -f "cloudflared-config.yml" ]; then
    cp cloudflared-config.example.yml cloudflared-config.yml
fi

echo "Atualizando cloudflared-config.yml..."
sed -i.bak "s/<TUNNEL_ID>/$TUNNEL_ID/g" cloudflared-config.yml
rm -f cloudflared-config.yml.bak 2>/dev/null || true
echo "Configuracao atualizada"

echo ""
echo "Configure o DNS no painel do Cloudflare:"
echo ""
echo "1. Acesse: https://dash.cloudflare.com"
echo "2. Selecione o dominio elfarofando.com"
echo "3. Va em DNS > Records"
echo "4. Adicione registros CNAME:"
echo "   - Type: CNAME | Name: @ | Target: $TUNNEL_ID.cfargotunnel.com | Proxied"
echo "   - Type: CNAME | Name: www | Target: $TUNNEL_ID.cfargotunnel.com | Proxied"
echo ""

# Criar .env se nao existir
if [ ! -f ".env" ]; then
    cat > .env << EOF
# Cloudflare Tunnel
CLOUDFLARE_CREDENTIALS_PATH=./.cloudflared
CLOUDFLARE_HOSTNAME=$HOSTNAME
EOF
    echo "Arquivo .env criado"
fi

echo ""
echo "Configuracao concluida."
echo ""
echo "Proximos passos:"
echo "1. Configure o DNS no Cloudflare (veja instrucoes acima)"
echo "2. Execute: docker compose up -d --build"
echo "3. Acompanhe: docker compose logs -f"
