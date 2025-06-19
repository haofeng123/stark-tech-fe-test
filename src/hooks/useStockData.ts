import { useState, useEffect } from 'react';
import { StockInfo, MonthlyRevenue, StockOption } from '../types/api';
import { getStockList, getMonthlyRevenue, getMockStockList, getMockMonthlyRevenue } from '../services/finmind';
import { API_CONFIG } from '../config/api';

export const useStockData = () => {
  const [stocks, setStocks] = useState<StockOption[]>([]);
  const [selectedStock, setSelectedStock] = useState<string>('2330');
  const [revenueData, setRevenueData] = useState<MonthlyRevenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(API_CONFIG.USE_MOCK_DATA);

  const fetchStockList = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let stockList: StockInfo[];
      if (useMockData) {
        stockList = getMockStockList();
      } else {
        stockList = await getStockList();
      }
      
      const stockOptions: StockOption[] = stockList.map(stock => ({
        value: stock.stock_id,
        label: stock.stock_name,
        industry: stock.industry_category,
      }));
      
      setStocks(stockOptions);
    } catch (err) {
      console.error('获取股票列表失败:', err);
      setError('获取股票列表失败，使用模拟数据');
      setUseMockData(true);
      const mockStockList = getMockStockList();
      const stockOptions: StockOption[] = mockStockList.map(stock => ({
        value: stock.stock_id,
        label: stock.stock_name,
        industry: stock.industry_category,
      }));
      setStocks(stockOptions);
    } finally {
      setLoading(false);
    }
  };

  const fetchRevenueData = async (stockId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      let data: MonthlyRevenue[];
      if (useMockData) {
        data = getMockMonthlyRevenue(stockId);
      } else {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 24 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        data = await getMonthlyRevenue(stockId, startDate, endDate);
      }
      
      setRevenueData(data);
    } catch (err) {
      console.error('获取营收数据失败:', err);
      setError('获取营收数据失败，使用模拟数据');
      setUseMockData(true);
      const mockData = getMockMonthlyRevenue(stockId);
      setRevenueData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const handleStockChange = (stockId: string) => {
    setSelectedStock(stockId);
    fetchRevenueData(stockId);
  };

  const retry = () => {
    setError(null);
    fetchStockList();
    fetchRevenueData(selectedStock);
  };

  useEffect(() => {
    fetchStockList();
  }, []);

  useEffect(() => {
    if (stocks.length > 0 && selectedStock) {
      fetchRevenueData(selectedStock);
    }
  }, [stocks, selectedStock]);

  return {
    stocks,
    selectedStock,
    revenueData,
    loading,
    error,
    useMockData,
    handleStockChange,
    retry,
  };
}; 