import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Typography, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';

// Constantes com as opções dos menus
const GENEROS = ['Masculino', 'Feminino', 'Não-binário', 'Prefiro não especificar'];
const ABORDAGENS_TERAPEUTICAS = [
  'Terapia Cognitivo-Comportamental', 
  'Psicanálise', 
  'Terapia Humanista', 
  'Terapia Sistêmica', 
  'Terapia Integrativa', 
  'Terapia ABA', 
  'Gestalt-terapia', 
  'Terapia Analítica', 
  'Terapia Centrada na Pessoa', 
  'Terapia Comportamental'
];

const Step1_PatientData = ({ patientData, setPatientData, errors }) => {
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPatientData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newDate) => {
    setPatientData(prev => ({ ...prev, data_avaliacao: newDate }));
  };

  return (
    <Box component="div">
      <Typography variant="h5" sx={{ mb: 4, color: 'text.primary' }}>
        Informações do Paciente
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="nome"
            label="Nome completo do paciente"
            value={patientData.nome}
            onChange={handleChange}
            error={!!errors.nome}
            helperText={errors.nome}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="idade"
            label="Idade"
            type="number"
            value={patientData.idade}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Gênero</InputLabel>
            <Select name="genero" label="Gênero" value={patientData.genero} onChange={handleChange}>
              {GENEROS.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data da avaliação"
              value={patientData.data_avaliacao}
              onChange={handleDateChange}
              slotProps={{ textField: { fullWidth: true, variant: 'outlined' } }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" error={!!errors.abordagem_terapeutica}>
            <InputLabel>Abordagem terapêutica</InputLabel>
            <Select
              name="abordagem_terapeutica"
              label="Abordagem terapêutica"
              value={patientData.abordagem_terapeutica}
              onChange={handleChange}
            >
              {ABORDAGENS_TERAPEUTICAS.map((a) => <MenuItem key={a} value={a}>{a}</MenuItem>)}
            </Select>
            {errors.abordagem_terapeutica && <FormHelperText error>{errors.abordagem_terapeutica}</FormHelperText>}
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step1_PatientData;
