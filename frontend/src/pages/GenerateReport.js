import React, { useState, useEffect } from 'react';

// Imports de componentes do Material-UI e Framer Motion
import {
  Box, Typography, Stepper, Step, StepLabel, Button,
  CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions,
  LinearProgress, Chip, Container, Stack
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import RestoreIcon from '@mui/icons-material/Restore';
import SaveIcon from '@mui/icons-material/Save';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

// Bibliotecas e componentes auxiliares
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

// Serviços e hooks personalizados
import { generateReport } from '../services/api';
import { useFormPersistence, hasStoredData } from '../hooks/useLocalStorage';
import NotificationSnackbar from '../components/common/NotificationSnackbar';
import AnimatedCard from '../components/common/AnimatedCard';
import FloatingActionButton from '../components/common/FloatingActionButton';

// Utilitários
import { prepareForDocx } from '../utils/markdownUtils';

// Importando os componentes de cada passo
import Step1PatientData from '../components/report/Step1_PatientData';
import Step2ReportConfig from '../components/report/Step2_ReportConfig';
import Step3TechnicalNotes from '../components/report/Step3_TechnicalNotes';
import Step4Result from '../components/report/Step4_Result';


const steps = ['Dados do Paciente', 'Configuração do Relatório', 'Anotações Técnicas', 'Resultado'];

function GenerateReport() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState('');
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success', title: null });
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  
  // Usando persistência local
  const {
    patientData,
    setPatientData,
    reportConfig,
    setReportConfig,
    specificFieldsData,
    setSpecificFieldsData,
    generatedReport,
    setGeneratedReport,
    clearAllData
  } = useFormPersistence();

  // Verifica se há dados salvos ao carregar
  useEffect(() => {
    if (hasStoredData() && activeStep === 0) {
      setSnackbar({
        open: true,
        message: 'Dados anteriores encontrados. Clique em "Restaurar" para continuar de onde parou.',
        severity: 'info',
        title: 'Dados Salvos Encontrados'
      });
    }
  }, [activeStep]);

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
    return `# INSTRUÇÕES PARA O ASSISTENTE DE IA\n\n## PERSONA E PERSPECTIVA\nVocê É o(a) psicólogo(a) clínico(a) responsável por este paciente. Escreva o relatório em PRIMEIRA PESSOA, como se você fosse o profissional que conduziu a avaliação/atendimento. Use linguagem técnica precisa, formal e baseada em evidências. A abordagem terapêutica utilizada é "${patientData.abordagem_terapeutica}".\n\n## OBJETIVO\nRedigir um "${reportTitle}" utilizando o tom "${reportConfig.tone}", baseando-se nas suas anotações clínicas e observações diretas do paciente.\n\n## DADOS CLÍNICOS\n### INFORMAÇÕES DO PACIENTE\n- Nome: ${patientData.nome} (Use apenas as iniciais "${getPatientInitials(patientData.nome)}" no corpo do relatório)\n- Idade: ${patientData.idade} anos\n- Gênero: ${patientData.genero}\n- Data da avaliação: ${patientData.data_avaliacao.toLocaleDateString('pt-BR')}\n\n### SUAS ANOTAÇÕES CLÍNICAS\n${therapistNotes}\n\n## ESTRUTURA OBRIGATÓRIA\nO relatório DEVE seguir esta estrutura, escrito em PRIMEIRA PESSOA:\n\n1. **IDENTIFICAÇÃO**: Dados básicos do paciente\n2. **ANÁLISE DA DEMANDA**: Descreva a queixa e motivos que levaram à avaliação\n3. **PROCEDIMENTOS**: Liste procedimentos e instrumentos que você utilizou\n4. **ANÁLISE DOS RESULTADOS**: Sua análise técnica baseada nas observações e dados coletados\n5. **CONCLUSÃO E ENCAMINHAMENTOS**: Suas conclusões e recomendações profissionais\n\n## DIRETRIZES TÉCNICAS OBRIGATÓRIAS:\n- **PRIMEIRA PESSOA**: Use "observei", "avaliei", "concluo", "recomendo"\n- **NÃO referencie "o terapeuta"**: VOCÊ é o terapeuta\n- **EVIDÊNCIAS**: Base tudo nas suas anotações - não invente informações\n- **ÉTICA**: Não emita diagnósticos definitivos sem base adequada\n- **FORMATAÇÃO**: Use Markdown com títulos ## para seções\n\n## EXEMPLOS DE LINGUAGEM:\n✅ CORRETO: "Durante a avaliação, observei..."\n✅ CORRETO: "Com base nos procedimentos realizados, concluo..."\n❌ INCORRETO: "De acordo com o terapeuta..."\n❌ INCORRETO: "O profissional observou..."\n\n## RELATÓRIO\n---\nInicie o relatório agora, seguindo todas as diretrizes acima:`;
  };

  const handleGenerateReport = async () => {
    setIsLoading(true);
    setGeneratedReport('');
    setLoadingProgress('Preparando solicitação...');
    
    const prompt = createProfessionalPrompt();
    
    try {
      const response = await generateReport(prompt, setLoadingProgress);
      
      if (!response.report) {
        throw new Error('Relatório vazio recebido do servidor');
      }
      
      const reportWithSignature = `${response.report}\n\n\n___________________________________\n**Nome do Psicólogo(a)**\nCRP: [Número do CRP]`;
      setGeneratedReport(reportWithSignature);
      
      setSnackbar({
        open: true,
        message: `Relatório gerado com sucesso! ${response.metadata?.tokens ? `(${response.metadata.tokens} tokens)` : ''}`,
        severity: 'success',
        title: '✅ Concluído'
      });
      
      setActiveStep(prev => prev + 1);
      
    } catch (error) {
      console.error('Erro na geração:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Falha ao gerar o relatório. Tente novamente.',
        severity: 'error',
        title: '❌ Erro na Geração'
      });
    } finally {
      setIsLoading(false);
      setLoadingProgress('');
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
    clearAllData();
    setErrors({});
    setSnackbar({
      open: true,
      message: 'Todos os dados foram limpos. Começando novo relatório.',
      severity: 'info',
      title: '🔄 Reiniciado'
    });
  };

  const handleRestoreData = () => {
    setShowRestoreDialog(false);
    // Os dados já estão restaurados pelo hook, só precisamos navegar
    if (generatedReport) {
      setActiveStep(3); // Vai direto para o resultado
    } else if (Object.keys(specificFieldsData).length > 0) {
      setActiveStep(2); // Vai para anotações técnicas
    } else if (reportConfig.reportType) {
      setActiveStep(1); // Vai para configuração
    }
    setSnackbar({
      open: true,
      message: 'Dados restaurados com sucesso!',
      severity: 'success',
      title: '📋 Dados Restaurados'
    });
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
    <>
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <AnimatedCard 
        glassEffect 
        sx={{ 
          p: { xs: 3, md: 6 }, 
          background: 'rgba(255, 255, 255, 0.9)', 
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}
      >
          {/* Header com Gradiente */}
          <Box 
            sx={{ 
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              borderRadius: 3,
              p: 4,
              mb: 4,
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M20 20c0-11.046-8.954-20-20-20v20h20z"/%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.1
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="h4" sx={{ mb: 1, fontWeight: 800, color: 'white' }}>
                    🧠 PsicoIA Pro
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
                    Assistente Inteligente para Relatórios Psicológicos
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  {hasStoredData() && (
                    <Chip
                      icon={<SaveIcon />}
                      label="Dados Salvos"
                      variant="outlined"
                      size="small"
                      onClick={() => setShowRestoreDialog(true)}
                      clickable
                      sx={{ 
                        borderColor: 'rgba(255,255,255,0.3)', 
                        color: 'white',
                        '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
                      }}
                    />
                  )}
                  <Chip
                    icon={<RestoreIcon />}
                    label="Reiniciar"
                    variant="outlined"
                    size="small"
                    onClick={handleReset}
                    clickable
                    sx={{ 
                      borderColor: 'rgba(255,255,255,0.3)', 
                      color: 'white',
                      '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                  />
                </Stack>
              </Box>
              <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: '600px' }}>
                Siga os passos para criar um documento profissional de forma guiada com o poder da inteligência artificial.
              </Typography>
            </Box>
          </Box>
          
          {/* Stepper Modernizado */}
          <Box sx={{ mb: 5 }}>
            <Stepper 
              activeStep={activeStep} 
              alternativeLabel 
              sx={{ 
                '& .MuiStepConnector-line': {
                  borderTopWidth: 3,
                  borderColor: 'divider'
                }
              }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      '& .MuiStepLabel-label': {
                        fontWeight: activeStep === index ? 600 : 400,
                        color: activeStep === index ? 'primary.main' : 'text.secondary'
                      }
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

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
          
          {/* Loading Progress */}
          {isLoading && (
            <Box sx={{ mt: 3, mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {loadingProgress || 'Processando...'}
              </Typography>
              <LinearProgress />
            </Box>
          )}
          
          {activeStep < steps.length - 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5, pt: 3, borderTop: '1px solid #ECEFF1' }}>
              <Button disabled={activeStep === 0 || isLoading} onClick={handleBack} sx={{ mr: 1 }} color="secondary">
                Voltar
              </Button>
              <Button variant="contained" onClick={handleNext} disabled={isLoading}>
                {isLoading && activeStep === steps.length - 2 ? (
                  <><CircularProgress size={20} color="inherit" sx={{ mr: 1 }} /> Gerando...</>
                ) : (
                  activeStep === steps.length - 2 ? 'Gerar Relatório' : 'Próximo'
                )}
              </Button>
            </Box>
          )}
        </AnimatedCard>
      
        {/* Floating Action Button para Ajuda */}
        <FloatingActionButton
          icon={<AutoFixHighIcon />}
          tooltip="Assistente IA"
          variant="primary"
          pulse={activeStep === 0}
          onClick={() => setSnackbar({
            open: true,
            message: 'Dica: Preencha todos os campos obrigatórios para ter um relatório mais completo!',
            severity: 'info',
            title: '💡 Dica do Assistente'
          })}
        />
      </Container>

      {/* Dialog de Restauração */}
      <Dialog open={showRestoreDialog} onClose={() => setShowRestoreDialog(false)}>\n        <DialogTitle>Restaurar Dados Salvos</DialogTitle>
        <DialogContent>
          <Typography>
            Encontramos dados salvos de uma sessão anterior. Deseja restaurá-los?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRestoreDialog(false)}>Cancelar</Button>
          <Button onClick={handleRestoreData} variant="contained">Restaurar</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar de Notificações */}
      <NotificationSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
        title={snackbar.title}
      />
    </>
  );
}

export default GenerateReport;
