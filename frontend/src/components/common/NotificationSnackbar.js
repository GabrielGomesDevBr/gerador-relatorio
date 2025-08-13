import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

const NotificationSnackbar = ({ 
  open, 
  onClose, 
  message, 
  severity = 'info', 
  title = null,
  autoHideDuration = 6000,
  action = null 
}) => {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={autoHideDuration} 
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert 
        severity={severity} 
        sx={{ width: '100%' }} 
        variant="filled" 
        elevation={6}
        onClose={onClose}
        action={action}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;