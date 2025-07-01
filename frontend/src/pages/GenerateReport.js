import React, { useState } from 'react';

// Imports de componentes do Material-UI e Framer Motion
import {
  Box, Typography, Stepper, Step, StepLabel, Button, Paper,
  CircularProgress, Snackbar, Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

// Bibliotecas e componentes auxiliares
import axios from 'axios';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

// Importando os componentes de cada passo
import Step1PatientData from '../components/report/Step1_PatientData';
import Step2ReportConfig from '../components/report/Step2_ReportConfig';
import Step3TechnicalNotes from '../components/report/Step3_TechnicalNotes';
import Step4Result from '../components/report/Step4_Result';

// --- NOVO TEMA INSPIRADO NA IMAGEM ---
const modernTheme = createTheme({
  palette: {
    primary: {
      main: '#7C5DFA', // Um lilás vibrante e moderno
      light: '#9575CD',
      dark: '#5E35B1',
    },
    secondary: {
      main: '#90A4AE', // Um cinza azulado para ações secundárias
    },
    background: {
      default: '#F8F9FA', // Fundo geral levemente acinzentado
      paper: '#FFFFFF',    // Fundo dos cards branco puro
    },
    text: {
      primary: '#263238',   // Cor de texto principal (quase preto)
      secondary: '#546E7A', // Cor de texto secundário
    },
    success: {
      main: '#2ECC71', // Verde mais suave para sucesso
    },
    error: {
      main: '#EF5350', // Vermelho para erros
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#263238',
    },
    h5: {
      fontWeight: 600,
      color: '#37474F',
    },
    body1: {
      color: '#455A64',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16, // Bordas mais arredondadas
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.07)', // Sombra mais suave
          padding: '40px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
        },
        containedPrimary: {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(124, 93, 250, 0.4)',
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: '#CFD8DC', // Cor inativa
          '&.Mui-active': {
            color: '#7C5DFA', // Cor ativa (lilás)
          },
          '&.Mui-completed': {
            color: '#2ECC71', // Cor de sucesso (verde)
          },
        },
      },
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                backgroundColor: '#F8F9FA',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#7C5DFA',
                },
            },
        }
    },
    MuiSelect: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                backgroundColor: '#F8F9FA',
            }
        }
    }
  },
});

const steps = ['Dados do Paciente', 'Configuração do Relatório', 'Anotações Técnicas', 'Resultado'];

