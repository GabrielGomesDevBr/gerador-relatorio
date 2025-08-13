import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Tooltip, 
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Divider
} from '@mui/material';
import { 
  Visibility, 
  Code, 
  ContentCopy, 
  CheckCircle 
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { stripMarkdown } from '../../utils/markdownUtils';

const MarkdownViewer = ({ content, title = "Visualização" }) => {
  const [viewMode, setViewMode] = useState('rendered'); // 'rendered' | 'plain' | 'raw'
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const textToCopy = viewMode === 'raw' ? content : stripMarkdown(content);
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'rendered':
        return (
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mt: 3, 
                    mb: 2, 
                    fontWeight: 600,
                    color: 'primary.main',
                    borderBottom: '2px solid',
                    borderColor: 'primary.light',
                    pb: 1
                  }}
                >
                  {children}
                </Typography>
              ),
              h3: ({ children }) => (
                <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                  {children}
                </Typography>
              ),
              p: ({ children }) => (
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 2, 
                    lineHeight: 1.7,
                    textAlign: 'justify'
                  }}
                >
                  {children}
                </Typography>
              ),
              strong: ({ children }) => (
                <Typography component="span" sx={{ fontWeight: 600 }}>
                  {children}
                </Typography>
              ),
              ul: ({ children }) => (
                <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                  {children}
                </Box>
              ),
              li: ({ children }) => (
                <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
                  {children}
                </Typography>
              )
            }}
          >
            {content}
          </ReactMarkdown>
        );
        
      case 'plain':
        return (
          <Typography 
            component="pre" 
            variant="body1" 
            sx={{ 
              whiteSpace: 'pre-wrap',
              fontFamily: 'inherit',
              lineHeight: 1.7,
              textAlign: 'justify'
            }}
          >
            {stripMarkdown(content)}
          </Typography>
        );
        
      case 'raw':
        return (
          <Typography 
            component="pre" 
            variant="body2" 
            sx={{ 
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              backgroundColor: 'grey.100',
              p: 2,
              borderRadius: 1,
              overflow: 'auto'
            }}
          >
            {content}
          </Typography>
        );
        
      default:
        return null;
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      {/* Header com controles */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" color="text.primary">
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, newMode) => newMode && setViewMode(newMode)}
            size="small"
          >
            <ToggleButton value="rendered">
              <Tooltip title="Visualização Formatada">
                <Visibility fontSize="small" />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="plain">
              <Tooltip title="Texto Puro (para copiar)">
                <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Aa</Typography>
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="raw">
              <Tooltip title="Código Markdown">
                <Code fontSize="small" />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
          
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          
          <Tooltip title={copied ? "Copiado!" : "Copiar texto"}>
            <IconButton onClick={handleCopy} color={copied ? "success" : "default"}>
              {copied ? <CheckCircle /> : <ContentCopy />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Conteúdo */}
      <Box 
        sx={{ 
          maxHeight: '60vh', 
          overflow: 'auto',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          p: 3,
          backgroundColor: viewMode === 'raw' ? 'grey.50' : 'background.paper'
        }}
      >
        {renderContent()}
      </Box>

      {/* Dica */}
      <Typography 
        variant="caption" 
        color="text.secondary" 
        sx={{ 
          mt: 2, 
          display: 'block',
          fontStyle: 'italic'
        }}
      >
        💡 Use "Texto Puro" para copiar sem formatação markdown
      </Typography>
    </Paper>
  );
};

export default MarkdownViewer;