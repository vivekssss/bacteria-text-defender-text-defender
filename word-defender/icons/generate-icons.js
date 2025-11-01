// This script generates PNG icons for the Chrome extension
// Run this with Node.js after installing canvas: npm install canvas

const fs = require('fs');
const { createCanvas } = require('canvas');

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background gradient (approximated with solid color for simplicity)
  ctx.fillStyle = '#667eea';
  ctx.fillRect(0, 0, size, size);
  
  // Draw bacteria-like circle
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.3;
  
  // Main bacteria body
  ctx.fillStyle = '#ff6b6b';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();
  
  // Tentacles
  ctx.strokeStyle = '#ff6b6b';
  ctx.lineWidth = size * 0.05;
  ctx.lineCap = 'round';
  
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI * 2 / 6) * i;
    const startX = centerX + Math.cos(angle) * radius;
    const startY = centerY + Math.sin(angle) * radius;
    const endX = centerX + Math.cos(angle) * radius * 1.8;
    const endY = centerY + Math.sin(angle) * radius * 1.8;
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
  
  // Inner highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.beginPath();
  ctx.arc(centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.5, 0, Math.PI * 2);
  ctx.fill();
  
  // Eyes (for larger icons)
  if (size >= 48) {
    ctx.fillStyle = '#ffffff';
    const eyeSize = radius * 0.25;
    ctx.beginPath();
    ctx.arc(centerX - radius * 0.3, centerY - radius * 0.2, eyeSize, 0, Math.PI * 2);
    ctx.arc(centerX + radius * 0.3, centerY - radius * 0.2, eyeSize, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#000000';
    const pupilSize = eyeSize * 0.5;
    ctx.beginPath();
    ctx.arc(centerX - radius * 0.3, centerY - radius * 0.2, pupilSize, 0, Math.PI * 2);
    ctx.arc(centerX + radius * 0.3, centerY - radius * 0.2, pupilSize, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Crosshair overlay
  if (size >= 48) {
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = size * 0.03;
    const crosshairSize = size * 0.15;
    const chX = size * 0.75;
    const chY = size * 0.25;
    
    ctx.beginPath();
    ctx.moveTo(chX - crosshairSize, chY);
    ctx.lineTo(chX + crosshairSize, chY);
    ctx.moveTo(chX, chY - crosshairSize);
    ctx.lineTo(chX, chY + crosshairSize);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(chX, chY, crosshairSize * 0.7, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  return canvas;
}

// Generate icons
try {
  const sizes = [16, 48, 128];
  
  sizes.forEach(size => {
    const canvas = drawIcon(size);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`icon${size}.png`, buffer);
    console.log(`Generated icon${size}.png`);
  });
  
  console.log('All icons generated successfully!');
} catch (error) {
  console.error('Error generating icons:', error.message);
  console.log('\nTo generate icons, you need to:');
  console.log('1. Install Node.js');
  console.log('2. Run: npm install canvas');
  console.log('3. Run: node generate-icons.js');
  console.log('\nAlternatively, open create-icons.html in a browser and download the icons manually.');
}
