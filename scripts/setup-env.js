const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Configuração inicial do PsicoIA Pro\n');

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function setupEnvironment() {
  try {
    // Backend .env
    const backendEnvPath = path.join(__dirname, '../backend/.env');
    if (!fs.existsSync(backendEnvPath)) {
      console.log('📝 Configurando backend...');
      const apiKey = await askQuestion('Digite sua chave da API OpenAI (obrigatório): ');
      
      if (!apiKey.trim()) {
        console.log('❌ Chave da API é obrigatória!');
        process.exit(1);
      }

      const backendEnv = `# Configuração do Backend - PsicoIA Pro
OPENAI_API_KEY=${apiKey}
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
`;

      fs.writeFileSync(backendEnvPath, backendEnv);
      console.log('✅ Backend configurado!');
    } else {
      console.log('✅ Backend já configurado.');
    }

    // Frontend .env.local
    const frontendEnvPath = path.join(__dirname, '../frontend/.env.local');
    if (!fs.existsSync(frontendEnvPath)) {
      console.log('📝 Configurando frontend...');
      
      const frontendEnv = `# Configuração do Frontend - PsicoIA Pro
REACT_APP_API_URL=http://localhost:3001/api
GENERATE_SOURCEMAP=true
REACT_APP_DEBUG_MODE=true
`;

      fs.writeFileSync(frontendEnvPath, frontendEnv);
      console.log('✅ Frontend configurado!');
    } else {
      console.log('✅ Frontend já configurado.');
    }

    console.log('\n🎉 Configuração concluída com sucesso!');
    console.log('\nPróximos passos:');
    console.log('1. npm run dev (para iniciar ambos os serviços)');
    console.log('2. Abra http://localhost:3000 no navegador');
    console.log('\nComandos úteis:');
    console.log('- npm run dev:backend (apenas backend)');
    console.log('- npm run dev:frontend (apenas frontend)');

  } catch (error) {
    console.error('❌ Erro na configuração:', error.message);
  } finally {
    rl.close();
  }
}

setupEnvironment();