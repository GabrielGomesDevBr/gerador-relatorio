# 🧠 PsicoIA Pro

Gerador de relatórios psicológicos inteligente utilizando IA para auxiliar profissionais de psicologia na criação de documentos técnicos profissionais.

## ✨ Funcionalidades

- **Interface Guiada**: Processo passo-a-passo para criação de relatórios
- **17 Tipos de Relatórios**: Diversos modelos especializados (devolutiva, evolução, anamnese, etc.)
- **IA Avançada**: Utiliza GPT-4.1 Nano para geração de conteúdo profissional
- **Exportação DOCX**: Gera documentos prontos para uso
- **Persistência Local**: Salva progresso automaticamente
- **Interface Moderna**: Design profissional e responsivo
- **Segurança**: Validação e sanitização de dados

## 📋 Pré-requisitos

- Node.js 16+ 
- NPM ou Yarn
- Chave da API OpenAI

## 🚀 Instalação Rápida

### 1. Clone o repositório
```bash
git clone <repository-url>
cd gerador-relatorio
```

### 2. Instalação automática
```bash
npm run setup
```

Este comando vai:
- Instalar todas as dependências
- Solicitar sua chave da API OpenAI
- Configurar os arquivos de ambiente

### 3. Inicie o projeto
```bash
npm run dev
```

## 🔧 Instalação Manual

### 1. Instalar dependências
```bash
# Raiz do projeto
npm install

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configurar variáveis de ambiente

**Backend (.env)**:
```bash
cd backend
cp .env.example .env
# Edite o .env com sua chave da OpenAI
```

**Frontend (.env.local)**:
```bash
cd frontend
cp .env.example .env.local
```

### 3. Iniciar serviços
```bash
# Iniciar ambos (recomendado)
npm run dev

# Ou separadamente:
npm run dev:backend    # Porta 3001
npm run dev:frontend   # Porta 3000
```

## 🌐 Acesso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 📁 Estrutura do Projeto

```
gerador-relatorio/
├── backend/           # API Node.js + Express
│   ├── server.js     # Servidor principal
│   ├── .env.example  # Exemplo de configuração
│   └── package.json
├── frontend/          # React App
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── hooks/      # Hooks personalizados
│   │   ├── pages/      # Páginas principais
│   │   ├── services/   # Serviços e API
│   │   └── styles/     # Estilos globais
│   ├── .env.example   # Exemplo de configuração
│   └── package.json
└── scripts/           # Scripts de automação
```

## 🛠️ Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia frontend + backend
npm run dev:frontend     # Apenas frontend
npm run dev:backend      # Apenas backend

# Build
npm run build:frontend   # Build de produção do frontend

# Configuração
npm run setup           # Configuração completa inicial
npm run install:all     # Instala todas as dependências
```

## 📝 Como Usar

1. **Dados do Paciente**: Preencha informações básicas
2. **Configuração**: Escolha o tipo de relatório e tom
3. **Anotações Técnicas**: Complete os campos específicos
4. **Resultado**: Visualize, edite e exporte o relatório

## 🔒 Segurança

- **Validação de Entrada**: Todos os inputs são validados e sanitizados
- **Rate Limiting**: Proteção contra uso abusivo da API
- **CORS Configurado**: Acesso controlado entre domínios
- **Timeout Protection**: Timeouts configurados para evitar travamentos
- **Logs Seguros**: Dados sensíveis não são logados

## 🚨 Resolução de Problemas

### Erro de API Key
```
❌ OPENAI_API_KEY não encontrada
```
**Solução**: Configure o arquivo `.env` no backend com sua chave válida da OpenAI.

### Erro de Conexão
```
Erro de conexão. Verifique sua internet
```
**Solução**: 
- Verifique se o backend está rodando na porta 3001
- Confirme sua conexão com internet
- Verifique se a chave da OpenAI é válida

### Cota Esgotada
```
Cota da API OpenAI esgotada
```
**Solução**: Verifique sua conta OpenAI e adicione créditos se necessário.

## 🔄 Atualizações

Para atualizar o projeto:
```bash
git pull origin main
npm run install:all
```

## 📊 Tipos de Relatórios Suportados

1. Relatório de Devolutiva
2. Relatório de Evolução  
3. Relatório de Anamnese
4. Relatório de Avaliação Psicológica Inicial
5. Relatório de Alta Terapêutica
6. Relatório de Avaliação de Personalidade
7. Relatório de Avaliação Neuropsicológica
8. Relatório de Acompanhamento Terapêutico
9. Relatório de Intervenção Comportamental
10. Relatório de Diagnóstico Psicológico
11. Relatório de Avaliação Emocional
12. Relatório para Escolas
13. Relatório de Avaliação Infantil
14. Relatório para Orientação Profissional
15. Relatório de Avaliação Familiar
16. Relatório de Sessão Terapêutica
17. Relatório de Feedback para Paciente e Família

## 🤝 Contribuição

Para contribuir com o projeto:
1. Faça um fork
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 🆘 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para profissionais de psicologia**