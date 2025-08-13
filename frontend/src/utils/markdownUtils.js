// Utilitários para conversão de markdown

/**
 * Remove formatação markdown para texto puro (copy/paste e exportação)
 */
export const stripMarkdown = (markdown) => {
  if (!markdown) return '';
  
  return markdown
    // Remove títulos (## Título -> Título)
    .replace(/^#{1,6}\s+(.*)$/gm, '$1')
    
    // Remove negrito e itálico (**texto** -> texto, *texto* -> texto)  
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    
    // Remove links [texto](url) -> texto
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    
    // Remove código inline `código` -> código  
    .replace(/`([^`]+)`/g, '$1')
    
    // Remove blocos de código
    .replace(/```[\s\S]*?```/g, '')
    
    // Remove linhas horizontais
    .replace(/^-{3,}$/gm, '')
    .replace(/^_{3,}$/gm, '')
    .replace(/^\*{3,}$/gm, '')
    
    // Remove > quotes
    .replace(/^>\s+/gm, '')
    
    // Remove listas (* item -> item)
    .replace(/^[\s]*[-\*\+]\s+/gm, '• ')
    
    // Remove numeração de listas (1. item -> item)
    .replace(/^[\s]*\d+\.\s+/gm, '• ')
    
    // Limpa múltiplas quebras de linha
    .replace(/\n{3,}/g, '\n\n')
    
    // Remove espaços extras no início e fim
    .trim();
};

/**
 * Converte markdown para HTML simples (para visualização)  
 */
export const markdownToSimpleHtml = (markdown) => {
  if (!markdown) return '';
  
  return markdown
    // Títulos
    .replace(/^## (.*)$/gm, '<h2>$1</h2>')
    .replace(/^### (.*)$/gm, '<h3>$1</h3>')
    .replace(/^#### (.*)$/gm, '<h4>$1</h4>')
    
    // Negrito
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    
    // Itálico  
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    
    // Quebras de linha
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    
    // Wrap em parágrafos
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')
    
    // Corrige parágrafos vazios
    .replace(/<p><\/p>/g, '')
    .replace(/<p><h/g, '<h')
    .replace(/h[1-6]><\/p>/g, match => match.replace(/<\/p>/, ''));
};

/**
 * Prepara texto para exportação DOCX (remove markdown, mantém estrutura)
 */
export const prepareForDocx = (markdown) => {
  if (!markdown) return [];
  
  const lines = markdown.split('\n');
  const docxContent = [];
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    
    if (!trimmedLine) {
      // Linha vazia - adiciona espaço
      docxContent.push({ type: 'paragraph', content: '', style: 'normal' });
      return;
    }
    
    // Títulos
    if (trimmedLine.startsWith('## ')) {
      docxContent.push({
        type: 'heading',
        content: trimmedLine.substring(3),
        level: 2
      });
      return;
    }
    
    if (trimmedLine.startsWith('### ')) {
      docxContent.push({
        type: 'heading', 
        content: trimmedLine.substring(4),
        level: 3
      });
      return;
    }
    
    // Texto com formatação
    const processedContent = stripMarkdown(trimmedLine);
    
    // Verifica se é linha de assinatura
    if (trimmedLine.includes('___________')) {
      docxContent.push({
        type: 'signature',
        content: processedContent
      });
      return;
    }
    
    // Parágrafo normal
    docxContent.push({
      type: 'paragraph',
      content: processedContent,
      style: 'normal'
    });
  });
  
  return docxContent.filter(item => item.content !== '');
};