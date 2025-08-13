import React from 'react';
import { Fab, Tooltip, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { gradients } from '../../theme/modernTheme';

const FloatingActionButton = ({ 
  icon, 
  onClick, 
  tooltip,
  variant = 'primary',
  position = { bottom: 24, right: 24 },
  pulse = false,
  ...props 
}) => {
  const getBackground = () => {
    switch (variant) {
      case 'primary': return gradients.primary;
      case 'secondary': return gradients.secondary;
      case 'success': return gradients.success;
      case 'warm': return gradients.warm;
      case 'cool': return gradients.cool;
      default: return gradients.primary;
    }
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <Tooltip title={tooltip} placement="left">
      <Box
        component={motion.div}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: 1, 
          rotate: 0,
          ...(pulse ? pulseAnimation : {})
        }}
        whileHover={{ 
          scale: 1.1,
          rotate: 5,
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)"
        }}
        whileTap={{ scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        sx={{
          position: 'fixed',
          zIndex: 1300,
          ...position
        }}
      >
        <Fab
          onClick={onClick}
          sx={{
            background: getBackground(),
            color: 'white',
            '&:hover': {
              background: getBackground(),
              transform: 'none', // Anulamos o transform padrão do MUI
            },
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
          }}
          {...props}
        >
          {icon}
        </Fab>
      </Box>
    </Tooltip>
  );
};

export default FloatingActionButton;