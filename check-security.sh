#!/bin/bash

# Script de Verificação de Segurança
# Verifica se há arquivos .env ou credenciais no repositório

echo "🔐 Verificando segurança do repositório..."
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Função para reportar erro
error() {
    echo -e "${RED}❌ ERRO: $1${NC}"
    ERRORS=$((ERRORS + 1))
}

# Função para reportar warning
warning() {
    echo -e "${YELLOW}⚠️  AVISO: $1${NC}"
    WARNINGS=$((WARNINGS + 1))
}

# Função para reportar sucesso
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

echo "1️⃣  Verificando arquivos .env no Git..."
if git ls-files | grep -q "\.env$"; then
    error "Arquivo .env encontrado no Git! Remova imediatamente com: git rm --cached .env"
else
    success "Nenhum arquivo .env no Git"
fi

echo ""
echo "2️⃣  Verificando .env no histórico do Git..."
if git log --all --full-history --oneline -- .env 2>/dev/null | grep -q .; then
    error "Arquivo .env encontrado no histórico! Veja SECURITY.md para remover"
else
    success "Nenhum .env no histórico"
fi

echo ""
echo "3️⃣  Verificando .gitignore..."
if grep -q "^\.env$" .gitignore; then
    success ".env está no .gitignore"
else
    error ".env NÃO está no .gitignore! Adicione agora"
fi

echo ""
echo "4️⃣  Buscando possíveis API keys no código..."
# Busca por padrões comuns de API keys (excluindo node_modules e arquivos de exemplo)
if grep -r "AIza[0-9A-Za-z_-]\{35\}" . \
    --exclude-dir=node_modules \
    --exclude-dir=.git \
    --exclude="*.example" \
    --exclude="*.md" \
    --exclude="check-security.sh" 2>/dev/null | grep -q .; then
    error "Possível API key do Google encontrada no código!"
else
    success "Nenhuma API key do Google encontrada"
fi

echo ""
echo "5️⃣  Buscando connection strings do MongoDB..."
if grep -r "mongodb+srv://[^@]*:[^@]*@" . \
    --exclude-dir=node_modules \
    --exclude-dir=.git \
    --exclude="*.example" \
    --exclude="*.md" \
    --exclude="check-security.sh" 2>/dev/null | grep -q .; then
    error "Connection string do MongoDB com credenciais encontrada!"
else
    success "Nenhuma connection string com credenciais encontrada"
fi

echo ""
echo "6️⃣  Verificando arquivos .env locais..."
if [ -f ".env" ]; then
    warning "Arquivo .env existe localmente (OK se não estiver no Git)"
else
    warning "Arquivo .env não existe. Copie de .env.example se necessário"
fi

echo ""
echo "7️⃣  Verificando se .env.example existe..."
if [ -f ".env.example" ]; then
    success ".env.example existe"
else
    warning ".env.example não encontrado"
fi

echo ""
echo "8️⃣  Verificando se há credenciais em .env.example..."
if grep -q "AIza[0-9A-Za-z_-]\{35\}" .env.example 2>/dev/null; then
    error ".env.example contém API key real! Use placeholders"
fi

if grep -q "mongodb+srv://[^@]*:[^@]*@" .env.example 2>/dev/null; then
    error ".env.example contém connection string real! Use placeholders"
fi

if ! grep -q "your_api_key_here\|your-password\|localhost" .env.example 2>/dev/null; then
    warning ".env.example pode conter valores reais. Verifique manualmente"
else
    success ".env.example usa placeholders"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ $ERRORS -gt 0 ]; then
    echo -e "${RED}🚨 FALHOU: $ERRORS erro(s) encontrado(s)${NC}"
    echo -e "${RED}NÃO FAÇA COMMIT até corrigir os erros!${NC}"
    echo ""
    echo "Consulte SECURITY.md para instruções de correção"
    exit 1
elif [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠️  PASSOU COM AVISOS: $WARNINGS aviso(s)${NC}"
    echo "Revise os avisos antes de fazer commit"
    exit 0
else
    echo -e "${GREEN}🎉 TUDO OK! Repositório está seguro${NC}"
    exit 0
fi
