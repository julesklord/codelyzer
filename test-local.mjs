import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

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
  
  // Click the "Open local folder" button
  const openFolderBtn = await page.$('button[aria-label="Open local folder"]');
  if (openFolderBtn) {
    console.log('Open Folder button found');
    await openFolderBtn.click({ force: true });
    await page.waitForTimeout(1000);
    console.log('Open Folder button clicked');
  } else {
    console.log('Open Folder button NOT found');
  }
  
  // Check for "Open ZIP archive" button
  const openZipBtn = await page.$('button[aria-label="Open ZIP archive"]');
  if (openZipBtn) {
    console.log('Open ZIP button found');
    await openZipBtn.click({ force: true });
    await page.waitForTimeout(1000);
    console.log('Open ZIP button clicked');
  } else {
    console.log('Open ZIP button NOT found');
  }
  
  // Check for drag and drop area
  const dropZone = await page.$('[class*="drop"], [class*="drag"]');
  if (dropZone) {
    console.log('Drop zone found');
  } else {
    console.log('Drop zone NOT found');
  }
  
  await browser.close();
}

runTest().catch(console.error);