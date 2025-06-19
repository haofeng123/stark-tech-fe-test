// FinMind API 响应类型
export interface FinMindResponse<T> {
  status: string;
  msg: string;
  data: T;
}

// 股票基本信息
export interface StockInfo {
  stock_id: string;
  stock_name: string;
  industry_category: string;
  type: string;
  date: string;
}

// 月营收数据
export interface MonthlyRevenue {
  stock_id: string;
  date: string;
  revenue: number;
  revenue_month: number;
  revenue_year: number;
}

// 股票选择器选项
export interface StockOption {
  value: string;
  label: string;
  industry?: string;
}

// 营收分析数据
export interface RevenueAnalysis {
  currentRevenue: number;
  previousRevenue: number;
  yearOverYear: number;
  monthOverMonth: number;
  yearToDate: number;
  lastYearToDate: number;
  yearToDateGrowth: number;
}

// 图表数据点
export interface ChartDataPoint {
  date: string;
  revenue: number;
  year: number;
  month: number;
} 