import React from 'react';
import GenerateReport from './pages/GenerateReport';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import modernTheme from './theme/modernTheme';
import GradientBackground from './components/layout/GradientBackground';

function App() {
  return (
    <ThemeProvider theme={modernTheme}>
      <CssBaseline />
      <GradientBackground variant="minimal">
        <GenerateReport />
      </GradientBackground>
    </ThemeProvider>
  );
}

export default App;

