# Logo Animation Generator

This directory contains tools for generating animated GIF logos for PaperCircle.

## Files

- **`run.js`** - React component for interactive logo design studio
- **`generate-gif.js`** - Node.js script to generate animated GIF logo
- **`logo-animation.gif`** - Generated animated logo (3.5MB, 5 seconds loop)

## Generated Animation

The animated GIF includes 4 phases:

### Phase 1: Paper Count Increase (2 seconds)
- Papers slowly increase from **3 to 24**
- Smooth easing animation

### Phase 2: Spiral Rotation (1.5 seconds)
- Spiral expands from offset 40 to 70
- Full **360° rotation** effect
- Creates dynamic circular motion

### Phase 3: Folding Animation (1 second)
- Spiral contracts back to offset 40
- Another **360° rotation**
- Fold size increases from 15 to 40 (corner fold becomes more pronounced)

### Phase 4: Hold Final State (0.5 seconds)
- Maintains final position for smooth loop

## How to Regenerate

```bash
cd /Users/komal.kumar/Documents/websites/papercircle/logodesign
node generate-gif.js
```

## Customization

Edit `generate-gif.js` to customize:

### Animation Speed
```javascript
const FPS = 24; // Frames per second (higher = smoother but larger file)
```

### Animation Phases
```javascript
const phase1Frames = FPS * 2;  // Phase 1 duration: 2 seconds
const phase2Frames = FPS * 1.5; // Phase 2 duration: 1.5 seconds
const phase3Frames = FPS * 1;   // Phase 3 duration: 1 second
const phase4Frames = FPS * 0.5; // Phase 4 duration: 0.5 seconds
```

### Paper Count Range
```javascript
// In Phase 1
const paperCount = Math.round(3 + progress * (24 - 3)); // 3 to 24 papers
```

### Spiral Effect
```javascript
// In Phase 2
const spiralOffset = 40 + progress * 30; // Expand from 40 to 70

// In Phase 3
const spiralOffset = 70 - progress * 30; // Contract from 70 to 40
```

### Rotation Angle
```javascript
// In Phase 2
const rotationOffset = progress * 360; // One full rotation

// In Phase 3
const rotationOffset = 360 + progress * 360; // Second rotation
```

### Fold Size
```javascript
// In Phase 3
const foldSize = 15 + progress * 25; // Fold increases from 15 to 40
```

### Colors
```javascript
const paperColor = '#f8fafc';  // Base paper color (light gray)
const foldColor = '#cbd5e1';   // Fold shadow (darker gray)
const accentColor = '#3b82f6'; // Highlight color (blue)
const textColor = '#94a3b8';   // Text lines (medium gray)
```

### Output Size
```javascript
const WIDTH = 800;  // Output width in pixels
const HEIGHT = 800; // Output height in pixels
```

### GIF Quality
```javascript
encoder.setQuality(10); // 1-20, lower is better (but larger file size)
```

## Requirements

The script uses:
- **puppeteer** - Headless browser for rendering SVG
- **gif-encoder-2** - Pure JavaScript GIF encoder
- **pngjs** - PNG processing

Install dependencies:
```bash
npm install
```

## Animation Details

- **Total Duration**: 5 seconds
- **Total Frames**: 120 frames
- **Frame Rate**: 24 FPS
- **Output Size**: 800x800px
- **File Size**: ~3.5MB
- **Loop**: Infinite

## Tips

1. **Reduce file size**: Lower FPS or quality setting
   ```javascript
   const FPS = 12; // Half the frame rate
   encoder.setQuality(15); // Lower quality
   ```

2. **Make animation faster**: Reduce phase durations
   ```javascript
   const phase1Frames = FPS * 1; // 1 second instead of 2
   ```

3. **Add more effects**: Insert additional phases in `generateFrames()`

4. **Export as video**: Modify script to use `ffmpeg` for MP4 output

## Performance

Generation takes approximately:
- **30-60 seconds** on modern hardware
- **120 frames** rendered individually
- Uses headless Chrome via Puppeteer

## Output

The final GIF is saved to:
```
/Users/komal.kumar/Documents/websites/papercircle/logodesign/logo-animation.gif
```

You can use this in:
- Website headers
- Loading animations
- Social media posts
- Email signatures
- Documentation
