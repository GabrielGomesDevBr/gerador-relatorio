import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// Carrega variáveis de ambiente
dotenv.config();

// Validação de ambiente
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ ERRO: OPENAI_API_KEY não encontrada nas variáveis de ambiente');
  console.log('💡 Crie um arquivo .env na pasta backend com:');
  console.log('OPENAI_API_KEY=sua_chave_aqui');
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3001;
const isDevelopment = process.env.NODE_ENV !== 'production';

// Rate limiting - mais permissivo em desenvolvimento
const limiter = rateLimit({
  windowMs: isDevelopment ? 60 * 1000 : 15 * 60 * 1000, // 1 min dev, 15 min prod
  max: isDevelopment ? 50 : 10, // 50 req/min dev, 10 req/15min prod
  message: {
    error: 'Muitas tentativas. Tente novamente em alguns minutos.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middlewares de segurança
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: isDevelopment ? false : undefined
}));
app.use(cors({
  origin: isDevelopment ? ['http://localhost:3000', 'http://127.0.0.1:3000'] : process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use('/api/', limiter);

// Configuração da OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 60000, // 60 segundos timeout
  maxRetries: 2,
});

// Funções auxiliares
const sanitizeInput = (text) => {
  if (typeof text !== 'string') return '';
  return text.trim().slice(0, 5000); // Limita a 5000 caracteres
};

const validatePrompt = (prompt) => {
  if (!prompt || typeof prompt !== 'string') {
    return { isValid: false, error: 'Prompt é obrigatório e deve ser uma string.' };
  }
  
  if (prompt.length < 50) {
    return { isValid: false, error: 'Prompt muito curto. Mínimo 50 caracteres.' };
  }
  
  if (prompt.length > 15000) {
    return { isValid: false, error: 'Prompt muito longo. Máximo 15.000 caracteres.' };
  }
  
  return { isValid: true };
};

// Rota de teste
app.get("/", (req, res) => {
  res.send("PsicoIA Pro Backend is running!");
});

// Rota para gerar o relatório
app.post("/api/generate-report", async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { prompt } = req.body;
    
    // Validação do prompt
    const validation = validatePrompt(prompt);
    if (!validation.isValid) {
      return res.status(400).json({ 
        error: validation.error,
        code: 'INVALID_PROMPT'
      });
    }

    // Sanitização
    const sanitizedPrompt = sanitizeInput(prompt);
    
    console.log(`🚀 Iniciando geração de relatório... (${new Date().toLocaleTimeString()})`);
    
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: sanitizedPrompt }],
      model: "gpt-4.1-nano",
      temperature: 0.3, // Mais consistente para relatórios técnicos
      max_tokens: 4000,
    });

    if (!completion.choices || completion.choices.length === 0) {
      throw new Error('Resposta inválida da OpenAI');
    }

    const report = completion.choices[0].message.content;
    const duration = Date.now() - startTime;
    
    console.log(`✅ Relatório gerado com sucesso em ${duration}ms`);
    
    res.json({ 
      report,
      metadata: {
        generatedAt: new Date().toISOString(),
        duration,
        model: "gpt-4.1-nano",
        tokens: completion.usage?.total_tokens || null
      }
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ Erro ao gerar relatório (${duration}ms):`, error.message);
    
    // Tratamento específico de erros da OpenAI
    if (error.code === 'insufficient_quota') {
      return res.status(402).json({ 
        error: 'Cota da API OpenAI esgotada. Verifique sua conta.',
        code: 'QUOTA_EXCEEDED'
      });
    }
    
    if (error.code === 'invalid_api_key') {
      return res.status(401).json({ 
        error: 'Chave da API OpenAI inválida.',
        code: 'INVALID_API_KEY'
      });
    }
    
    if (error.code === 'model_not_found') {
      return res.status(400).json({ 
        error: 'Modelo não encontrado ou indisponível.',
        code: 'MODEL_NOT_FOUND'
      });
    }
    
    if (error.name === 'TimeoutError') {
      return res.status(408).json({ 
        error: 'Timeout na geração do relatório. Tente novamente.',
        code: 'TIMEOUT'
      });
    }
    
    // Erro genérico
    res.status(500).json({ 
      error: 'Falha interna na geração do relatório. Tente novamente.',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Middleware para tratamento de erros não capturados
app.use((err, req, res, next) => {
  console.error('❌ Erro não tratado:', err);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    code: 'UNHANDLED_ERROR'
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint não encontrado',
    code: 'NOT_FOUND'
  });
});

app.listen(port, () => {
  console.log(`🟢 PsicoIA Pro Backend rodando na porta ${port}`);
  console.log(`🔗 Acesse: http://localhost:${port}`);
  console.log(`🌍 Ambiente: ${isDevelopment ? 'Desenvolvimento' : 'Produção'}`);
  console.log(`✅ OpenAI configurada com sucesso`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 Desligando servidor graciosamente...');
  process.exit(0);
});

