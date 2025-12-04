# 🔐 Segurança - Variáveis de Ambiente

## ⚠️ IMPORTANTE - LEIA ANTES DE FAZER DEPLOY

Este documento explica como proteger suas variáveis de ambiente e garantir que dados sensíveis nunca sejam expostos.

## 🚨 Regras Fundamentais

### ❌ NUNCA FAÇA ISSO:

1. **Nunca commite arquivos .env**
   ```bash
   # ERRADO - NÃO FAÇA ISSO!
   git add .env
   git commit -m "Add environment variables"
   ```

2. **Nunca coloque credenciais no código**
   ```typescript
   // ERRADO - NÃO FAÇA ISSO!
   const apiKey = "AIzaSyC..."; // Hardcoded
   const mongoUri = "mongodb+srv://user:pass@..."; // Hardcoded
   ```

3. **Nunca compartilhe .env em mensagens/emails**
   - Não envie por Slack, Discord, WhatsApp, etc.
   - Não cole em issues do GitHub
   - Não compartilhe em screenshots

### ✅ SEMPRE FAÇA ISSO:

1. **Use .env apenas localmente**
   ```bash
   # Copie o exemplo
   cp .env.example .env
   
   # Edite com suas credenciais
   # Este arquivo está no .gitignore
   ```

2. **Configure variáveis na Vercel Dashboard**
   - Vá em Settings → Environment Variables
   - Adicione cada variável manualmente
   - Nunca copie/cole o arquivo .env inteiro

3. **Use .env.example para documentação**
   ```bash
   # .env.example - PODE SER COMMITADO
   MONGODB_URI=mongodb://localhost:27017/boleto-sem-medo
   GEMINI_API_KEY=your_api_key_here
   ```

## 📋 Checklist de Segurança

Antes de cada commit, verifique:

```bash
# 1. Verifique o que será commitado
git status

# 2. Se aparecer .env, PARE IMEDIATAMENTE
# 3. Remova do staging
git reset .env

# 4. Verifique se está no .gitignore
cat .gitignore | grep .env

# 5. Se não estiver, adicione
echo ".env" >> .gitignore
echo ".env.*" >> .gitignore
echo "!.env.example" >> .gitignore
```

## 🔍 Como Verificar se Você Está Seguro

### Teste 1: Verificar Git Status

```bash
git status
```

**Resultado esperado**: `.env` NÃO deve aparecer na lista

### Teste 2: Verificar Histórico do Git

```bash
git log --all --full-history --oneline -- .env
```

**Resultado esperado**: Nenhum commit encontrado

### Teste 3: Buscar Credenciais no Código

```bash
# Buscar possíveis API keys
grep -r "AIza" . --exclude-dir=node_modules

# Buscar connection strings
grep -r "mongodb+srv://" . --exclude-dir=node_modules
```

**Resultado esperado**: Apenas em `.env.example` (se houver)

## 🛠️ Como Corrigir se Você Commitou .env

### Se ainda não fez push:

```bash
# 1. Remova o arquivo do último commit
git reset HEAD~1

# 2. Remova do staging
git reset .env

# 3. Adicione ao .gitignore se não estiver
echo ".env" >> .gitignore

# 4. Commit novamente (sem o .env)
git add .
git commit -m "Configure environment variables"
```

### Se já fez push (GRAVE):

```bash
# 1. Remova do histórico (CUIDADO!)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# 2. Force push (CUIDADO - coordene com a equipe!)
git push origin --force --all

# 3. IMPORTANTE: Troque TODAS as credenciais
# - Gere nova API Key do Gemini
# - Troque senha do MongoDB
# - Atualize na Vercel
```

**⚠️ ATENÇÃO**: Se você commitou credenciais, considere-as comprometidas e troque-as imediatamente!

## 🔐 Boas Práticas para Produção

### 1. Rotação de Credenciais

Troque suas credenciais periodicamente:
- API Keys: A cada 3-6 meses
- Senhas de banco: A cada 6-12 meses
- Tokens de acesso: Conforme política da empresa

### 2. Princípio do Menor Privilégio

- Use credenciais diferentes para dev/staging/prod
- Limite permissões ao mínimo necessário
- Não use credenciais de admin para a aplicação

### 3. Monitoramento

Configure alertas para:
- Tentativas de acesso não autorizado
- Uso anormal de API
- Mudanças em variáveis de ambiente

## 📚 Variáveis de Ambiente por Ambiente

### Desenvolvimento Local (.env)

```bash
MONGODB_URI=mongodb://localhost:27017/boleto-sem-medo
GEMINI_API_KEY=sua-chave-de-desenvolvimento
NODE_ENV=development
PORT=3000
```

### Produção (Vercel Dashboard)

```bash
MONGODB_URI=mongodb+srv://prod-user:strong-pass@cluster.mongodb.net/boleto-sem-medo
GEMINI_API_KEY=sua-chave-de-producao
NODE_ENV=production
```

### Staging (Vercel Dashboard - Preview)

```bash
MONGODB_URI=mongodb+srv://staging-user:strong-pass@cluster.mongodb.net/boleto-sem-medo-staging
GEMINI_API_KEY=sua-chave-de-staging
NODE_ENV=staging
```

## 🆘 Em Caso de Vazamento

Se você acidentalmente expôs credenciais:

### Ação Imediata (Primeiros 5 minutos):

1. **Revogue as credenciais comprometidas**
   - Gemini: Revogue a API Key no Google AI Studio
   - MongoDB: Troque a senha do usuário

2. **Gere novas credenciais**
   - Crie nova API Key
   - Crie nova senha forte

3. **Atualize na Vercel**
   - Settings → Environment Variables
   - Atualize os valores
   - Redeploy a aplicação

### Ação de Médio Prazo (Próximas 24h):

4. **Limpe o histórico do Git** (se commitou)
5. **Notifique a equipe** (se aplicável)
6. **Documente o incidente**
7. **Revise processos** para evitar recorrência

### Ação de Longo Prazo:

8. **Implemente secrets scanning** (GitHub Advanced Security)
9. **Configure pre-commit hooks** para bloquear commits com credenciais
10. **Treinamento da equipe** sobre segurança

## 🔗 Recursos Adicionais

- [OWASP - Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [GitHub - Removing Sensitive Data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

## ✅ Resumo - Checklist Rápido

Antes de cada commit:
- [ ] `git status` não mostra `.env`
- [ ] Não há credenciais hardcoded no código
- [ ] `.gitignore` está configurado corretamente
- [ ] Variáveis de produção estão na Vercel Dashboard
- [ ] `.env.example` está atualizado (sem valores reais)

---

**Lembre-se**: Segurança não é opcional. Proteja suas credenciais!
