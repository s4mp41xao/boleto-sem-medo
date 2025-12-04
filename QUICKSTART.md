# 🚀 Deploy Rápido - Vercel

## ⚡ TL;DR - Passos Rápidos

```bash
# 1. Verificar segurança
./check-security.sh

# 2. Commit e push
git add .
git commit -m "Ready for Vercel deployment"
git push origin main

# 3. Ir para vercel.com e importar o repositório
# 4. Configurar variáveis de ambiente na Vercel Dashboard
# 5. Deploy!
```

## 📝 Variáveis de Ambiente Necessárias

Configure na **Vercel Dashboard** → **Settings** → **Environment Variables**:

| Variável | Valor | Onde Obter |
|----------|-------|------------|
| `MONGODB_URI` | `mongodb+srv://...` | [MongoDB Atlas](https://cloud.mongodb.com) |
| `GEMINI_API_KEY` | `AIza...` | [Google AI Studio](https://makersuite.google.com/app/apikey) |
| `NODE_ENV` | `production` | - |

## ✅ Checklist Pré-Deploy

- [ ] `./check-security.sh` passou sem erros
- [ ] Variáveis de ambiente prontas (MongoDB URI e Gemini API Key)
- [ ] Código commitado e pushed para GitHub
- [ ] Build local funciona: `npm run build`

## 🔧 Configurações Vercel

**Build Settings:**
- Framework Preset: `Other`
- Build Command: `npm run build:client`
- Output Directory: `client/dist`
- Install Command: `npm run install:all`

**Root Directory:** (deixe em branco)

## 🆘 Problemas Comuns

### Build falha
```bash
# Teste localmente
npm run build

# Se funcionar local mas falhar na Vercel, verifique:
# - Node version (deve ser >= 18)
# - Variáveis de ambiente configuradas
```

### API não funciona
```bash
# Verifique:
# - MONGODB_URI está correto
# - GEMINI_API_KEY está válida
# - MongoDB Network Access permite 0.0.0.0/0
```

### Erro de CORS
```bash
# Verifique se o backend tem CORS habilitado
# Em server/api/index.ts deve ter: app.enableCors()
```

## 📚 Documentação Completa

- **Deploy Detalhado**: Ver `DEPLOY.md`
- **Segurança**: Ver `SECURITY.md`
- **Arquitetura**: Ver `ARCHITECTURE.md`
- **README**: Ver `README.md`

## 🎯 Próximos Passos Após Deploy

1. Teste a aplicação na URL da Vercel
2. Configure domínio customizado (opcional)
3. Configure Analytics da Vercel
4. Configure alertas de erro
5. Documente a URL de produção

---

**Tempo estimado**: 15-20 minutos
