import React from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
} from '@mui/material';
import { Refresh } from '@mui/icons-material';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = '發生錯誤，請稍後再試',
  onRetry 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        gap: 2,
      }}
    >
      <Alert severity="error" sx={{ mb: 2 }}>
        <Typography variant="body1">
          {message}
        </Typography>
      </Alert>
      {onRetry && (
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={onRetry}
        >
          重新載入
        </Button>
      )}
    </Box>
  );
};

export default ErrorState; 