import React from 'react';
import GenerateReport from './pages/GenerateReport';
import { CssBaseline, Box } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <Box 
        sx={{
          width: '100%',
          minHeight: '100vh',
          bgcolor: '#f8f9fa' // Um fundo cinza muito claro e neutro
        }}
      >
        <GenerateReport />
      </Box>
    </>
  );
}

export default App;

