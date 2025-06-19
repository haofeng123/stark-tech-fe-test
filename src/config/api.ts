// API 配置
export const API_CONFIG = {
  // FinMind API 基础URL
  FINMIND_BASE_URL: process.env.FINMIND_BASE_URL || 'https://api.finmindtrade.com/api/v4',
  
  // API Token (需要在环境变量中设置)
  FINMIND_API_TOKEN: process.env.FINMIND_API_TOKEN,
  
  // 是否使用模拟数据
  USE_MOCK_DATA: process.env.USE_MOCK_DATA === 'true',
  
  // 请求超时时间 (毫秒)
  TIMEOUT: 10000,
};

// 检查API配置
export const isApiConfigured = () => {
  return !!API_CONFIG.FINMIND_API_TOKEN;
};

// 获取API Headers
export const getApiHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (API_CONFIG.FINMIND_API_TOKEN) {
    headers['Authorization'] = `Bearer ${API_CONFIG.FINMIND_API_TOKEN}`;
  }
  
  return headers;
}; 