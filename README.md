# 股票營收分析平台

基於 FinMind API 的台股營收分析平台，參考財報狗和雅虎股市的設計理念，使用現代化的前端技術棧開發。

## 🚀 功能特色

- **股票選擇器**: 支持10支台股股票（台積電、鴻海、聯發科等）
- **營收概覽**: 顯示當月營收、年增率、月增率、累計營收等關鍵指標
- **趨勢圖表**: 24個月營收趨勢線圖，支持互動式工具提示
- **響應式設計**: 完美適配桌面端、平板和移動端
- **錯誤處理**: 完善的錯誤處理和降級機制
- **模擬數據**: 當 API 不可用時自動使用模擬數據

## 🛠 技術棧

- **框架**: Next.js 15.3.4 (App Router)
- **語言**: TypeScript
- **UI 庫**: Material-UI v7
- **圖表**: Recharts
- **HTTP 客戶端**: Axios
- **數據獲取**: SWR
- **字體**: Geist Sans

## 📦 安裝與運行

### 環境要求

- Node.js 18+ 
- npm 或 yarn

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

訪問 [http://localhost:3000](http://localhost:3000) 查看應用。

### 生產構建

```bash
npm run build
npm start
```

## 🔧 配置

### 環境變量

創建 `.env.local` 文件：

```env
FINMIND_API_TOKEN=your_finmind_api_token
FINMIND_BASE_URL=https://api.finmindtrade.com/api/v4
USE_MOCK_DATA=false
```

### FinMind API 配置

1. 註冊 [FinMind](https://finmindtrade.com/) 帳號
2. 獲取 API Token
3. 在環境變量中配置 `FINMIND_API_TOKEN`

## 📊 數據來源

- **TaiwanStockInfo**: 股票基本信息
- **TaiwanStockMonthRevenue**: 月營收數據
- **模擬數據**: 基於真實模式的備用數據

## 🎨 設計特色

- **Material Design**: 遵循 Google 設計規範
- **現代化配色**: 專業的藍色主題
- **流暢動畫**: 平滑的狀態轉換
- **直觀操作**: 簡單的下拉選擇
- **即時反饋**: 實時數據更新

## 📱 響應式設計

- **桌面端 (≥1024px)**: 4列卡片布局，完整圖表顯示
- **平板端 (768px-1023px)**: 2列卡片布局，適中圖表尺寸
- **移動端 (<768px)**: 1列卡片布局，緊湊圖表設計

## 🧪 測試

### 項目結構檢查

```bash
npm run test:structure
```

### 應用功能測試

```bash
npm run test:app
```

## 🚀 部署

### Vercel (推薦)

1. 將代碼推送到 GitHub
2. 在 Vercel 中導入項目
3. 配置環境變量
4. 自動部署

### 其他平台

項目支持部署到任何支持 Node.js 的平台：
- Netlify
- Railway
- Heroku
- 自建服務器

## 📁 項目結構

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局 + MUI主題
│   ├── page.tsx           # 主頁面組件
│   └── globals.css        # 全局樣式
├── components/            # React 組件
│   ├── StockSelector.tsx  # 股票選擇器
│   ├── RevenueOverview.tsx # 營收概覽卡片
│   ├── RevenueChart.tsx   # 營收趨勢圖表
│   ├── LoadingState.tsx   # 加載狀態
│   ├── ErrorState.tsx     # 錯誤狀態
│   └── ThemeRegistry.tsx  # MUI主題註冊
├── hooks/                 # 自定義 Hooks
│   └── useStockData.ts    # 股票數據管理
├── services/              # API 服務
│   └── finmind.ts         # FinMind API 服務
├── types/                 # TypeScript 類型
│   └── api.ts            # API 相關類型
├── utils/                 # 工具函數
│   └── analysis.ts        # 數據分析工具
└── config/                # 配置文件
    └── api.ts            # API 配置
```

## 🔍 核心組件

### StockSelector
股票選擇器組件，支持下拉選擇和行業分類顯示。

### RevenueOverview
營收概覽卡片組件，顯示關鍵財務指標。

### RevenueChart
營收趨勢圖表組件，使用 Recharts 繪製互動式圖表。

### useStockData
自定義 Hook，管理股票數據的獲取和狀態。

## 📈 數據分析

- **年增率**: 與去年同期比較
- **月增率**: 與上個月比較
- **累計營收**: 年度累計及增長率
- **數據格式化**: 自動轉換為億/萬/千單位

## 🎯 使用說明

1. **選擇股票**: 從下拉菜單中選擇要分析的股票
2. **查看概覽**: 瀏覽當月營收、增長率等關鍵指標
3. **分析趨勢**: 查看24個月營收趨勢圖表
4. **響應式體驗**: 在不同設備上獲得最佳體驗

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 許可證

MIT License

---

**開發者**: Stark Tech 前端評測候選人  
**完成時間**: 2024年6月  
**技術棧**: Next.js + TypeScript + MUI + Recharts  
**數據來源**: FinMind API
