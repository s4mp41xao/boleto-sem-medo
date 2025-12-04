# Boleto Sem Medo 🛡️

Sistema inteligente de análise de boletos utilizando IA para detectar fraudes e validar informações.

## 📁 Estrutura do Projeto

```
boleto-sem-medo/
├── client/          # Frontend (React + Vite)
├── server/          # Backend (NestJS)
├── .env.example     # Exemplo de variáveis de ambiente
├── vercel.json      # Configuração Vercel
└── package.json     # Scripts do monorepo
```

## 🚀 Deploy na Vercel

### Pré-requisitos

1. Conta na [Vercel](https://vercel.com)
2. Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (para produção)
3. API Key do [Google Gemini](https://makersuite.google.com/app/apikey)

### Passo a Passo

#### 1. Preparar o Repositório

```bash
# Certifique-se de que está no diretório raiz
cd boleto-sem-medo

# Verifique se o .gitignore está correto (não deve incluir .env)
git status

# Adicione e commite as mudanças
git add .
git commit -m "Configure Vercel deployment"
git push origin main
```

#### 2. Configurar na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "Add New Project"
3. Importe o repositório `boleto-sem-medo`
4. Configure as variáveis de ambiente:

**⚠️ IMPORTANTE: Configure estas variáveis na Vercel Dashboard**

```
MONGODB_URI=mongodb+srv://seu-usuario:senha@cluster.mongodb.net/boleto-sem-medo
GEMINI_API_KEY=sua-chave-api-gemini
NODE_ENV=production
```

5. Em "Build & Development Settings":
   - **Framework Preset**: Other
   - **Build Command**: `npm run build:client`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm run install:all`

6. Clique em "Deploy"

#### 3. Configurar Variáveis de Ambiente (Vercel Dashboard)

1. Vá para o projeto na Vercel
2. Clique em "Settings" → "Environment Variables"
3. Adicione cada variável:
   - `MONGODB_URI`: Sua connection string do MongoDB Atlas
   - `GEMINI_API_KEY`: Sua chave da API Gemini
   - `NODE_ENV`: `production`

**🔒 NUNCA commite arquivos .env no Git!**

## 💻 Desenvolvimento Local

### Instalação

```bash
# Instalar todas as dependências (raiz, client e server)
npm run install:all
```

### Configurar Variáveis de Ambiente

```bash
# Copiar o arquivo de exemplo
cp .env.example .env

# Editar o arquivo .env com suas credenciais
# NUNCA commite este arquivo!
```

### Executar em Desenvolvimento

```bash
# Executar client e server simultaneamente
npm run dev

# Ou executar separadamente:
npm run dev:client  # Frontend em http://localhost:5173
npm run dev:server  # Backend em http://localhost:3000
```

## 🔧 Scripts Disponíveis

```bash
npm run dev              # Inicia client e server
npm run dev:client       # Inicia apenas o frontend
npm run dev:server       # Inicia apenas o backend
npm run build            # Build de produção (client + server)
npm run build:client     # Build apenas do frontend
npm run build:server     # Build apenas do backend
npm run install:all      # Instala dependências de todos os projetos
```

## 🔐 Segurança

### Variáveis de Ambiente

- ✅ `.env.example` - Commitado (apenas exemplo)
- ❌ `.env` - NUNCA commitar (contém dados sensíveis)
- ❌ `.env.local` - NUNCA commitar
- ❌ `.env.production` - NUNCA commitar

### Arquivos Ignorados pelo Git

O `.gitignore` está configurado para ignorar:
- Todos os arquivos `.env*` (exceto `.env.example`)
- `node_modules/`
- `dist/` e `build/`
- Arquivos de log
- Arquivos temporários

## 📦 Tecnologias

### Frontend (Client)
- React 19
- Vite
- TailwindCSS
- TypeScript
- Framer Motion

### Backend (Server)
- NestJS
- MongoDB + Mongoose
- Google Gemini AI
- TypeScript

## 🌐 URLs

- **Produção**: Será fornecida após deploy na Vercel
- **Local Frontend**: http://localhost:5173
- **Local Backend**: http://localhost:3000

## 📝 Checklist de Deploy

- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] MongoDB Atlas configurado e acessível
- [ ] API Key do Gemini válida
- [ ] Arquivo `.env` NÃO está no repositório Git
- [ ] Build local funciona: `npm run build`
- [ ] Testes passando (se houver)

## 🆘 Troubleshooting

### Erro: "Cannot find module"
```bash
npm run install:all
```

### Erro: "Environment variables not defined"
- Verifique se as variáveis estão configuradas na Vercel Dashboard
- Para local, verifique se o arquivo `.env` existe e está preenchido

### Erro de conexão com MongoDB
- Verifique se o IP está na whitelist do MongoDB Atlas
- Confirme se a connection string está correta
- Para Vercel, adicione `0.0.0.0/0` na whitelist (ou IPs específicos da Vercel)

## 📄 Licença

Privado - Todos os direitos reservados
