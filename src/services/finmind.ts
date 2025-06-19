import axios from 'axios';
import { FinMindResponse, StockInfo, MonthlyRevenue } from '../types/api';
import { API_CONFIG, getApiHeaders } from '../config/api';

// 创建axios实例
const finmindApi = axios.create({
  baseURL: API_CONFIG.FINMIND_BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: getApiHeaders(),
});

// 获取股票列表
export const getStockList = async (): Promise<StockInfo[]> => {
  try {
    const response = await finmindApi.post<FinMindResponse<StockInfo[]>>('/TaiwanStockInfo', {
      dataset: 'TaiwanStockInfo',
    });
    
    if (response.data.status === 'success') {
      return response.data.data;
    } else {
      throw new Error(response.data.msg || '获取股票列表失败');
    }
  } catch (error) {
    console.error('获取股票列表错误:', error);
    throw error;
  }
};

// 获取月营收数据
export const getMonthlyRevenue = async (
  stockId: string,
  startDate: string,
  endDate: string
): Promise<MonthlyRevenue[]> => {
  try {
    const response = await finmindApi.post<FinMindResponse<MonthlyRevenue[]>>('/TaiwanStockMonthRevenue', {
      dataset: 'TaiwanStockMonthRevenue',
      data_id: stockId,
      start_date: startDate,
      end_date: endDate,
    });
    
    if (response.data.status === 'success') {
      return response.data.data;
    } else {
      throw new Error(response.data.msg || '获取月营收数据失败');
    }
  } catch (error) {
    console.error('获取月营收数据错误:', error);
    throw error;
  }
};

// 模拟数据（当API不可用时使用）
export const getMockStockList = (): StockInfo[] => {
  return [
    { stock_id: '2330', stock_name: '台積電', industry_category: '半導體業', type: 'twse', date: '2024-01-01' },
    { stock_id: '2317', stock_name: '鴻海', industry_category: '電子零組件業', type: 'twse', date: '2024-01-01' },
    { stock_id: '2454', stock_name: '聯發科', industry_category: '半導體業', type: 'twse', date: '2024-01-01' },
    { stock_id: '2412', stock_name: '中華電', industry_category: '通信網路業', type: 'twse', date: '2024-01-01' },
    { stock_id: '1301', stock_name: '台塑', industry_category: '塑膠業', type: 'twse', date: '2024-01-01' },
    { stock_id: '2881', stock_name: '富邦金', industry_category: '金融業', type: 'twse', date: '2024-01-01' },
    { stock_id: '2882', stock_name: '國泰金', industry_category: '金融業', type: 'twse', date: '2024-01-01' },
    { stock_id: '1303', stock_name: '南亞', industry_category: '塑膠業', type: 'twse', date: '2024-01-01' },
    { stock_id: '2002', stock_name: '中鋼', industry_category: '鋼鐵業', type: 'twse', date: '2024-01-01' },
    { stock_id: '1216', stock_name: '統一', industry_category: '食品業', type: 'twse', date: '2024-01-01' },
  ];
};

export const getMockMonthlyRevenue = (stockId: string): MonthlyRevenue[] => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  
  const data: MonthlyRevenue[] = [];
  
  // 生成过去24个月的数据
  for (let i = 23; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - 1 - i, 1);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    
    // 模拟营收数据（基于股票ID生成不同的模式）
    let baseRevenue = 1000000;
    if (stockId === '2330') baseRevenue = 20000000; // 台積電
    else if (stockId === '2317') baseRevenue = 15000000; // 鴻海
    else if (stockId === '2454') baseRevenue = 8000000; // 聯發科
    else if (stockId === '2412') baseRevenue = 5000000; // 中華電
    else if (stockId === '1301') baseRevenue = 3000000; // 台塑
    else if (stockId === '2881') baseRevenue = 4000000; // 富邦金
    else if (stockId === '2882') baseRevenue = 3500000; // 國泰金
    else if (stockId === '1303') baseRevenue = 2500000; // 南亞
    else if (stockId === '2002') baseRevenue = 2000000; // 中鋼
    else if (stockId === '1216') baseRevenue = 1500000; // 統一
    
    // 添加一些随机波动
    const randomFactor = 0.8 + Math.random() * 0.4; // 0.8-1.2倍
    const seasonalFactor = 1 + 0.2 * Math.sin((month - 1) * Math.PI / 6); // 季节性波动
    const growthFactor = 1 + (i / 24) * 0.1; // 轻微增长趋势
    
    const revenue = Math.round(baseRevenue * randomFactor * seasonalFactor * growthFactor);
    
    data.push({
      stock_id: stockId,
      date: `${year}-${month.toString().padStart(2, '0')}-01`,
      revenue,
      revenue_month: month,
      revenue_year: year,
    });
  }
  
  return data;
}; 