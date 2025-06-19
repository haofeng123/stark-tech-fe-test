#!/usr/bin/env node

const http = require('http');

console.log('🧪 測試應用功能...\n');

// 測試應用是否正常運行
function testAppRunning() {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:3000', (res) => {
      if (res.statusCode === 200) {
        console.log('✅ 應用正常運行 (HTTP 200)');
        resolve(true);
      } else {
        console.log(`❌ 應用狀態異常 (HTTP ${res.statusCode})`);
        reject(new Error(`HTTP ${res.statusCode}`));
      }
    });

    req.on('error', (err) => {
      console.log('❌ 無法連接到應用');
      reject(err);
    });

    req.setTimeout(5000, () => {
      console.log('❌ 連接超時');
      reject(new Error('Timeout'));
    });
  });
}

// 測試頁面內容
function testPageContent() {
  return new Promise((resolve, reject) => {
    let data = '';
    
    const req = http.get('http://localhost:3000', (res) => {
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const checks = [
          { name: '頁面標題', pattern: /股票營收分析/, found: false },
          { name: 'MUI組件', pattern: /mui/, found: false },
          { name: 'React應用', pattern: /__next/, found: false },
        ];
        
        checks.forEach(check => {
          check.found = check.pattern.test(data.toLowerCase());
          console.log(`${check.found ? '✅' : '❌'} ${check.name}`);
        });
        
        const allPassed = checks.every(check => check.found);
        if (allPassed) {
          console.log('\n🎉 頁面內容檢查通過！');
          resolve(true);
        } else {
          reject(new Error('頁面內容檢查失敗'));
        }
      });
    });

    req.on('error', (err) => {
      console.log('❌ 無法獲取頁面內容');
      reject(err);
    });
  });
}

// 運行所有測試
async function runTests() {
  try {
    await testAppRunning();
    await testPageContent();
    
    console.log('\n📊 測試結果總結:');
    console.log('✅ 應用啟動正常');
    console.log('✅ 頁面內容正確');
    console.log('✅ 功能測試通過');
    
    console.log('\n🚀 應用已準備就緒！');
    console.log('訪問地址: http://localhost:3000');
    console.log('\n功能說明:');
    console.log('- 股票選擇器: 選擇不同的台股股票');
    console.log('- 營收概覽: 查看當月營收、增長率等指標');
    console.log('- 趨勢圖表: 查看24個月營收趨勢');
    console.log('- 響應式設計: 支持桌面端和移動端');
    
  } catch (error) {
    console.log('\n❌ 測試失敗:', error.message);
    console.log('\n請確保:');
    console.log('1. 開發服務器正在運行 (npm run dev)');
    console.log('2. 端口3000未被佔用');
    console.log('3. 所有依賴已正確安裝');
    process.exit(1);
  }
}

runTests(); 