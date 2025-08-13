import axios from 'axios';

// Configuração base da API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 90000, // 90 segundos para geração de relatórios
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função de delay para retry
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Função para retry com backoff exponencial
const retryRequest = async (requestFn, maxRetries = 3, baseDelay = 1000) => {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      // Não fazer retry em erros que não devem ser retentados
      if (
        error.response?.status === 400 || // Bad Request
        error.response?.status === 401 || // Unauthorized
        error.response?.status === 403 || // Forbidden
        error.response?.status === 404 || // Not Found
        error.response?.status === 413    // Payload Too Large
      ) {
        throw error;
      }
      
      // Se é a última tentativa, lança o erro
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      // Calcula delay com backoff exponencial
      const delayTime = baseDelay * Math.pow(2, attempt);
      console.log(`🔄 Tentativa ${attempt + 1} falhou, tentando novamente em ${delayTime}ms...`);
      await delay(delayTime);
    }
  }
};

// Função para gerar relatório com retry
export const generateReport = async (prompt, onProgress = null) => {
  const requestFn = async () => {
    if (onProgress) onProgress('Enviando solicitação...');
    
    const response = await api.post('/generate-report', { prompt });
    
    if (onProgress) onProgress('Processando resposta...');
    
    return response.data;
  };

  try {
    return await retryRequest(requestFn, 2, 2000); // 2 retries, 2 segundos base
  } catch (error) {
    // Melhora as mensagens de erro para o usuário
    const errorMessage = getErrorMessage(error);
    throw new Error(errorMessage);
  }
};

// Função para obter mensagem de erro amigável
const getErrorMessage = (error) => {
  if (!error.response) {
    return 'Erro de conexão. Verifique sua internet e tente novamente.';
  }

  const { status, data } = error.response;
  
  switch (status) {
    case 400:
      return data.error || 'Dados inválidos fornecidos.';
    case 401:
      return 'Chave da API OpenAI inválida. Verifique a configuração.';
    case 402:
      return 'Cota da API OpenAI esgotada. Verifique sua conta OpenAI.';
    case 408:
      return 'Timeout na geração. O relatório pode estar muito complexo.';
    case 413:
      return 'Dados muito extensos. Reduza o conteúdo e tente novamente.';
    case 429:
      return 'Muitas tentativas. Aguarde alguns minutos e tente novamente.';
    case 500:
      return 'Erro interno do servidor. Tente novamente em alguns instantes.';
    case 502:
    case 503:
    case 504:
      return 'Servidor temporariamente indisponível. Tente novamente.';
    default:
      return data.error || 'Erro desconhecido. Tente novamente.';
  }
};

// Interceptor para logging (apenas em desenvolvimento)
if (process.env.NODE_ENV === 'development') {
  api.interceptors.request.use(
    (config) => {
      console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
      return config;
    },
    (error) => {
      console.error('📤 API Request Error:', error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      console.log('📥 API Response:', response.status, response.config.url);
      return response;
    },
    (error) => {
      console.error('📥 API Response Error:', error.response?.status, error.config?.url);
      return Promise.reject(error);
    }
  );
}

export default api;