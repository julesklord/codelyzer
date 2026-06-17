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
    try {
      const responseUrl = new URL(response.url());
      if (responseUrl.hostname === 'api.github.com') {
        const status = response.status();
        if (status !== 200) {
          console.log(`[RESPONSE] ${status} ${response.url()}`);
        }
      }
    } catch {
      // Ignore malformed URLs from non-standard responses.
    }
  });
  
  // Navigate to the app
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 30000 });
  
  // Wait a bit for the app to load
  await page.waitForTimeout(3000);
  
  // Handle walkthrough overlay if present
  const walkthroughOverlay = await page.$('.walkthrough-overlay');
  if (walkthroughOverlay) {
    console.log('Walkthrough overlay found, clicking to dismiss');
    await page.click('.walkthrough-overlay', { force: true });
    await page.waitForTimeout(500);
  }
  
  // Try to find the analyze button and click it
  const repoInput = await page.$('input[aria-label="Repository URL"]');
  if (repoInput) {
    await repoInput.fill('julesklord/codelyzer');
    console.log('Filled repo input');
  }
  
  // Try clicking via keyboard event
  const analyzeBtn = await page.$('#analyze-btn');
  if (analyzeBtn) {
    console.log('Analyze button found, pressing Enter...');
    await analyzeBtn.focus();
    await page.keyboard.press('Enter');
    console.log('Pressed Enter on analyze button');
    
    // Wait for analysis to start
    await page.waitForTimeout(15000);
    
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
    
    // Check for data
    const hasData = await page.evaluate(() => {
      const treeNodes = document.querySelectorAll('[class*="tree"], [class*="node"], [class*="file"]');
      return treeNodes.length;
    });
    console.log(`[TREE NODES] ${hasData}`);
    
    // Check for results
    const results = await page.evaluate(() => {
      const resultEl = document.querySelector('[class*="result"], [class*="summary"], [class*="stats"]');
      return resultEl ? resultEl.textContent : 'no results element';
    });
    console.log(`[RESULTS] ${results}`);
  }
  
  await browser.close();
}

runTest().catch(console.error);