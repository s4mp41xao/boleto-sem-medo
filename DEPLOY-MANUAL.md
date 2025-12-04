# 🚀 DEPLOY NA VERCEL - PASSO A PASSO

## ✅ STATUS ATUAL

- ✅ Código commitado com sucesso
- ⏳ Push para GitHub em andamento
- 🌐 Página da Vercel aberta no navegador

---

## 📋 PRÓXIMOS PASSOS (VOCÊ PRECISA FAZER)

### 1. ✅ FAZER LOGIN NA VERCEL

A página de login da Vercel já está aberta no seu navegador.

**Opções de login:**
- **GitHub** (Recomendado) - Clique em "Continue with GitHub"
- **GitLab** - Se usar GitLab
- **Bitbucket** - Se usar Bitbucket
- **Email** - Login com email

**👉 FAÇA LOGIN AGORA**

---

### 2. 📦 IMPORTAR O PROJETO

Após fazer login:

1. Clique em **"Add New..."** (canto superior direito)
2. Selecione **"Project"**
3. Na lista de repositórios, encontre **"boleto-sem-medo"**
4. Clique em **"Import"**

---

### 3. ⚙️ CONFIGURAR O PROJETO

Na tela de configuração:

#### A. Framework Preset
```
Selecione: Other
```

#### B. Root Directory
```
Deixe em branco (usa a raiz do repositório)
```

#### C. Build and Output Settings

**Build Command:**
```
npm run build:client
```

**Output Directory:**
```
client/dist
```

**Install Command:**
```
npm run install:all
```

#### D. Environment Variables

**⚠️ IMPORTANTE: Você precisa configurar 3 variáveis**

Clique em **"Environment Variables"** e adicione:

##### Variável 1: MONGODB_URI
```
Name: MONGODB_URI
Value: [SUA CONNECTION STRING DO MONGODB ATLAS]
Environment: Production, Preview, Development
```

**Onde obter:**
- Se ainda não tem: https://cloud.mongodb.com
- Crie um cluster gratuito
- Database Access → Add User
- Network Access → Add IP (0.0.0.0/0)
- Clusters → Connect → Connection string

**Formato:**
```
mongodb+srv://usuario:senha@cluster.mongodb.net/boleto-sem-medo?retryWrites=true&w=majority
```

##### Variável 2: GEMINI_API_KEY
```
Name: GEMINI_API_KEY
Value: [SUA API KEY DO GOOGLE GEMINI]
Environment: Production, Preview, Development
```

**Onde obter:**
- Acesse: https://makersuite.google.com/app/apikey
- Clique em "Create API Key"
- Copie a chave (começa com AIza...)

##### Variável 3: NODE_ENV
```
Name: NODE_ENV
Value: production
Environment: Production
```

---

### 4. 🚀 FAZER DEPLOY

Após configurar tudo:

1. Revise as configurações
2. Clique em **"Deploy"**
3. Aguarde o build (3-5 minutos)

---

## 📊 CHECKLIST

Antes de clicar em Deploy, confirme:

- [ ] Fez login na Vercel
- [ ] Importou o repositório "boleto-sem-medo"
- [ ] Framework: Other
- [ ] Build Command: `npm run build:client`
- [ ] Output Directory: `client/dist`
- [ ] Install Command: `npm run install:all`
- [ ] Variável `MONGODB_URI` configurada
- [ ] Variável `GEMINI_API_KEY` configurada
- [ ] Variável `NODE_ENV` configurada

---

## 🎯 APÓS O DEPLOY

Quando o deploy completar:

1. ✅ Você receberá uma URL: `https://seu-projeto.vercel.app`
2. ✅ Teste a aplicação
3. ✅ Verifique se o frontend carrega
4. ✅ Teste upload de um boleto

---

## 🆘 SE NÃO TIVER AS CREDENCIAIS

### MongoDB Atlas (10 min)

1. Acesse: https://cloud.mongodb.com
2. Crie conta gratuita
3. Create a Deployment → M0 (Free)
4. Database Access:
   - Add New Database User
   - Username: `boleto-admin`
   - Password: [gere uma senha forte]
   - Database User Privileges: Read and write to any database
5. Network Access:
   - Add IP Address
   - Allow Access from Anywhere: `0.0.0.0/0`
6. Database → Connect:
   - Drivers → Node.js
   - Copie a connection string
   - Substitua `<password>` pela senha real

### Google Gemini API (3 min)

1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com Google
3. Create API Key
4. Copie a chave

---

## 📞 PRÓXIMOS PASSOS

Depois que você:
1. Fizer login na Vercel
2. Configurar as variáveis de ambiente
3. Clicar em Deploy

Me avise e eu posso:
- Verificar se o deploy foi bem-sucedido
- Testar a aplicação
- Configurar domínio customizado (se quiser)

---

**🎉 Você está quase lá! Só falta fazer login e configurar as variáveis!**
