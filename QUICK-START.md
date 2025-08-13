# 🚀 Início Rápido - PsicoIA Pro

## ⚠️ Problema de File Watchers Detectado

Seu sistema tem o limite de file watchers esgotado. Aqui estão as **soluções imediatas**:

## 🔧 Solução 1: Script Manual (Recomendado)

```bash
# 1. Configure sua chave OpenAI
nano backend/.env
# Substitua: sk-SUBSTITUA_PELA_SUA_CHAVE_AQUI
# Por sua chave real da OpenAI

# 2. Execute o script manual
./start-manual.sh
```

## 🔧 Solução 2: Comandos Separados

```bash
# Terminal 1 - Backend
npm run backend:only

# Terminal 2 - Frontend (em outro terminal)
npm run frontend:only
```

## 🔧 Solução 3: Aumentar Limite (Requer sudo)

```bash
# Solução permanente
sudo sysctl fs.inotify.max_user_watches=524288
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf

# Depois disso, pode usar normalmente:
npm run dev
```

## ✅ Verificação

Uma vez iniciado, acesse:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

## 🆘 Se ainda não funcionar

1. **Verifique se as portas estão livres:**
```bash
sudo ss -tlnp | grep -E ':(3000|3001)'
```

2. **Mate processos que podem estar ocupando as portas:**
```bash
sudo pkill -f "node.*3000"
sudo pkill -f "node.*3001"
```

3. **Use portas alternativas:**
```bash
# Backend em outra porta
cd backend
PORT=3002 node server.js

# Frontend em outra porta  
cd frontend
PORT=3001 npm start
```

## 📝 Próximos Passos

1. Configure sua chave da OpenAI
2. Teste a geração de um relatório
3. Verifique se os dados são salvos automaticamente
4. Exporte um relatório em DOCX

## 🔍 Debug

Se algo não funcionar:
```bash
# Ver logs detalhados do backend
cd backend && node server.js

# Ver se há erros no frontend
cd frontend && npm start
```