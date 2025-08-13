#!/bin/bash

# Script para iniciar a aplicação sem file watchers
echo "🚀 Iniciando PsicoIA Pro (modo sem watchers)"
echo ""

# Verifica se a chave da OpenAI está configurada
if grep -q "sk-SUBSTITUA_PELA_SUA_CHAVE_AQUI" backend/.env 2>/dev/null; then
    echo "⚠️  AVISO: Configure sua chave da OpenAI em backend/.env"
    echo "   Edite o arquivo e substitua 'sk-SUBSTITUA_PELA_SUA_CHAVE_AQUI'"
    echo "   pela sua chave real da OpenAI"
    echo ""
fi

echo "📡 Iniciando Backend na porta 3001..."
cd backend
node server.js &
BACKEND_PID=$!

# Aguarda um pouco para o backend iniciar
sleep 2

echo "🌐 Iniciando Frontend na porta 3000..."
cd ../frontend

# Desabilita watchers do React para economizar recursos
export CHOKIDAR_USEPOLLING=true
export CHOKIDAR_INTERVAL=2000
export WDS_SOCKET_PORT=0

npm start &
FRONTEND_PID=$!

echo ""
echo "✅ Aplicação iniciada!"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3001"
echo ""
echo "Para parar os serviços, pressione Ctrl+C"
echo ""

# Função para cleanup ao parar o script
cleanup() {
    echo ""
    echo "🛑 Parando serviços..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Serviços parados!"
    exit 0
}

# Captura sinais para cleanup
trap cleanup SIGINT SIGTERM

# Aguarda indefinidamente
wait