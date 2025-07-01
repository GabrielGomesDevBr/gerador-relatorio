import React, { useState } from 'react';
import { Box, Typography, TextField, Stack, Button, Paper } from '@mui/material';
import ReactMarkdown from 'react-markdown';

// Ícones
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const Step4_Result = ({
  generatedReport,
  setGeneratedReport,
  handleDownloadDocx,
  handleReset
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatedReport).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }, (err) => {
      console.error('Falha ao copiar texto: ', err);
      alert('Não foi possível copiar o texto.');
    });
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Relatório Gerado com Sucesso!
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Revise o rascunho gerado pela IA. Você pode editar o texto abaixo antes de exportar.
      </Typography>
      
      {/* Área de Visualização e Edição */}
      <Paper 
        variant="outlined"
        sx={{ 
            p: 3, 
            mb: 4, 
            textAlign: 'left', 
            minHeight: '400px', 
            backgroundColor: isEditing ? '#fff' : '#F8F9FA',
            borderColor: isEditing ? 'primary.main' : 'grey.300',
            transition: 'all 0.3s ease',
        }}
      >
        {isEditing ? (
          <TextField
            fullWidth
            multiline
            rows={20}
            value={generatedReport}
            onChange={(e) => setGeneratedReport(e.target.value)}
            variant="standard" // Usar standard para um look mais limpo dentro do Paper
            InputProps={{
                disableUnderline: true,
                sx: { 
                    lineHeight: 1.8, 
                    fontSize: '1rem', 
                    fontFamily: '"Source Serif Pro", serif',
                    color: 'text.primary'
                }
            }}
          />
        ) : (
          <ReactMarkdown
            components={{
              h2: ({node, ...props}) => <Typography variant="h5" sx={{ my: 2, fontWeight: 600 }} {...props} />,
              p: ({node, ...props}) => <Typography variant="body1" sx={{ mb: 1.5, lineHeight: 1.7 }} {...props} />,
              strong: ({node, ...props}) => <Typography component="span" sx={{ fontWeight: 'bold' }} {...props} />,
            }}
          >
            {generatedReport}
          </ReactMarkdown>
        )}
      </Paper>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
        <Button onClick={handleReset} variant="text" color="secondary" startIcon={<RestartAltIcon />}>
          Criar Novo
        </Button>
        <Button onClick={() => setIsEditing(!isEditing)} variant="outlined" color="primary" startIcon={isEditing ? <SaveIcon /> : <EditIcon />}>
            {isEditing ? "Salvar Edição" : "Editar Texto"}
        </Button>
        <Button onClick={handleCopyText} color={copySuccess ? "success" : "primary"} variant="outlined" startIcon={copySuccess ? <CheckCircleOutlineIcon /> : <ContentCopyIcon />}>
          {copySuccess ? "Copiado!" : "Copiar Texto"}
        </Button>
        <Button onClick={handleDownloadDocx} variant="contained" startIcon={<DownloadIcon />}>
          Download (.docx)
        </Button>
      </Stack>
    </Box>
  );
};

export default Step4_Result;
