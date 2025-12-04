# 📦 Configuração de Deploy - Sumário

## ✅ O que foi configurado

Este repositório está pronto para deploy na Vercel com as seguintes configurações:

### 🗂️ Estrutura do Repositório

```
boleto-sem-medo/                    # Repositório único
├── client/                         # Frontend (React + Vite)
│   ├── src/
│   ├── package.json
│   ├── .env.example               # Exemplo de variáveis (client)
│   └── .gitignore                 # Proteção de .env
├── server/                         # Backend (NestJS)
│   ├── src/
│   ├── api/
│   │   └── index.ts              # Entry point para Vercel
│   ├── package.json
│   ├── .env.example              # Exemplo de variáveis (server)
│   ├── .gitignore                # Proteção de .env
│   └── vercel.json               # Config Vercel (backend)
├── .env.example                   # Exemplo global de variáveis
├── .gitignore                     # Proteção global de .env
├── .vercelignore                  # Arquivos ignorados no deploy
├── vercel.json                    # Configuração principal Vercel
├── package.json                   # Scripts do monorepo
├── check-security.sh              # Script de verificação de segurança
├── README.md                      # Documentação principal
├── DEPLOY.md                      # Guia detalhado de deploy
├── QUICKSTART.md                  # Guia rápido de deploy
├── SECURITY.md                    # Guia de segurança
└── ARCHITECTURE.md                # Arquitetura do sistema
```

### 🔒 Proteção de Variáveis de Ambiente

#### Arquivos Protegidos (nunca serão commitados):
- ✅ `.env` (raiz, client e server)
- ✅ `.env.local`
- ✅ `.env.development.local`
- ✅ `.env.test.local`
- ✅ `.env.production.local`
- ✅ `.env.production`

#### Arquivos de Exemplo (podem ser commitados):
- ✅ `.env.example` (raiz)
- ✅ `client/.env.example`
- ✅ `server/.env.example`

### 📝 Variáveis de Ambiente Necessárias

Configure na **Vercel Dashboard**:

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `MONGODB_URI` | Connection string do MongoDB Atlas | ✅ Sim |
| `GEMINI_API_KEY` | API Key do Google Gemini | ✅ Sim |
| `NODE_ENV` | Ambiente (production) | ✅ Sim |

### 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia client e server
npm run dev:client       # Inicia apenas frontend
npm run dev:server       # Inicia apenas backend

# Build
npm run build            # Build completo (client + server)
npm run build:client     # Build apenas frontend
npm run build:server     # Build apenas backend

# Instalação
npm run install:all      # Instala deps de todos os projetos

# Segurança
npm run check-security   # Verifica se há .env ou credenciais
npm run precommit        # Executa antes de commit

# Vercel
npm run vercel-build     # Build para Vercel (client)
```

### ⚙️ Configuração Vercel

#### vercel.json (raiz)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "client/dist" }
    },
    {
      "src": "server/api/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "server/api/index.ts" },
    { "src": "/(.*)", "dest": "client/dist/$1" }
  ]
}
```

#### Build Settings na Vercel:
- **Framework Preset**: Other
- **Build Command**: `npm run build:client`
- **Output Directory**: `client/dist`
- **Install Command**: `npm run install:all`
- **Root Directory**: (vazio - usa raiz)

### 🔐 Verificação de Segurança

Execute antes de cada commit:

```bash
npm run check-security
```

O script verifica:
- ✅ Nenhum arquivo `.env` no Git
- ✅ Nenhum `.env` no histórico
- ✅ `.env` está no `.gitignore`
- ✅ Nenhuma API key no código
- ✅ Nenhuma connection string com credenciais
- ✅ `.env.example` usa placeholders

### 📚 Documentação

| Arquivo | Descrição |
|---------|-----------|
| `README.md` | Documentação principal do projeto |
| `QUICKSTART.md` | Guia rápido de deploy (15 min) |
| `DEPLOY.md` | Guia detalhado de deploy com troubleshooting |
| `SECURITY.md` | Guia completo de segurança de variáveis |
| `ARCHITECTURE.md` | Arquitetura do sistema |

### ✅ Checklist Pré-Deploy

Antes de fazer deploy:

- [ ] Executar `npm run check-security` (deve passar)
- [ ] Ter MongoDB Atlas configurado
- [ ] Ter API Key do Gemini
- [ ] Código commitado no GitHub
- [ ] Build local funciona: `npm run build`

### 🎯 Próximos Passos

1. **Configurar MongoDB Atlas**
   - Criar cluster
   - Criar usuário de banco
   - Configurar Network Access (0.0.0.0/0)
   - Copiar connection string

2. **Obter API Key do Gemini**
   - Acessar [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Criar API Key
   - Copiar chave

3. **Deploy na Vercel**
   - Acessar [vercel.com](https://vercel.com)
   - Importar repositório `boleto-sem-medo`
   - Configurar variáveis de ambiente
   - Deploy!

4. **Verificar Deploy**
   - Testar frontend
   - Testar API
   - Testar integração completa

### 🆘 Suporte

- **Problemas de build**: Ver `DEPLOY.md` → Troubleshooting
- **Problemas de segurança**: Ver `SECURITY.md`
- **Dúvidas gerais**: Ver `README.md`

### 📊 Status Atual

- ✅ Estrutura de monorepo configurada
- ✅ Proteção de variáveis de ambiente implementada
- ✅ Configuração Vercel completa
- ✅ Scripts de build e desenvolvimento prontos
- ✅ Verificação de segurança automatizada
- ✅ Documentação completa

### 🎉 Pronto para Deploy!

O repositório está completamente configurado e pronto para deploy na Vercel.

Execute:
```bash
npm run check-security
```

Se passar, você está pronto para fazer commit e deploy! 🚀

---

**Última atualização**: 2025-12-04
**Versão**: 1.0.0
