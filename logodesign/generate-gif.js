const puppeteer = require('puppeteer');
const GifEncoder = require('gif-encoder-2');
const { createWriteStream } = require('fs');
const { PNG } = require('pngjs');

// Logo configuration
const paperColor = '#f8fafc';
const foldColor = '#cbd5e1';
const accentColor = '#3b82f6';
const textColor = '#94a3b8';
const paperWidth = 60;
const paperHeight = 85;

// Animation configuration
const WIDTH = 800;
const HEIGHT = 800;
const FPS = 24;
const DELAY = 1000 / FPS; // milliseconds per frame

// Generate SVG for a given state
function generateSVG(paperCount, spiralOffset, rotationOffset, foldSize) {
  const getPaperPath = (w, h, f) => `M 0 0 L ${w - f} 0 L ${w} ${f} L ${w} ${h} L 0 ${h} Z`;
  const getFoldPath = (w, h, f) => `M ${w - f} 0 L ${w - f} ${f} L ${w} ${f} Z`;

  let papersHTML = '';
  for (let i = 0; i < paperCount; i++) {
    const angle = (i * 360) / paperCount;
    papersHTML += `
      <g transform="rotate(${angle}) translate(0, -${spiralOffset})">
        <g transform="translate(-${paperWidth/2}, -${paperHeight/2})" filter="url(#shadow)">
          <path
            d="${getPaperPath(paperWidth, paperHeight, foldSize)}"
            fill="${paperColor}"
            stroke="${foldColor}"
            stroke-width="0.5"
          />
          <path
            d="${getFoldPath(paperWidth, paperHeight, foldSize)}"
            fill="${foldColor}"
            opacity="0.8"
          />
          <rect x="${paperWidth * 0.15}" y="${paperHeight * 0.25}" width="${paperWidth * 0.5}" height="${paperHeight * 0.04}" rx="1" fill="${accentColor}" opacity="0.8" />
          <rect x="${paperWidth * 0.15}" y="${paperHeight * 0.35}" width="${paperWidth * 0.7}" height="${paperHeight * 0.03}" rx="1" fill="${textColor}" />
          <rect x="${paperWidth * 0.15}" y="${paperHeight * 0.42}" width="${paperWidth * 0.7}" height="${paperHeight * 0.03}" rx="1" fill="${textColor}" />
          <rect x="${paperWidth * 0.15}" y="${paperHeight * 0.49}" width="${paperWidth * 0.7}" height="${paperHeight * 0.03}" rx="1" fill="${textColor}" />
          <rect x="${paperWidth * 0.15}" y="${paperHeight * 0.56}" width="${paperWidth * 0.4}" height="${paperHeight * 0.03}" rx="1" fill="${textColor}" />

          <rect x="${paperWidth * 0.15}" y="${paperHeight * 0.7}" width="${paperWidth * 0.3}" height="${paperWidth * 0.3}" rx="2" fill="none" stroke="${accentColor}" stroke-width="1" opacity="0.5" />
          <path d="M ${paperWidth * 0.15} ${paperHeight * 0.85} L ${paperWidth * 0.25} ${paperHeight * 0.75} L ${paperWidth * 0.35} ${paperHeight * 0.8} L ${paperWidth * 0.45} ${paperHeight * 0.72}" fill="none" stroke="${accentColor}" stroke-width="1" stroke-linecap="round" />
        </g>
      </g>
    `;
  }

  return `
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="-250 -250 500 500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dx="1" dy="1" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect x="-250" y="-250" width="500" height="500" fill="white"/>
      <g transform="rotate(${rotationOffset})">
        ${papersHTML}
      </g>
    </svg>
  `;
}

// Easing function for smooth animation
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Generate animation frames
function generateFrames() {
  const frames = [];

  // Phase 1: Paper count increasing from 3 to 24 (2 seconds = 48 frames)
  const phase1Frames = FPS * 2;
  for (let i = 0; i < phase1Frames; i++) {
    const progress = easeInOutCubic(i / (phase1Frames - 1));
    const paperCount = Math.round(3 + progress * (24 - 3));
    const spiralOffset = 40;
    const rotationOffset = 0;
    const foldSize = 15;

    frames.push({ paperCount, spiralOffset, rotationOffset, foldSize });
  }

  // Phase 2: Spiral rotation effect (1.5 seconds = 36 frames)
  const phase2Frames = FPS * 1.5;
  for (let i = 0; i < phase2Frames; i++) {
    const progress = easeInOutCubic(i / (phase2Frames - 1));
    const paperCount = 24;
    const spiralOffset = 40 + progress * 30; // Expand spiral from 40 to 70
    const rotationOffset = progress * 360; // Full rotation
    const foldSize = 15;

    frames.push({ paperCount, spiralOffset, rotationOffset, foldSize });
  }

  // Phase 3: Folding animation (1 second = 24 frames)
  const phase3Frames = FPS * 1;
  for (let i = 0; i < phase3Frames; i++) {
    const progress = easeInOutCubic(i / (phase3Frames - 1));
    const paperCount = 24;
    const spiralOffset = 70 - progress * 30; // Contract back to 40
    const rotationOffset = 360 + progress * 360; // Another rotation
    const foldSize = 15 + progress * 25; // Increase fold from 15 to 40

    frames.push({ paperCount, spiralOffset, rotationOffset, foldSize });
  }

  // Phase 4: Hold final state (0.5 seconds = 12 frames)
  const phase4Frames = FPS * 0.5;
  for (let i = 0; i < phase4Frames; i++) {
    const paperCount = 24;
    const spiralOffset = 40;
    const rotationOffset = 720;
    const foldSize = 40;

    frames.push({ paperCount, spiralOffset, rotationOffset, foldSize });
  }

  return frames;
}

async function createGIF() {
  console.log('🚀 Starting GIF generation...');

  // Initialize encoder
  const encoder = new GifEncoder(WIDTH, HEIGHT);
  encoder.setDelay(DELAY);
  encoder.setRepeat(0); // 0 = loop forever
  encoder.setQuality(10); // Lower is better quality (1-20)
  encoder.start();

  const writeStream = createWriteStream('/Users/komal.kumar/Documents/websites/papercircle/logodesign/logo-animation.gif');
  encoder.createReadStream().pipe(writeStream);

  // Generate frames
  const frames = generateFrames();
  console.log(`📊 Total frames to generate: ${frames.length}`);

  // Launch browser
  console.log('🌐 Launching headless browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT });

  // Render each frame
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const svg = generateSVG(frame.paperCount, frame.spiralOffset, frame.rotationOffset, frame.foldSize);

    // Set SVG as page content
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; }
          svg { display: block; }
        </style>
      </head>
      <body>${svg}</body>
      </html>
    `);

    // Take screenshot
    const screenshot = await page.screenshot({ type: 'png' });
    const png = PNG.sync.read(screenshot);

    // Add frame to GIF
    encoder.addFrame(png.data);

    // Progress indicator
    if ((i + 1) % 10 === 0 || i === frames.length - 1) {
      console.log(`✅ Rendered frame ${i + 1}/${frames.length} (${Math.round((i + 1) / frames.length * 100)}%)`);
    }
  }

  await browser.close();
  encoder.finish();

  console.log('🎉 GIF generation complete!');
  console.log('📁 Saved to: /Users/komal.kumar/Documents/websites/papercircle/logodesign/logo-animation.gif');
}

// Run the script
createGIF().catch(console.error);
