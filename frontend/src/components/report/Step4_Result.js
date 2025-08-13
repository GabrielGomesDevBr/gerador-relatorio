import React, { useState } from 'react';
import { Box, Typography, TextField, Stack, Button } from '@mui/material';
import { motion } from 'framer-motion';

// Ícones
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// Componentes personalizados
import MarkdownViewer from '../common/MarkdownViewer';
import AnimatedCard from '../common/AnimatedCard';
import { stripMarkdown } from '../../utils/markdownUtils';

const Step4_Result = ({
  generatedReport,
  setGeneratedReport,
  handleDownloadDocx,
  handleReset
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyText = () => {
    const textToCopy = stripMarkdown(generatedReport);
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }, (err) => {
      console.error('Falha ao copiar texto: ', err);
      alert('Não foi possível copiar o texto.');
    });
  };

  return (
    <Box>
      {/* Header de Sucesso com Animação */}
      <Box 
        component={motion.div}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        sx={{ textAlign: 'center', mb: 4 }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            borderRadius: '50%',
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 40, color: 'white' }} />
        </Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'success.main' }}>
          Relatório Concluído!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
          Seu relatório foi gerado com sucesso. Revise o conteúdo e faça ajustes se necessário antes de exportar.
        </Typography>
      </Box>
      
      {/* Área de Visualização e Edição */}
      {isEditing ? (
        <AnimatedCard sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
            ✏️ Modo de Edição
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={20}
            value={generatedReport}
            onChange={(e) => setGeneratedReport(e.target.value)}
            variant="outlined"
            placeholder="Digite seu relatório aqui..."
            sx={{
              '& .MuiOutlinedInput-root': {
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                backgroundColor: '#fafafa'
              }
            }}
          />
        </AnimatedCard>
      ) : (
        <MarkdownViewer 
          content={generatedReport} 
          title="📄 Visualização do Relatório"
        />
      )}

      {/* Botões de Ação */}
      <Box sx={{ mt: 4 }}>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          justifyContent="center"
          alignItems="center"
        >
          <Button 
            onClick={handleReset} 
            variant="text" 
            color="secondary" 
            startIcon={<RestartAltIcon />}
            sx={{ minWidth: '140px' }}
          >
            Criar Novo
          </Button>
          
          <Button 
            onClick={() => setIsEditing(!isEditing)} 
            variant="outlined" 
            color="primary" 
            startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
            sx={{ minWidth: '140px' }}
          >
            {isEditing ? "Salvar Edição" : "Editar Texto"}
          </Button>
          
          <Button 
            onClick={handleCopyText} 
            color={copySuccess ? "success" : "primary"} 
            variant="outlined" 
            startIcon={copySuccess ? <CheckCircleOutlineIcon /> : <ContentCopyIcon />}
            sx={{ minWidth: '140px' }}
          >
            {copySuccess ? "Copiado!" : "Copiar Texto"}
          </Button>
          
          <Button 
            onClick={handleDownloadDocx} 
            variant="contained" 
            startIcon={<DownloadIcon />}
            size="large"
            sx={{ 
              minWidth: '160px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)'
              }
            }}
          >
            Download DOCX
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Step4_Result;
