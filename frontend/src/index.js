import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Define o tema da aplicação
const theme = createTheme({
  palette: {
    primary: {
      main: '#4A90E2',
    },
    secondary: {
      main: '#2ECC71',
    },
    background: {
      default: '#F8F9FA',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

