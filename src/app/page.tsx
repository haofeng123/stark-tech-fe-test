'use client';

import React from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import StockSelector from '../components/StockSelector';
import RevenueOverview from '../components/RevenueOverview';
import RevenueChart from '../components/RevenueChart';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { useStockData } from '../hooks/useStockData';
import { analyzeRevenue, prepareChartData } from '../utils/analysis';

export default function Home() {
  const {
    stocks,
    selectedStock,
    revenueData,
    loading,
    error,
    useMockData,
    handleStockChange,
    retry,
  } = useStockData();

  const selectedStockName = stocks.find(stock => stock.value === selectedStock)?.label || selectedStock;

  const analysis = analyzeRevenue(revenueData);
  
  const chartData = prepareChartData(revenueData);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          股票營收分析
        </Typography>
        <Typography variant="body1" color="textSecondary">
          基於 FinMind 數據的台股營收分析平台
        </Typography>
      </Box>

      {useMockData && (
        <Alert severity="info" sx={{ mb: 3 }}>
          目前使用模擬數據進行展示。如需真實數據，請確保 FinMind API 可用。
        </Alert>
      )}

      {error && !useMockData && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <StockSelector
          stocks={stocks}
          selectedStock={selectedStock}
          onStockChange={handleStockChange}
          loading={loading}
        />
      </Paper>

      {loading ? (
        <LoadingState message="載入股票數據中..." />
      ) : error && !useMockData ? (
        <ErrorState message={error} onRetry={retry} />
      ) : (
        <Box>
          <RevenueOverview
            analysis={analysis}
            stockName={selectedStockName}
          />

          <RevenueChart
            data={chartData}
            stockName={selectedStockName}
          />
        </Box>
      )}

      <Box sx={{ mt: 6, pt: 3, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="body2" color="textSecondary" align="center">
          © 2024 Stark Tech 前端評測 - 股票營收分析平台
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
          數據來源：FinMind API | 技術棧：Next.js + TypeScript + MUI + Recharts
        </Typography>
      </Box>
    </Container>
  );
}
