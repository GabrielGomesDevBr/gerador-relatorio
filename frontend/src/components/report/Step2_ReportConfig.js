import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText, Typography, Box } from '@mui/material';

// Constantes com as opções dos menus
const REPORT_TYPES = {
  "Relatório de Devolutiva": "devolutiva", "Relatório de Evolução": "evolucao", "Relatório de Anamnese": "anamnese",
  "Relatório de Avaliação Psicológica Inicial": "avaliacao_inicial", "Relatório de Alta Terapêutica": "alta",
  "Relatório de Avaliação de Personalidade": "personalidade", "Relatório de Avaliação Neuropsicológica": "neuropsicologica",
  "Relatório de Acompanhamento Terapêutico": "acompanhamento", "Relatório de Intervenção Comportamental": "intervencao",
  "Relatório de Diagnóstico Psicológico": "diagnostico", "Relatório de Avaliação Emocional": "emocional",
  "Relatório para Escolas": "escolar", "Relatório de Avaliação Infantil": "infantil",
  "Relatório de Avaliação para Orientação Profissional": "profissional", "Relatório de Avaliação Familiar": "familiar",
  "Relatório de Sessão Terapêutica": "sessao", "Relatório de Feedback para o Paciente e Família": "feedback"
};

const TONE_DESCRIPTIONS = {
  "Tom Formal e Técnico": "Use linguagem técnica e profissional, priorizando termos científicos e mantendo um tom objetivo e formal.",
  "Tom Acessível e Didático": "Use linguagem clara e acessível, explicando conceitos técnicos de forma didática e compreensível.",
  "Tom Colaborativo e Empático": "Use linguagem acolhedora e empática, mantendo o profissionalismo mas priorizando a conexão humana."
};

const Step2_ReportConfig = ({ reportConfig, setReportConfig, errors }) => {
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setReportConfig(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box component="div">
        <Typography variant="h5" sx={{ mb: 4, color: 'text.primary' }}>
            Defina o Estilo do Relatório
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined" error={!!errors.reportType}>
                <InputLabel>Tipo de Relatório</InputLabel>
                <Select
                    name="reportType"
                    label="Tipo de Relatório"
                    value={reportConfig.reportType}
                    onChange={handleChange}
                >
                    {Object.entries(REPORT_TYPES).map(([label, value]) => (
                    <MenuItem key={value} value={value}>{label}</MenuItem>
                    ))}
                </Select>
                {errors.reportType && <FormHelperText error>{errors.reportType}</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined" error={!!errors.tone}>
                <InputLabel>Tom do Relatório</InputLabel>
                <Select
                    name="tone"
                    label="Tom do Relatório"
                    value={reportConfig.tone}
                    onChange={handleChange}
                >
                    {Object.keys(TONE_DESCRIPTIONS).map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </Select>
                {errors.tone && <FormHelperText error>{errors.tone}</FormHelperText>}
                </FormControl>
            </Grid>
            {reportConfig.tone && (
                <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, pl: 1 }}>
                        {TONE_DESCRIPTIONS[reportConfig.tone]}
                    </Typography>
                </Grid>
            )}
        </Grid>
    </Box>
  );
};

export default Step2_ReportConfig;
