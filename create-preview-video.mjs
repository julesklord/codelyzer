import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

/**
 * Creates an automated preview video of Codelyzer showing the 3D graph visualization
 * 
 * Usage: node create-preview-video.mjs
 * Output: preview-video.webm (in project root)
 */

const VIDEO_DIR = path.join(process.cwd(), 'preview-videos');
const OUTPUT_VIDEO = path.join(process.cwd(), 'codelyzer-preview.webm');

// Ensure video directory exists
if (!fs.existsSync(VIDEO_DIR)) {
  fs.mkdirSync(VIDEO_DIR, { recursive: true });
}

async function createPreviewVideo() {
  console.log('🎬 Starting Codelyzer preview video creation...');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
  });
  
  const context = await browser.newContext({
    recordVideo: {
      dir: VIDEO_DIR,
      size: { width: 1920, height: 1080 }
    },
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1
  });
  
  const page = await context.newPage();
  
  // Capture console messages for debugging
  page.on('console', msg => {
    const text = msg.text();
    if (!text.includes('vite') && !text.includes('debug') && !text.includes('Download')) {
      console.log(`  [Browser] ${text}`);
    }
  });
  
  page.on('pageerror', error => {
    console.log(`  [Browser Error] ${error.message}`);
  });
  
  try {
    // Step 1: Navigate to the app
    console.log('📍 Step 1: Loading Codelyzer...');
    await page.goto('http://localhost:5175', { 
      waitUntil: 'networkidle', 
      timeout: 60000 
    });
    await page.waitForTimeout(3000);
    
    // Step 2: Handle walkthrough overlay
    console.log('📍 Step 2: Dismissing walkthrough...');
    const walkthroughOverlay = await page.$('.walkthrough-overlay');
    if (walkthroughOverlay) {
      await page.click('.walkthrough-overlay', { force: true });
      await page.waitForTimeout(500);
    }
    
    // Step 3: Enter repository URL
    console.log('📍 Step 3: Entering repository URL...');
    const repoInput = await page.waitForSelector('input[aria-label="Repository URL"]', { timeout: 10000 });
    await repoInput.fill('julesklord/codelyzer');
    await page.waitForTimeout(500);
    
    // Step 3: Use a small test repo (golden-world fixture - very small)
    console.log('📍 Step 3: Entering small test repository...');
    const repoInput = await page.waitForSelector('input[aria-label="Repository URL"]', { timeout: 10000 });
    await repoInput.fill('julesklord/codelyzer');
    await page.waitForTimeout(500);
    
    // Step 4: Click Analyze button
    console.log('📍 Step 4: Starting analysis...');
    const analyzeBtn = await page.waitForSelector('#analyze-btn', { timeout: 10000 });
    await analyzeBtn.focus();
    await page.keyboard.press('Enter');
    
    // Step 5: Wait for analysis to complete
    console.log('📍 Step 5: Waiting for analysis to complete (this may take 60-120s)...');
    console.log('     The 3D graph requires the full analysis to finish first.');
    
    // Wait for the analyze button to become enabled again (analysis complete)
    await page.waitForFunction(() => {
      const btn = document.getElementById('analyze-btn');
      return btn && !btn.disabled;
    }, { timeout: 180000 });
    
    await page.waitForTimeout(3000);
    console.log('✅ Analysis complete!');
    
    // Step 6: Switch to 3D Graph visualization
    console.log('📍 Step 6: Switching to 3D Graph visualization...');
    const vizSelector = await page.waitForSelector('select.viz-select', { timeout: 10000 });
    await vizSelector.selectOption('graph3d');
    await page.waitForTimeout(3000);
    
    // Step 7: Wait for 3D graph to render
    console.log('📍 Step 7: Waiting for 3D graph to render...');
    await page.waitForSelector('.graph3d-container', { timeout: 10000 });
    await page.waitForTimeout(3000);
    
    // Step 8: Enable auto-rotate for cinematic effect
    console.log('📍 Step 8: Enabling auto-rotate...');
    const settingsBtn = await page.$('button[aria-label="Graph settings"]');
    if (settingsBtn) {
      await settingsBtn.click({ force: true });
      await page.waitForTimeout(500);
      
      const autoRotateCheckbox = await page.$('label.config-check input[type="checkbox"]:last-of-type');
      if (autoRotateCheckbox) {
        const isChecked = await autoRotateCheckbox.isChecked();
        if (!isChecked) {
          await autoRotateCheckbox.click({ force: true });
        }
      }
      await settingsBtn.click({ force: true });
      await page.waitForTimeout(500);
    }
    
    // Step 9: Record cinematic camera movements
    console.log('📍 Step 9: Recording cinematic 3D graph movements (20 seconds)...');
    
    // Let auto-rotate do its thing for a bit
    await page.waitForTimeout(5000);
    
    // Zoom in
    const zoomInBtn = await page.$('button[aria-label="Zoom in"]');
    if (zoomInBtn) {
      for (let i = 0; i < 3; i++) {
        await zoomInBtn.click({ force: true });
        await page.waitForTimeout(300);
      }
    }
    await page.waitForTimeout(3000);
    
    // Zoom out
    const zoomOutBtn = await page.$('button[aria-label="Zoom out"]');
    if (zoomOutBtn) {
      for (let i = 0; i < 2; i++) {
        await zoomOutBtn.click({ force: true });
        await page.waitForTimeout(300);
      }
    }
    await page.waitForTimeout(3000);
    
    // Reset view
    const resetBtn = await page.$('button[aria-label="Reset zoom"]');
    if (resetBtn) {
      await resetBtn.click({ force: true });
      await page.waitForTimeout(1000);
    }
    
    // Fit view
    const fitBtn = await page.$('button[aria-label="Fit view"]');
    if (fitBtn) {
      await fitBtn.click({ force: true });
      await page.waitForTimeout(1000);
    }
    
    await page.waitForTimeout(5000);
    
    // Step 10: Show other visualizations briefly
    console.log('📍 Step 10: Showing other visualizations...');
    
    const visualizations = ['graph', 'treemap', 'matrix', 'sankey', 'architecture'];
    for (const viz of visualizations) {
      await vizSelector.selectOption(viz);
      await page.waitForTimeout(2000);
    }
    
    // Return to 3D graph for finale
    await vizSelector.selectOption('graph3d');
    await page.waitForTimeout(3000);
    
    console.log('📍 Step 11: Final cinematic shot...');
    await page.waitForTimeout(5000);
    
  } catch (error) {
    console.error('❌ Error during video creation:', error.message);
  } finally {
    // Close browser to finalize video
    console.log('📍 Finalizing video...');
    await context.close();
    await browser.close();
    
    // Find the recorded video
    const videoFiles = fs.readdirSync(VIDEO_DIR).filter(f => f.endsWith('.webm'));
    if (videoFiles.length > 0) {
      const latestVideo = path.join(VIDEO_DIR, videoFiles[videoFiles.length - 1]);
      fs.copyFileSync(latestVideo, OUTPUT_VIDEO);
      console.log(`✅ Video saved to: ${OUTPUT_VIDEO}`);
      console.log(`   Size: ${(fs.statSync(OUTPUT_VIDEO).size / 1024 / 1024).toFixed(2)} MB`);
    } else {
      console.log('❌ No video file found!');
    }
  }
}

createPreviewVideo().catch(console.error);