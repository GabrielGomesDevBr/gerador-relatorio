import React from 'react';
import { Paper, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { gradients } from '../../theme/modernTheme';

const AnimatedCard = ({ 
  children, 
  variant = 'default',
  hover = true,
  gradient = false,
  glassEffect = false,
  ...props 
}) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const getBackgroundStyle = () => {
    if (gradient === 'primary') return { background: gradients.primary };
    if (gradient === 'secondary') return { background: gradients.secondary };
    if (gradient === 'success') return { background: gradients.success };
    if (gradient === 'warm') return { background: gradients.warm };
    if (gradient === 'cool') return { background: gradients.cool };
    return {};
  };

  return (
    <Paper
      component={motion.div}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={hover ? "hover" : {}}
      {...(hover && { ...hoverVariants })}
      className={glassEffect ? 'glass-effect' : ''}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        cursor: hover ? 'pointer' : 'default',
        ...getBackgroundStyle(),
        '&::before': gradient ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          zIndex: 0,
        } : {},
        '& > *': {
          position: 'relative',
          zIndex: 1,
        },
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};

export default AnimatedCard;