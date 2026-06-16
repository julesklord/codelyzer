import { chromium } from 'playwright';

async function runTest() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Capture console messages
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('vite') || text.includes('debug') || text.includes('Download')) return;
    console.log(`[${msg.type()}] ${text}`);
  });
  
  page.on('pageerror', error => {
    console.log(`[PAGE ERROR] ${error.message}`);
  });
  
  page.on('requestfailed', request => {
    console.log(`[REQUEST FAILED] ${request.url()} - ${request.failure()?.errorText}`);
  });
  
  page.on('request', request => {
    if (request.url().includes('api.github.com')) {
      console.log(`[REQUEST] ${request.method()} ${request.url()}`);
    }
  });
  
  page.on('response', response => {
    if (response.url().includes('api.github.com')) {
      const status = response.status();
      if (status !== 200) {
        console.log(`[RESPONSE] ${status} ${response.url()}`);
      }
    }
  });
  
  // Navigate to the app
  await page.goto('http://localhost:5175', { waitUntil: 'networkidle', timeout: 30000 });
  
  // Wait a bit for the app to load
  await page.waitForTimeout(3000);
  
  // Handle walkthrough overlay if present
  const walkthroughOverlay = await page.$('.walkthrough-overlay');
  if (walkthroughOverlay) {
    console.log('Walkthrough overlay found, clicking to dismiss');
    await page.click('.walkthrough-overlay', { force: true });
    await page.waitForTimeout(500);
  }
  
  // Test with a smaller repo that has Python files
  const repoInput = await page.waitForSelector('input[aria-label="Repository URL"]', { timeout: 10000 });
  await repoInput.fill('pallets/flask');
  console.log('Filled repo input with pallets/flask (smaller Python repo)');
  
  // Click Analyze button
  const analyzeBtn = await page.waitForSelector('#analyze-btn', { timeout: 10000 });
  await analyzeBtn.focus();
  await page.keyboard.press('Enter');
  console.log('Pressed Enter on analyze button');
  
  // Wait for analysis to complete - longer timeout
  console.log('Waiting for analysis...');
  await page.waitForTimeout(180000);
  
  // Check final state
  const buttonState = await page.evaluate(() => {
    const btn = document.getElementById('analyze-btn');
    return btn ? { disabled: btn.disabled, text: btn.textContent } : 'not found';
  });
  console.log(`[FINAL BUTTON STATE] ${JSON.stringify(buttonState)}`);
  
  // Check for error
  const pageError = await page.evaluate(() => {
    const errorEl = document.querySelector('.error, [class*="error"], .toast-error');
    return errorEl ? errorEl.textContent : 'no error element';
  });
  console.log(`[FINAL ERROR] ${pageError}`);
  
  // Check for Python files in the tree
  const pyFiles = await page.evaluate(() => {
    const treeItems = document.querySelectorAll('.tree-node, [class*="tree-node"], [class*="file-item"], li');
    const files = [];
    treeItems.forEach(item => {
      const text = item.textContent || '';
      if (text.endsWith('.py')) {
        files.push(text.trim());
      }
    });
    return files;
  });
  console.log(`[PYTHON FILES FOUND] ${pyFiles.length}:`, pyFiles.slice(0, 20));
  
  // Check for src folder
  const srcFiles = await page.evaluate(() => {
    const treeItems = document.querySelectorAll('.tree-node, [class*="tree-node"], [class*="file-item"], li');
    const files = [];
    treeItems.forEach(item => {
      const text = item.textContent || '';
      if (text.includes('src/') || text.includes('flask/')) {
        files.push(text.trim());
      }
    });
    return files;
  });
  console.log(`[SRC FOLDER FILES] ${srcFiles.length}:`, srcFiles.slice(0, 20));
  
  // Check stats
  const stats = await page.evaluate(() => {
    const statsEl = document.querySelector('[class*="stat-card"], [class*="stats-grid"]');
    return statsEl ? statsEl.textContent : 'no stats';
  });
  console.log(`[STATS] ${stats}`);
  
  // Check all files in sidebar
  const allFiles = await page.evaluate(() => {
    const treeItems = document.querySelectorAll('.tree-node, [class*="tree-node"], [class*="file-item"], li');
    const files = [];
    treeItems.forEach(item => {
      const text = item.textContent || '';
      if (text.trim()) {
        files.push(text.trim());
      }
    });
    return files;
  });
  console.log(`[ALL FILES] ${allFiles.length}:`, allFiles.slice(0, 50));
  
  await browser.close();
}

runTest().catch(console.error);