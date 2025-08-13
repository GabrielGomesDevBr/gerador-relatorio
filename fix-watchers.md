# 🔧 Correção para Erro de File Watchers

## Problema
```
ENOSPC: System limit for number of file watchers reached
```

## Soluções Disponíveis

### 1. **Solução Temporária (Recomendada para teste)**
Use os comandos alternativos que não dependem de file watchers:

```bash
# Ao invés de: npm run dev
npm run dev:simple

# Ou para apenas o backend:
npm run dev:backend:simple
```

### 2. **Solução Permanente (Requer sudo)**
Aumente o limite de file watchers do sistema:

```bash
# Aumenta temporariamente
sudo sysctl fs.inotify.max_user_watches=524288

# Para tornar permanente, adicione ao arquivo de configuração:
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### 3. **Verificar Uso Atual**
```bash
# Ver limite atual
sysctl fs.inotify.max_user_watches

# Ver uso atual (aproximado)
find /proc/*/fd -user "$USER" -lname anon_inode:inotify -printf '%hd\n' 2>/dev/null | wc -l
```

## Comandos Disponíveis

### Desenvolvimento Normal (com file watchers)
- `npm run dev` - Frontend + Backend com hot reload
- `npm run dev:backend` - Apenas backend com hot reload  
- `npm run dev:frontend` - Apenas frontend

### Desenvolvimento Simples (sem file watchers intensivos)
- `npm run dev:simple` - Frontend + Backend (Node.js --watch)
- `npm run dev:backend:simple` - Apenas backend simples

### Produção
- `npm run start` - Inicia sem watchers (produção)

## Recomendação
Para o MVP, use `npm run dev:simple` que funcionará sem problemas de file watchers.