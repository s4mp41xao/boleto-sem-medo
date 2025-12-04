# 🚀 Guia de Deploy na Vercel

## Visão Geral

Este guia detalha o processo de deploy do **Boleto Sem Medo** na Vercel, garantindo que:
- ✅ Apenas um repositório é usado (`boleto-sem-medo`)
- ✅ Variáveis de ambiente são protegidas e nunca commitadas
- ✅ Front-end e back-end são deployados corretamente

## 📋 Pré-requisitos

### 1. Contas Necessárias

- [ ] Conta GitHub com repositório `boleto-sem-medo`
- [ ] Conta Vercel (pode usar login do GitHub)
- [ ] Conta MongoDB Atlas (banco de dados em produção)
- [ ] API Key do Google Gemini

### 2. Variáveis de Ambiente

Você precisará dos seguintes valores:

| Variável | Descrição | Onde Obter |
|----------|-----------|------------|
| `MONGODB_URI` | Connection string do MongoDB | [MongoDB Atlas](https://cloud.mongodb.com) |
| `GEMINI_API_KEY` | Chave da API Gemini | [Google AI Studio](https://makersuite.google.com/app/apikey) |
| `NODE_ENV` | Ambiente de execução | Use `production` |

## 🔧 Configuração do MongoDB Atlas

### Passo 1: Criar Cluster

1. Acesse [MongoDB Atlas](https://cloud.mongodb.com)
2. Crie um novo cluster (Free Tier é suficiente para começar)
3. Aguarde a criação do cluster

### Passo 2: Configurar Acesso

1. Vá em **Database Access** → **Add New Database User**
   - Username: `boleto-admin` (ou outro de sua escolha)
   - Password: Gere uma senha forte e **salve-a**
   - Privilégios: `Read and write to any database`

2. Vá em **Network Access** → **Add IP Address**
   - Para Vercel, adicione: `0.0.0.0/0` (permite acesso de qualquer IP)
   - ⚠️ Em produção, considere restringir aos IPs da Vercel

### Passo 3: Obter Connection String

1. Clique em **Connect** no seu cluster
2. Escolha **Connect your application**
3. Copie a connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/boleto-sem-medo?retryWrites=true&w=majority
   ```
4. Substitua `<username>` e `<password>` pelos valores reais
5. **Salve esta string** - você usará na Vercel

## 🔑 Obter API Key do Gemini

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Faça login com sua conta Google
3. Clique em **Create API Key**
4. Copie a chave gerada
5. **Salve esta chave** - você usará na Vercel

## 🌐 Deploy na Vercel

### Passo 1: Preparar o Repositório

```bash
# 1. Certifique-se de estar na raiz do projeto
cd /Users/samuelpaixao/Documents/projects/boleto-sem-medo

# 2. Verifique se não há arquivos .env sendo rastreados
git status

# 3. Se houver arquivos .env listados, remova-os do Git
git rm --cached .env
git rm --cached client/.env
git rm --cached server/.env

# 4. Adicione as mudanças
git add .

# 5. Commit
git commit -m "Configure Vercel deployment with environment protection"

# 6. Push para o GitHub
git push origin main
```

### Passo 2: Importar na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login (recomendado usar conta GitHub)
3. Clique em **Add New...** → **Project**
4. Selecione o repositório `boleto-sem-medo`
5. Clique em **Import**

### Passo 3: Configurar o Projeto

Na tela de configuração:

#### Framework Preset
- Selecione: **Other**

#### Root Directory
- Deixe em branco (usa a raiz do repositório)

#### Build and Output Settings

```
Build Command: npm run build:client
Output Directory: client/dist
Install Command: npm run install:all
```

#### Environment Variables

Clique em **Add** para cada variável:

1. **MONGODB_URI**
   - Value: `mongodb+srv://seu-usuario:sua-senha@cluster.mongodb.net/boleto-sem-medo?retryWrites=true&w=majority`
   - Environment: Production, Preview, Development

2. **GEMINI_API_KEY**
   - Value: `sua-chave-api-gemini`
   - Environment: Production, Preview, Development

3. **NODE_ENV**
   - Value: `production`
   - Environment: Production

### Passo 4: Deploy

1. Clique em **Deploy**
2. Aguarde o build completar (3-5 minutos)
3. Após conclusão, você receberá uma URL: `https://boleto-sem-medo.vercel.app`

## ✅ Verificação Pós-Deploy

### 1. Testar Frontend

```bash
# Acesse a URL fornecida pela Vercel
https://seu-projeto.vercel.app
```

Verifique se:
- [ ] A página carrega corretamente
- [ ] Não há erros no console do navegador
- [ ] O design está correto

### 2. Testar Backend

```bash
# Teste o endpoint da API
curl https://seu-projeto.vercel.app/api/health
```

Deve retornar status 200.

### 3. Testar Integração Completa

1. Faça upload de um boleto de teste
2. Verifique se a análise funciona
3. Confirme que os dados são salvos no MongoDB

## 🔒 Checklist de Segurança

Antes de considerar o deploy completo, verifique:

- [ ] Nenhum arquivo `.env` está no repositório Git
- [ ] Todas as variáveis de ambiente estão na Vercel Dashboard
- [ ] MongoDB está configurado com usuário e senha fortes
- [ ] Network Access do MongoDB está configurado
- [ ] API Key do Gemini está válida e funcionando
- [ ] `.gitignore` está protegendo arquivos sensíveis
- [ ] Não há credenciais hardcoded no código

## 🐛 Troubleshooting

### Erro: "Build failed"

**Solução:**
```bash
# Teste o build localmente
npm run build

# Se falhar, corrija os erros e faça novo deploy
git add .
git commit -m "Fix build errors"
git push origin main
```

### Erro: "Cannot connect to MongoDB"

**Possíveis causas:**
1. Connection string incorreta
   - Verifique se username e password estão corretos
   - Confirme que o nome do database está correto

2. IP não está na whitelist
   - Adicione `0.0.0.0/0` no Network Access do MongoDB Atlas

3. Variável de ambiente não configurada
   - Verifique na Vercel Dashboard → Settings → Environment Variables

### Erro: "Gemini API not working"

**Soluções:**
1. Verifique se a API Key está correta
2. Confirme que a API está habilitada no Google Cloud
3. Verifique se há quota disponível

### Erro: "Module not found"

**Solução:**
```bash
# Limpe e reinstale dependências
rm -rf node_modules client/node_modules server/node_modules
npm run install:all

# Teste localmente
npm run build

# Se funcionar, faça redeploy
git push origin main
```

## 📊 Monitoramento

### Logs na Vercel

1. Acesse seu projeto na Vercel
2. Vá em **Deployments**
3. Clique no deployment mais recente
4. Veja os logs em tempo real

### Métricas

- **Analytics**: Vercel → seu projeto → Analytics
- **Performance**: Vercel → seu projeto → Speed Insights
- **Errors**: Vercel → seu projeto → Logs

## 🔄 Atualizações

Para fazer deploy de novas versões:

```bash
# 1. Faça suas alterações no código
# 2. Teste localmente
npm run dev

# 3. Commit e push
git add .
git commit -m "Descrição das mudanças"
git push origin main

# 4. Vercel fará deploy automático!
```

## 📞 Suporte

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Gemini API Docs**: https://ai.google.dev/docs

## 🎉 Conclusão

Após seguir este guia, você terá:
- ✅ Aplicação deployada na Vercel
- ✅ Variáveis de ambiente protegidas
- ✅ MongoDB Atlas configurado
- ✅ CI/CD automático via GitHub

**URL do Projeto**: `https://seu-projeto.vercel.app`

---

**Última atualização**: 2025-12-04