function GenerateReport() {
  const [activeStep, setActiveStep] = useState(0);
  const [patientData, setPatientData] = useState({ nome: '', idade: '', genero: '', data_avaliacao: new Date(), abordagem_terapeutica: '' });
  const [reportConfig, setReportConfig] = useState({ reportType: '', tone: '' });
  const [specificFieldsData, setSpecificFieldsData] = useState({});
  const [generatedReport, setGeneratedReport] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const validateStep = () => {
    const newErrors = {};
    if (activeStep === 0) {
      if (!patientData.nome.trim()) newErrors.nome = "O nome é obrigatório.";
      if (!patientData.abordagem_terapeutica) newErrors.abordagem_terapeutica = "A abordagem é obrigatória.";
    }
    if (activeStep === 1) {
      if (!reportConfig.reportType) newErrors.reportType = "O tipo de relatório é obrigatório.";
      if (!reportConfig.tone) newErrors.tone = "O tom do relatório é obrigatório.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createProfessionalPrompt = () => {
    const REPORT_TYPES = { "Relatório de Devolutiva": "devolutiva", "Relatório de Evolução": "evolucao", "Relatório de Anamnese": "anamnese", "Relatório de Avaliação Psicológica Inicial": "avaliacao_inicial", "Relatório de Alta Terapêutica": "alta", "Relatório de Avaliação de Personalidade": "personalidade", "Relatório de Avaliação Neuropsicológica": "neuropsicologica", "Relatório de Acompanhamento Terapêutico": "acompanhamento", "Relatório de Intervenção Comportamental": "intervencao", "Relatório de Diagnóstico Psicológico": "diagnostico", "Relatório de Avaliação Emocional": "emocional", "Relatório para Escolas": "escolar", "Relatório de Avaliação Infantil": "infantil", "Relatório de Avaliação para Orientação Profissional": "profissional", "Relatório de Avaliação Familiar": "familiar", "Relatório de Sessão Terapêutica": "sessao", "Relatório de Feedback para o Paciente e Família": "feedback" };
    const reportTitle = Object.keys(REPORT_TYPES).find(key => REPORT_TYPES[key] === reportConfig.reportType);
    const getPatientInitials = (name) => {
        if (!name.trim()) return '';
        const names = name.split(' ').filter(n => n);
        if (names.length === 1) return names[0].charAt(0).toUpperCase();
        return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    };
    const therapistNotes = Object.entries(specificFieldsData).map(([key, value]) => `- ${key.replace(/_/g, ' ')}: ${value}`).join('\n');
    return `# INSTRUÇÕES PARA O ASSISTENTE DE IA\n\n## PERSONA\nAja como um(a) psicólogo(a) clínico(a) sênior, com vasta experiência na elaboração de laudos e relatórios técnicos. Sua linguagem deve ser precisa, formal e baseada em evidências. A abordagem terapêutica a ser considerada é a(o) "${patientData.abordagem_terapeutica}".\n\n## OBJETIVO\nSeu objetivo é redigir um "${reportTitle}", utilizando o tom de "${reportConfig.tone}", a partir dos dados brutos fornecidos pelo terapeuta responsável.\n\n## DADOS BRUTOS\n### DADOS DO PACIENTE\n- Nome: ${patientData.nome} (Use apenas as iniciais "${getPatientInitials(patientData.nome)}" no corpo do relatório para garantir a confidencialidade)\n- Idade: ${patientData.idade} anos\n- Gênero: ${patientData.genero}\n- Data da avaliação: ${patientData.data_avaliacao.toLocaleDateString('pt-BR')}\n\n### ANOTAÇÕES DO TERAPEUTA\n${therapistNotes}\n\n## ESTRUTURA OBRIGATÓRIA DO RELATÓRIO\nO relatório DEVE seguir RIGOROSAMENTE a seguinte estrutura de seções, com os títulos em negrito:\n1.  **IDENTIFICAÇÃO**: Resumo dos dados do paciente (iniciais, idade, gênero, data da avaliação).\n2.  **ANÁLISE DA DEMANDA**: Descrever a queixa principal e o motivo da avaliação com base nas anotações do terapeuta.\n3.  **PROCEDIMENTOS**: Listar os procedimentos e instrumentos utilizados, se informado nas anotações.\n4.  **ANÁLISE DOS RESULTADOS**: Sintetizar e elaborar sobre TODAS as anotações do terapeuta, conectando os pontos e criando uma narrativa coesa e técnica. Esta é a seção principal do relatório.\n5.  **CONCLUSÃO E ENCAMINHAMENTOS**: Apresentar uma conclusão sucinta baseada na análise e listar as recomendações ou encaminhamentos sugeridos.\n\n## REGRAS DE OURO (NÃO QUEBRAR):\n- **NÃO FAÇA DIAGNÓSTICOS**: Apenas descreva os sintomas e, se apropriado, apresente hipóteses diagnósticas.\n- **NÃO ALUCINE**: Baseie 100% do seu texto nas informações fornecidas. Se um dado não foi fornecido, não o invente.\n- **NÃO OPINE**: Mantenha a objetividade. Não emita juízos de valor sobre o paciente.\n- **FORMATAÇÃO**: Use Markdown. Use títulos de nível 2 (##) para cada seção principal.\n\n## RELATÓRIO FINAL\n---\n(Comece a gerar o relatório a partir daqui, seguindo todas as instruções acima e finalizando com um local para assinatura do psicólogo)`;
  };

  const handleGenerateReport = async () => {
    setIsLoading(true);
    setGeneratedReport('');
    const prompt = createProfessionalPrompt();
    try {
      const response = await axios.post('http://localhost:3001/api/generate-report', { prompt });
      const reportWithSignature = `${response.data.report}\n\n\n___________________________________\n**Nome do Psicólogo(a)**\nCRP: [Número do CRP]`;
      setGeneratedReport(reportWithSignature);
      setActiveStep(prev => prev + 1);
    } catch (error) {
      setSnackbar({ open: true, message: 'Falha ao gerar o relatório. Tente novamente.', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === steps.length - 2) {
        handleGenerateReport();
      } else {
        setActiveStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => { setErrors({}); setActiveStep(prev => prev - 1); };
  
  const handleReset = () => {
    setActiveStep(0);
    setPatientData({ nome: '', idade: '', genero: '', data_avaliacao: new Date(), abordagem_terapeutica: '' });
    setReportConfig({ reportType: '', tone: '' });
    setSpecificFieldsData({});
    setGeneratedReport('');
    setErrors({});
  };
  
  const handleDownloadDocx = () => {
    if (!generatedReport) return;
    const paragraphs = generatedReport.split('\n').map(text => {
      if (text.startsWith('## ')) { return new Paragraph({ children: [new TextRun({ text: text.substring(3).trim(), bold: true, size: 28 })], heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 } }); }
      const children = text.split(/(\*\*.*?\*\*)/g).map(part => {
        if (part.startsWith('**') && part.endsWith('**')) { return new TextRun({ text: part.slice(2, -2), bold: true }); }
        return new TextRun(part);
      });
      if (text.startsWith('___________________')) { return new Paragraph({ children: [new TextRun(text)], alignment: AlignmentType.CENTER }); }
      return new Paragraph({ children });
    });
    const doc = new Document({ sections: [{ properties: {}, children: paragraphs }], });
    const filename = `relatorio_${reportConfig.reportType}_${new Date().toISOString().slice(0, 10)}.docx`;
    Packer.toBlob(doc).then(blob => { saveAs(blob, filename); });
  };

  const getStepContent = (step) => {
    switch(step) {
      case 0:
        return <Step1PatientData patientData={patientData} setPatientData={setPatientData} errors={errors} />;
      case 1:
        return <Step2ReportConfig reportConfig={reportConfig} setReportConfig={setReportConfig} errors={errors} />;
      case 2:
        return <Step3TechnicalNotes reportConfig={reportConfig} specificFieldsData={specificFieldsData} setSpecificFieldsData={setSpecificFieldsData} />;
      case 3:
        return <Step4Result generatedReport={generatedReport} setGeneratedReport={setGeneratedReport} handleReset={handleReset} handleDownloadDocx={handleDownloadDocx} />;
      default:
        return <Typography>Passo não encontrado</Typography>;
    }
  };

  return (
    <ThemeProvider theme={modernTheme}>
      <Box sx={{ maxWidth: '900px', mx: 'auto', py: { xs: 4, md: 8 } }}>
        <Paper>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 1 }}>
            Assistente de Relatórios Psicológicos
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 5 }}>
            Siga os passos para criar um documento profissional de forma guiada.
          </Typography>
          
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
            {steps.map(label => (<Step key={label}><StepLabel>{label}</StepLabel></Step>))}
          </Stepper>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {getStepContent(activeStep)}
            </motion.div>
          </AnimatePresence>
          
          {activeStep < steps.length - 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5, pt: 3, borderTop: '1px solid #ECEFF1' }}>
              <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }} color="secondary">
                Voltar
              </Button>
              <Button variant="contained" onClick={handleNext} disabled={isLoading}>
                {isLoading && activeStep === steps.length - 2 ? <CircularProgress size={24} color="inherit" /> : (activeStep === steps.length - 2 ? 'Gerar Relatório' : 'Próximo')}
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })} >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }} variant="filled" elevation={6}>
            {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default GenerateReport;
