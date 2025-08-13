import { createTheme } from '@mui/material/styles';

// Paleta de cores moderna e profissional
const colors = {
  primary: {
    50: '#f0f4ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1', // Cor principal - Indigo vibrante
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  secondary: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef', // Rosa/Purple moderno
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  }
};

// Gradientes modernos
export const gradients = {
  primary: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  secondary: 'linear-gradient(135deg, #d946ef 0%, #f59e0b 100%)',
  success: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
  warm: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  cool: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
  glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  dark: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
};

export const modernTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      ...colors.primary,
      main: colors.primary[500],
    },
    secondary: {
      ...colors.secondary,
      main: colors.secondary[500],
    },
    success: {
      ...colors.success,
      main: colors.success[500],
    },
    warning: {
      ...colors.warning,
      main: colors.warning[500],
    },
    error: {
      ...colors.error,
      main: colors.error[500],
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[600],
    },
    divider: colors.neutral[200],
  },
  
  typography: {
    fontFamily: '\"Inter\", \"SF Pro Display\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: colors.neutral[700],
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: colors.neutral[600],
    },
  },

  shape: {
    borderRadius: 12,
  },

  shadows: [
    'none',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  ],

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * {
          box-sizing: border-box;
        }
        
        body {
          background: linear-gradient(135deg, #fafafa 0%, #f4f4f5 100%);
          min-height: 100vh;
        }
        
        /* Scrollbar moderna */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${colors.neutral[100]};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${colors.neutral[300]};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${colors.neutral[400]};
        }
      `,
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: `1px solid ${colors.neutral[200]}`,
          '&.glass-effect': {
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            border: `1px solid rgba(255, 255, 255, 0.2)`,
          }
        },
        elevation1: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        elevation2: {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 20px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: gradients.primary,
          '&:hover': {
            background: gradients.primary,
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
          },
        },
        containedSecondary: {
          background: gradients.secondary,
          '&:hover': {
            background: gradients.secondary,
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 30px rgba(217, 70, 239, 0.4)',
          },
        },
        outlinedPrimary: {
          borderColor: colors.primary[300],
          '&:hover': {
            borderColor: colors.primary[500],
            backgroundColor: colors.primary[50],
          },
        },
      },
    },

    MuiStepper: {
      styleOverrides: {
        root: {
          background: 'transparent',
        },
      },
    },

    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: colors.neutral[300],
          fontSize: '1.5rem',
          '&.Mui-active': {
            color: colors.primary[500],
          },
          '&.Mui-completed': {
            color: colors.success[500],
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          },
          '&.Mui-focused': {
            backgroundColor: '#ffffff',
            boxShadow: `0 0 0 3px ${colors.primary[100]}`,
          },
        },
        notchedOutline: {
          borderColor: colors.neutral[300],
          '&:hover': {
            borderColor: colors.primary[400],
          },
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiFormLabel-root': {
            fontWeight: 500,
            color: colors.neutral[700],
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
        },
        colorPrimary: {
          background: gradients.primary,
          color: 'white',
        },
        outlined: {
          borderColor: colors.neutral[300],
          '&:hover': {
            backgroundColor: colors.neutral[50],
          },
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: colors.neutral[200],
        },
        bar: {
          background: gradients.primary,
          borderRadius: 4,
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 500,
        },
        standardSuccess: {
          backgroundColor: colors.success[50],
          color: colors.success[800],
          '& .MuiAlert-icon': {
            color: colors.success[600],
          },
        },
        standardError: {
          backgroundColor: colors.error[50],
          color: colors.error[800],
          '& .MuiAlert-icon': {
            color: colors.error[600],
          },
        },
        standardWarning: {
          backgroundColor: colors.warning[50],
          color: colors.warning[800],
          '& .MuiAlert-icon': {
            color: colors.warning[600],
          },
        },
        standardInfo: {
          backgroundColor: colors.primary[50],
          color: colors.primary[800],
          '& .MuiAlert-icon': {
            color: colors.primary[600],
          },
        },
      },
    },
  },
});

export default modernTheme;