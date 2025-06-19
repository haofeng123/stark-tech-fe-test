import { MonthlyRevenue, RevenueAnalysis, ChartDataPoint } from '../types/api';

// 格式化数字为千分位显示
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('zh-TW').format(num);
};

// 格式化营收数字（以千万元为单位）
export const formatRevenue = (revenue: number): string => {
  if (revenue >= 100000000) {
    return `${(revenue / 100000000).toFixed(1)}億`;
  } else if (revenue >= 10000) {
    return `${(revenue / 10000).toFixed(1)}萬`;
  } else {
    return formatNumber(revenue);
  }
};

// 计算增长率
export const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

// 分析营收数据
export const analyzeRevenue = (data: MonthlyRevenue[]): RevenueAnalysis => {
  if (data.length === 0) {
    return {
      currentRevenue: 0,
      previousRevenue: 0,
      yearOverYear: 0,
      monthOverMonth: 0,
      yearToDate: 0,
      lastYearToDate: 0,
      yearToDateGrowth: 0,
    };
  }

  // 按日期排序
  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  
  // 最新月份数据
  const latest = sortedData[sortedData.length - 1];
  const currentRevenue = latest.revenue;
  
  // 上个月数据
  const previousMonth = sortedData.find(item => 
    item.revenue_year === latest.revenue_year && 
    item.revenue_month === latest.revenue_month - 1
  ) || sortedData.find(item => 
    item.revenue_year === latest.revenue_year - 1 && 
    item.revenue_month === 12
  );
  const previousRevenue = previousMonth?.revenue || 0;
  
  // 去年同期数据
  const lastYearSameMonth = sortedData.find(item => 
    item.revenue_year === latest.revenue_year - 1 && 
    item.revenue_month === latest.revenue_month
  );
  const lastYearRevenue = lastYearSameMonth?.revenue || 0;
  
  // 计算年度累计营收
  const yearToDate = sortedData
    .filter(item => item.revenue_year === currentYear && item.revenue_month <= currentMonth)
    .reduce((sum, item) => sum + item.revenue, 0);
  
  // 去年同期累计营收
  const lastYearToDate = sortedData
    .filter(item => item.revenue_year === currentYear - 1 && item.revenue_month <= currentMonth)
    .reduce((sum, item) => sum + item.revenue, 0);
  
  return {
    currentRevenue,
    previousRevenue,
    yearOverYear: calculateGrowthRate(currentRevenue, lastYearRevenue),
    monthOverMonth: calculateGrowthRate(currentRevenue, previousRevenue),
    yearToDate,
    lastYearToDate,
    yearToDateGrowth: calculateGrowthRate(yearToDate, lastYearToDate),
  };
};

// 准备图表数据
export const prepareChartData = (data: MonthlyRevenue[]): ChartDataPoint[] => {
  return data
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(item => ({
      date: `${item.revenue_year}/${item.revenue_month.toString().padStart(2, '0')}`,
      revenue: item.revenue,
      year: item.revenue_year,
      month: item.revenue_month,
    }));
};

// 获取行业分类
export const getIndustryCategory = (stockId: string): string => {
  const industryMap: Record<string, string> = {
    '2330': '半導體業',
    '2317': '電子零組件業',
    '2454': '半導體業',
    '2412': '通信網路業',
    '1301': '塑膠業',
  };
  return industryMap[stockId] || '其他';
}; 