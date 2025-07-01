import React from 'react';
import { Grid, TextField, Box, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune'; // Ícone para o placeholder

const SPECIFIC_FIELDS_STRUCTURE = {
    devolutiva: [ { name: 'resultados_avaliacao', label: 'Resultados da Avaliação', multiline: true, rows: 4 }, { name: 'interpretacao', label: 'Interpretação dos Resultados', multiline: true, rows: 4 }, { name: 'recomendacoes', label: 'Recomendações', multiline: true, rows: 4 }, { name: 'recursos_utilizados', label: 'Recursos e Testes Utilizados', multiline: false } ],
    evolucao: [ { name: 'periodo_avaliado', label: 'Período Avaliado', multiline: false }, { name: 'objetivos_terapeuticos', label: 'Objetivos Terapêuticos', multiline: true, rows: 4 }, { name: 'progresso', label: 'Progresso Observado', multiline: true, rows: 4 }, { name: 'desafios', label: 'Desafios Encontrados', multiline: true, rows: 4 }, { name: 'estrategias', label: 'Estratégias Utilizadas', multiline: true, rows: 4 } ],
    anamnese: [ { name: 'queixa_principal', label: 'Queixa Principal', multiline: true, rows: 4 }, { name: 'historico_sintomas', label: 'Histórico dos Sintomas', multiline: true, rows: 4 }, { name: 'historico_familiar', label: 'Histórico Familiar', multiline: true, rows: 4 }, { name: 'historico_medico', label: 'Histórico Médico', multiline: true, rows: 4 }, { name: 'desenvolvimento', label: 'História do Desenvolvimento', multiline: true, rows: 4 } ],
    avaliacao_inicial: [ { name: 'demanda', label: 'Demanda Inicial', multiline: true, rows: 4 }, { name: 'sintomas_atuais', label: 'Sintomas Atuais', multiline: true, rows: 4 }, { name: 'historico_tratamentos', label: 'Histórico de Tratamentos', multiline: true, rows: 4 }, { name: 'suporte_social', label: 'Rede de Suporte Social', multiline: true, rows: 4 } ],
    alta: [ { name: 'motivo_alta', label: 'Motivo da Alta', multiline: true, rows: 4 }, { name: 'objetivos_alcancados', label: 'Objetivos Alcançados', multiline: true, rows: 4 }, { name: 'progresso_final', label: 'Progresso Final', multiline: true, rows: 4 }, { name: 'recomendacoes_futuras', label: 'Recomendações Futuras', multiline: true, rows: 4 } ],
    personalidade: [ { name: 'instrumentos_utilizados', label: 'Instrumentos de Avaliação Utilizados', multiline: true, rows: 4 }, { name: 'resultados_personalidade', label: 'Resultados da Avaliação de Personalidade', multiline: true, rows: 4 }, { name: 'perfil_psicologico', label: 'Perfil Psicológico', multiline: true, rows: 4 }, { name: 'implicacoes_praticas', label: 'Implicações Práticas', multiline: true, rows: 4 } ],
    neuropsicologica: [ { name: 'funcoes_avaliadas', label: 'Funções Cognitivas Avaliadas', multiline: true, rows: 4 }, { name: 'instrumentos_neuropsicologicos', label: 'Instrumentos Neuropsicológicos Utilizados', multiline: true, rows: 4 }, { name: 'resultados_cognitivos', label: 'Resultados por Função Cognitiva', multiline: true, rows: 4 }, { name: 'conclusao_diagnostica', label: 'Conclusão Diagnóstica', multiline: true, rows: 4 }, { name: 'recomendacoes_reabilitacao', label: 'Recomendações para Reabilitação', multiline: true, rows: 4 } ],
    acompanhamento: [ { name: 'periodo_acompanhamento', label: 'Período de Acompanhamento', multiline: false }, { name: 'objetivos_alcancados', label: 'Objetivos Alcançados', multiline: true, rows: 4 }, { name: 'evolucao_observada', label: 'Evolução Observada', multiline: true, rows: 4 }, { name: 'aspectos_relevantes', label: 'Aspectos Relevantes', multiline: true, rows: 4 }, { name: 'proximos_passos', label: 'Próximos Passos', multiline: true, rows: 4 } ],
    intervencao: [ { name: 'comportamentos_alvo', label: 'Comportamentos-Alvo', multiline: true, rows: 4 }, { name: 'estrategias_intervencao', label: 'Estratégias de Intervenção', multiline: true, rows: 4 }, { name: 'resultados_obtidos', label: 'Resultados Obtidos', multiline: true, rows: 4 }, { name: 'ajustes_necessarios', label: 'Ajustes Necessários', multiline: true, rows: 4 } ],
    diagnostico: [ { name: 'sintomas_apresentados', label: 'Sintomas Apresentados', multiline: true, rows: 4 }, { name: 'criterios_diagnosticos', label: 'Critérios Diagnósticos', multiline: true, rows: 4 }, { name: 'diagnostico_diferencial', label: 'Diagnóstico Diferencial', multiline: true, rows: 4 }, { name: 'conclusao_diagnostica', label: 'Conclusão Diagnóstica', multiline: true, rows: 4 }, { name: 'plano_tratamento', label: 'Plano de Tratamento', multiline: true, rows: 4 } ],
    emocional: [ { name: 'estado_emocional', label: 'Estado Emocional Atual', multiline: true, rows: 4 }, { name: 'fatores_estresse', label: 'Fatores de Estresse', multiline: true, rows: 4 }, { name: 'recursos_enfrentamento', label: 'Recursos de Enfrentamento', multiline: true, rows: 4 }, { name: 'suporte_social', label: 'Suporte Social', multiline: true, rows: 4 }, { name: 'recomendacoes', label: 'Recomendações', multiline: true, rows: 4 } ],
    escolar: [ { name: 'desempenho_academico', label: 'Desempenho Acadêmico', multiline: true, rows: 4 }, { name: 'comportamento_escolar', label: 'Comportamento em Ambiente Escolar', multiline: true, rows: 4 }, { name: 'relacoes_interpessoais', label: 'Relações Interpessoais', multiline: true, rows: 4 }, { name: 'necessidades_especificas', label: 'Necessidades Específicas', multiline: true, rows: 4 }, { name: 'recomendacoes_escola', label: 'Recomendações para a Escola', multiline: true, rows: 4 } ],
    infantil: [ { name: 'desenvolvimento_atual', label: 'Desenvolvimento Atual', multiline: true, rows: 4 }, { name: 'comportamento_observado', label: 'Comportamento Observado', multiline: true, rows: 4 }, { name: 'interacao_social', label: 'Interação Social', multiline: true, rows: 4 }, { name: 'aspectos_familiares', label: 'Aspectos Familiares', multiline: true, rows: 4 }, { name: 'recomendacoes_pais', label: 'Recomendações aos Pais', multiline: true, rows: 4 } ],
    profissional: [ { name: 'interesses_profissionais', label: 'Interesses Profissionais', multiline: true, rows: 4 }, { name: 'habilidades_identificadas', label: 'Habilidades Identificadas', multiline: true, rows: 4 }, { name: 'valores_trabalho', label: 'Valores Relacionados ao Trabalho', multiline: true, rows: 4 }, { name: 'areas_recomendadas', label: 'Áreas Recomendadas', multiline: true, rows: 4 }, { name: 'plano_desenvolvimento', label: 'Plano de Desenvolvimento', multiline: true, rows: 4 } ],
    familiar: [ { name: 'dinamica_familiar', label: 'Dinâmica Familiar', multiline: true, rows: 4 }, { name: 'padroes_relacionamento', label: 'Padrões de Relacionamento', multiline: true, rows: 4 }, { name: 'conflitos_identificados', label: 'Conflitos Identificados', multiline: true, rows: 4 }, { name: 'recursos_familiares', label: 'Recursos Familiares', multiline: true, rows: 4 }, { name: 'recomendacoes_familia', label: 'Recomendações para a Família', multiline: true, rows: 4 } ],
    sessao: [ { name: 'temas_abordados', label: 'Temas Abordados', multiline: true, rows: 4 }, { name: 'tecnicas_utilizadas', label: 'Técnicas Utilizadas', multiline: true, rows: 4 }, { name: 'respostas_paciente', label: 'Respostas do Paciente', multiline: true, rows: 4 }, { name: 'insights_obtidos', label: 'Insights Obtidos', multiline: true, rows: 4 }, { name: 'planejamento_proxima', label: 'Planejamento para Próxima Sessão', multiline: true, rows: 4 } ],
    feedback: [ { name: 'progresso_observado', label: 'Progresso Observado', multiline: true, rows: 4 }, { name: 'pontos_positivos', label: 'Pontos Positivos', multiline: true, rows: 4 }, { name: 'areas_desenvolvimento', label: 'Áreas para Desenvolvimento', multiline: true, rows: 4 }, { name: 'orientacoes_praticas', label: 'Orientações Práticas', multiline: true, rows: 4 }, { name: 'proximos_objetivos', label: 'Próximos Objetivos', multiline: true, rows: 4 } ]
};

const Step3_TechnicalNotes = ({ reportConfig, specificFieldsData, setSpecificFieldsData }) => {
  
  const currentSpecificFields = SPECIFIC_FIELDS_STRUCTURE[reportConfig.reportType] || [];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSpecificFieldsData(prev => ({ ...prev, [name]: value }));
  };

  if (currentSpecificFields.length === 0) {
    return (
      <Box sx={{
        my: 4,
        textAlign: 'center',
        p: 4,
        border: '2px dashed',
        borderColor: 'grey.300',
        borderRadius: 4,
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300
      }}>
        <TuneIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
          Selecione um Tipo de Relatório
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: '400px' }}>
          Volte ao passo anterior para escolher um modelo e ver os campos específicos para suas anotações aqui.
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="div">
        <Typography variant="h5" sx={{ mb: 4, color: 'text.primary' }}>
            Anotações Técnicas para o Relatório
        </Typography>
        <Grid container spacing={3}>
        {currentSpecificFields.map((field) => (
            <Grid item xs={12} key={field.name}>
            <TextField
                fullWidth
                variant="outlined"
                {...field}
                value={specificFieldsData[field.name] || ''}
                onChange={handleChange}
            />
            </Grid>
        ))}
        </Grid>
    </Box>
  );
};

export default Step3_TechnicalNotes;
