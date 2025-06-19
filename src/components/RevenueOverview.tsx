import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { RevenueAnalysis } from '../types/api';
import { formatRevenue } from '../utils/analysis';

interface RevenueOverviewProps {
  analysis: RevenueAnalysis;
  stockName: string;
}

const RevenueOverview: React.FC<RevenueOverviewProps> = ({
  analysis,
  stockName,
}) => {
  const formatGrowthRate = (rate: number) => {
    const isPositive = rate >= 0;
    const color = isPositive ? 'success' : 'error';
    const icon = isPositive ? <TrendingUp /> : <TrendingDown />;
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {icon}
        <Typography
          variant="body2"
          color={color}
          sx={{ fontWeight: 'bold' }}
        >
          {isPositive ? '+' : ''}{rate.toFixed(1)}%
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {stockName} 營收概覽
      </Typography>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: 2 
      }}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              當月營收
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {formatRevenue(analysis.currentRevenue)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="textSecondary">
                月增率:
              </Typography>
              {formatGrowthRate(analysis.monthOverMonth)}
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              年增率
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              {formatGrowthRate(analysis.yearOverYear)}
            </Box>
            <Typography variant="body2" color="textSecondary">
              去年同期: {formatRevenue(analysis.currentRevenue - (analysis.currentRevenue * analysis.yearOverYear / 100))}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              累計營收
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {formatRevenue(analysis.yearToDate)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="textSecondary">
                年增率:
              </Typography>
              {formatGrowthRate(analysis.yearToDateGrowth)}
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              去年同期累計
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {formatRevenue(analysis.lastYearToDate)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              去年同期數據
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default RevenueOverview; 