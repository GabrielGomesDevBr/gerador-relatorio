import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const GradientBackground = ({ children, variant = 'default' }) => {
  const backgroundVariants = {
    default: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    primary: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
    },
    warm: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    cool: {
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    success: {
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    },
    minimal: {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    },
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      sx={{
        position: 'relative',
        minHeight: '100vh',
        ...backgroundVariants[variant],
        '&::before': {
          content: '\"\"',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url(\"data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '\"\"',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
          pointerEvents: 'none',
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default GradientBackground;