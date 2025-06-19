#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 檢查項目結構...\n');

const requiredFiles = [
  'package.json',
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/globals.css',
  'src/components/StockSelector.tsx',
  'src/components/RevenueOverview.tsx',
  'src/components/RevenueChart.tsx',
  'src/components/LoadingState.tsx',
  'src/components/ErrorState.tsx',
  'src/components/ThemeRegistry.tsx',
  'src/hooks/useStockData.ts',
  'src/services/finmind.ts',
  'src/types/api.ts',
  'src/utils/analysis.ts',
  'src/config/api.ts',
  'README.md',
  'vercel.json',
];

const requiredDirs = [
  'src',
  'src/app',
  'src/components',
  'src/hooks',
  'src/services',
  'src/types',
  'src/utils',
  'src/config',
  'scripts',
];

function checkFile(filePath) {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${filePath}`);
    return true;
  } else {
    console.log(`❌ ${filePath} - 文件不存在`);
    return false;
  }
}

function checkDir(dirPath) {
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    console.log(`✅ ${dirPath}/`);
    return true;
  } else {
    console.log(`❌ ${dirPath}/ - 目錄不存在`);
    return false;
  }
}

function checkPackageJson() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredDeps = ['next', 'react', 'react-dom', '@mui/material', 'recharts'];
    const requiredDevDeps = ['typescript', '@types/react'];
    
    console.log('\n📦 檢查 package.json 依賴...');
    
    const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies?.[dep]);
    const missingDevDeps = requiredDevDeps.filter(dep => !packageJson.devDependencies?.[dep]);
    
    if (missingDeps.length === 0 && missingDevDeps.length === 0) {
      console.log('✅ 所有必需依賴都已安裝');
      return true;
    } else {
      if (missingDeps.length > 0) {
        console.log(`❌ 缺少依賴: ${missingDeps.join(', ')}`);
      }
      if (missingDevDeps.length > 0) {
        console.log(`❌ 缺少開發依賴: ${missingDevDeps.join(', ')}`);
      }
      return false;
    }
  } catch (error) {
    console.log('❌ package.json 解析失敗');
    return false;
  }
}

function runStructureTest() {
  console.log('📁 檢查目錄結構...\n');
  
  let dirPassed = 0;
  let filePassed = 0;
  
  requiredDirs.forEach(dir => {
    if (checkDir(dir)) dirPassed++;
  });
  
  console.log('\n📄 檢查文件...\n');
  
  requiredFiles.forEach(file => {
    if (checkFile(file)) filePassed++;
  });
  
  const packageJsonOk = checkPackageJson();
  
  console.log('\n📊 檢查結果:');
  console.log(`目錄: ${dirPassed}/${requiredDirs.length} 通過`);
  console.log(`文件: ${filePassed}/${requiredFiles.length} 通過`);
  console.log(`package.json: ${packageJsonOk ? '✅' : '❌'}`);
  
  const totalPassed = dirPassed + filePassed + (packageJsonOk ? 1 : 0);
  const totalChecks = requiredDirs.length + requiredFiles.length + 1;
  
  console.log(`\n總體: ${totalPassed}/${totalChecks} 檢查通過`);
  
  if (totalPassed === totalChecks) {
    console.log('\n🎉 項目結構檢查通過！');
    return true;
  } else {
    console.log('\n❌ 項目結構檢查失敗');
    return false;
  }
}

if (require.main === module) {
  const success = runStructureTest();
  process.exit(success ? 0 : 1);
}

module.exports = { runStructureTest }; 