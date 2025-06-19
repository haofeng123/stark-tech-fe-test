import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import { StockOption } from '../types/api';

interface StockSelectorProps {
  stocks: StockOption[];
  selectedStock: string;
  onStockChange: (stockId: string) => void;
  loading?: boolean;
}

const StockSelector: React.FC<StockSelectorProps> = ({
  stocks,
  selectedStock,
  onStockChange,
  loading = false,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        選擇股票
      </Typography>
      <FormControl fullWidth disabled={loading}>
        <InputLabel id="stock-select-label">股票代號</InputLabel>
        <Select
          labelId="stock-select-label"
          id="stock-select"
          value={selectedStock}
          label="股票代號"
          onChange={(e) => onStockChange(e.target.value)}
        >
          {stocks.map((stock) => (
            <MenuItem key={stock.value} value={stock.value}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body1">
                  {stock.value} - {stock.label}
                </Typography>
                {stock.industry && (
                  <Chip
                    label={stock.industry}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.75rem' }}
                  />
                )}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default StockSelector; 