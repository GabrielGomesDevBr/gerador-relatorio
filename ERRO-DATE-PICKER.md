# 🔧 Correção do Erro DatePicker

## ❌ Problema
```
RangeError: Invalid time value
```

## 🎯 Causa
O DatePicker estava tentando usar uma data inválida salva no localStorage.

## ✅ Soluções Implementadas

### 1. **Correção no useLocalStorage.js**
- Converte strings de data para objetos Date válidos
- Verifica se a data é válida antes de usar
- Fallback para `new Date()` em caso de erro

### 2. **Melhorias no Step1_PatientData.js**
- Validação de data no handleDateChange
- Prevenção de datas inválidas

### 3. **Script de Limpeza**
Criado arquivo `clear-storage.html` para limpar dados corrompidos.

## 🚀 Para Resolver Rapidamente

### Opção 1: Limpar localStorage pelo Browser
1. F12 → Console
2. Execute:
```javascript
localStorage.removeItem('psicoia-patient-data');
localStorage.removeItem('psicoia-report-config');  
localStorage.removeItem('psicoia-specific-fields');
localStorage.removeItem('psicoia-generated-report');
location.reload();
```

### Opção 2: Usar o arquivo de limpeza
1. Abra: `file:///caminho/para/clear-storage.html`
2. Clique em "Limpar localStorage"
3. Recarregue a aplicação

## 🔄 Reiniciar Aplicação
Após limpar o localStorage, reinicie:
```bash
# Pare os serviços (Ctrl+C)
# Depois reinicie:
./start-manual.sh
```

## ✅ Aplicação deve funcionar normalmente agora
- DatePicker com data válida
- Sem erros de "Invalid time value"
- Persistência funcionando corretamente