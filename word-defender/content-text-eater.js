// TEXT EATER VERSION - Bacteria eat actual text from the webpage!

// Game state
let gameActive = false;
let gameContainer = null;
let canvas = null;
let ctx = null;
let bacteria = [];
let particles = [];
let score = 0;
let level = 1;
let lives = 3;
let currentInput = '';
let textNodes = [];
let animationId = null;
let lastMultiplyTime = Date.now();
let weaponType = 'laser';
let combo = 0;
let maxCombo = 0;
let eatenChars = 0;

// Weapon types
const weapons = {
  laser: { emoji: '⚡', color: '#00ffff', speed: 15, damage: 1 },
  bow: { emoji: '🏹', color: '#ff6b6b', speed: 12, damage: 1 },
  missile: { emoji: '🚀', color: '#ffd700', speed: 10, damage: 2 },
  tank: { emoji: '💥', color: '#ff4500', speed: 8, damage: 3 },
  pebble: { emoji: '⚪', color: '#808080', speed: 20, damage: 1 }
};

// Text node tracking
class TextElement {
  constructor(node, rect) {
    this.node = node;
    this.originalText = node.textContent;
    this.currentText = node.textContent;
    this.rect = rect;
    this.x = rect.left + rect.width / 2;
    this.y = rect.top + rect.height / 2;
    this.eaten = 0;
  }

  eatCharacter() {
    if (this.currentText.length > 0) {
      // Eat from random position
      const pos = Math.floor(Math.random() * this.currentText.length);
      this.currentText = this.currentText.slice(0, pos) + this.currentText.slice(pos + 1);
      this.node.textContent = this.currentText;
      this.eaten++;
      return true;
    }
    return false;
  }

  restore() {
    this.node.textContent = this.originalText;
  }
}

// Bacteria class - now eats actual webpage text!
class Bacterium {
  constructor(x, y, speed = null) {
    this.x = x;
    this.y = y;
    this.speed = speed || (1 + Math.random() * 1.5 + level * 0.2);
    this.angle = Math.random() * Math.PI * 2;
    this.size = 40;
    this.health = 5 + level;
    this.maxHealth = 5 + level;
    this.color = this.getRandomColor();
    this.tentacles = [];
    this.eatingTimer = 0;
    this.eatingInterval = 1000 - (level * 50); // Faster eating at higher levels
    this.rotation = 0;
    this.pulsePhase = Math.random() * Math.PI * 2;
    this.targetX = Math.random() * canvas.width;
    this.targetY = Math.random() * canvas.height;
    this.retargetTimer = 0;
    this.charsEaten = 0;
    
    // Generate tentacles
    for (let i = 0; i < 8; i++) {
      this.tentacles.push({
        angle: (Math.PI * 2 / 8) * i,
        length: this.size * 0.8,
        wave: Math.random() * Math.PI * 2
      });
    }
  }

  getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update(deltaTime) {
    // Retarget occasionally
    this.retargetTimer += deltaTime;
    if (this.retargetTimer > 3000) {
      this.targetX = Math.random() * canvas.width;
      this.targetY = Math.random() * canvas.height;
      this.retargetTimer = 0;
    }

    // Move towards target
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 10) {
      this.x += (dx / distance) * this.speed;
      this.y += (dy / distance) * this.speed;
    }
    
    // Add some wobble
    this.x += Math.sin(Date.now() * 0.002 + this.angle) * 0.8;
    this.y += Math.cos(Date.now() * 0.002 + this.angle) * 0.8;
    
    // Keep in bounds
    this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x));
    this.y = Math.max(this.size, Math.min(canvas.height - this.size, this.y));
    
    // Rotation and pulse
    this.rotation += 0.03;
    this.pulsePhase += 0.05;
    
    // Update tentacles
    this.tentacles.forEach(t => {
      t.wave += 0.15;
    });
    
    // EAT TEXT FROM WEBPAGE!
    this.eatingTimer += deltaTime;
    if (this.eatingTimer >= this.eatingInterval) {
      this.eatNearbyText();
      this.eatingTimer = 0;
    }
  }

  eatNearbyText() {
    // Find text nodes near this bacterium
    const eatRadius = 150;
    let nearbyTexts = textNodes.filter(t => {
      const dx = t.x - this.x;
      const dy = t.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      return dist < eatRadius && t.currentText.length > 0;
    });

    if (nearbyTexts.length > 0) {
      // Eat from closest text
      nearbyTexts.sort((a, b) => {
        const distA = Math.sqrt((a.x - this.x) ** 2 + (a.y - this.y) ** 2);
        const distB = Math.sqrt((b.x - this.x) ** 2 + (b.y - this.y) ** 2);
        return distA - distB;
      });

      const target = nearbyTexts[0];
      if (target.eatCharacter()) {
        this.charsEaten++;
        eatenChars++;
        createParticles(this.x, this.y, '#ff0000', 3);
        
        // Lose life if too much text eaten
        if (eatenChars % 50 === 0) {
          lives--;
        }
      }
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    // Draw tentacles
    this.tentacles.forEach(t => {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 4;
      ctx.globalAlpha = 0.7;
      
      const waveOffset = Math.sin(t.wave) * 15;
      const endX = Math.cos(t.angle) * (t.length + waveOffset);
      const endY = Math.sin(t.angle) * (t.length + waveOffset);
      
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(
        endX * 0.5 + waveOffset,
        endY * 0.5 + waveOffset,
        endX,
        endY
      );
      ctx.stroke();
    });
    
    // Draw body with pulse
    const pulseSize = this.size + Math.sin(this.pulsePhase) * 8;
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, pulseSize);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(0.7, this.color + 'aa');
    gradient.addColorStop(1, this.color + '00');
    
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw core
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, pulseSize * 0.4, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw eyes
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(-pulseSize * 0.2, -pulseSize * 0.15, pulseSize * 0.12, 0, Math.PI * 2);
    ctx.arc(pulseSize * 0.2, -pulseSize * 0.15, pulseSize * 0.12, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw mouth (eating)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, pulseSize * 0.1, pulseSize * 0.2, 0, Math.PI);
    ctx.stroke();
    
    ctx.restore();
    
    // Draw health bar
    const barWidth = 60;
    const barHeight = 6;
    const healthPercent = this.health / this.maxHealth;
    
    ctx.fillStyle = '#333333';
    ctx.fillRect(this.x - barWidth/2, this.y - this.size - 15, barWidth, barHeight);
    
    ctx.fillStyle = healthPercent > 0.5 ? '#00ff00' : healthPercent > 0.25 ? '#ffff00' : '#ff0000';
    ctx.fillRect(this.x - barWidth/2, this.y - this.size - 15, barWidth * healthPercent, barHeight);
    
    // Show chars eaten
    ctx.save();
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.textAlign = 'center';
    ctx.strokeText(`${this.charsEaten}`, this.x, this.y - this.size - 25);
    ctx.fillText(`${this.charsEaten}`, this.x, this.y - this.size - 25);
    ctx.restore();
  }

  takeDamage(damage) {
    this.health -= damage;
    createParticles(this.x, this.y, this.color, 10);
    return this.health <= 0;
  }

  split() {
    const offset = 60;
    return [
      new Bacterium(this.x - offset, this.y, this.speed * 1.3),
      new Bacterium(this.x + offset, this.y, this.speed * 1.3)
    ];
  }
}

// Particle system
class Particle {
  constructor(x, y, color, vx, vy) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
    this.life = 1;
    this.size = Math.random() * 5 + 3;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.3;
    this.life -= 0.02;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function createParticles(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 / count) * i;
    const speed = Math.random() * 6 + 3;
    particles.push(new Particle(
      x, y, color,
      Math.cos(angle) * speed,
      Math.sin(angle) * speed
    ));
  }
}

// Projectile system
class Projectile {
  constructor(x, y, targetX, targetY, weapon) {
    this.x = x;
    this.y = y;
    this.weapon = weapon;
    const dx = targetX - x;
    const dy = targetY - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    this.vx = (dx / distance) * weapon.speed;
    this.vy = (dy / distance) * weapon.speed;
    this.life = 100;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
  }

  draw() {
    ctx.save();
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = this.weapon.color;
    ctx.fillText(this.weapon.emoji, this.x - this.vx * 2, this.y - this.vy * 2);
    
    ctx.globalAlpha = 1;
    ctx.fillText(this.weapon.emoji, this.x, this.y);
    ctx.restore();
  }

  checkCollision(bacterium) {
    const dx = this.x - bacterium.x;
    const dy = this.y - bacterium.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < bacterium.size;
  }
}

let projectiles = [];

// Extract text nodes from page
function extractTextNodes() {
  textNodes = [];
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        // Skip script, style, and game elements
        if (node.parentElement.closest('#word-defender-game, script, style, noscript')) {
          return NodeFilter.FILTER_REJECT;
        }
        // Only accept text with actual content
        if (node.textContent.trim().length > 5) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      }
    }
  );

  let node;
  while (node = walker.nextNode()) {
    const range = document.createRange();
    range.selectNodeContents(node);
    const rect = range.getBoundingClientRect();
    
    if (rect.width > 0 && rect.height > 0) {
      textNodes.push(new TextElement(node, rect));
    }
  }
  
  console.log(`Found ${textNodes.length} text elements to eat!`);
}

// Initialize game
function initGame() {
  if (gameActive) return;
  
  // Extract text from page
  extractTextNodes();
  
  if (textNodes.length < 5) {
    alert('This page doesn\'t have enough text! Try a page with more content (like Wikipedia).');
    return;
  }
  
  // Create game container
  gameContainer = document.createElement('div');
  gameContainer.id = 'word-defender-game';
  gameContainer.innerHTML = `
    <div id="game-overlay">
      <canvas id="game-canvas"></canvas>
      <div id="game-ui">
        <div class="ui-top">
          <div class="stat">❤️ Lives: <span id="lives">3</span></div>
          <div class="stat">🎯 Score: <span id="score">0</span></div>
          <div class="stat">📝 Text Eaten: <span id="eaten">0</span></div>
          <div class="stat">🦠 Bacteria: <span id="bacteria-count">0</span></div>
          <div class="stat">📊 Level: <span id="level">1</span></div>
        </div>
        <div class="ui-bottom">
          <div id="input-display">Click on bacteria to shoot!</div>
          <div id="weapon-selector">
            <button class="weapon-btn active" data-weapon="laser">⚡</button>
            <button class="weapon-btn" data-weapon="bow">🏹</button>
            <button class="weapon-btn" data-weapon="missile">🚀</button>
            <button class="weapon-btn" data-weapon="tank">💥</button>
            <button class="weapon-btn" data-weapon="pebble">⚪</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(gameContainer);
  
  canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  gameActive = true;
  bacteria = [];
  particles = [];
  projectiles = [];
  score = 0;
  level = 1;
  lives = 3;
  combo = 0;
  maxCombo = 0;
  eatenChars = 0;
  lastMultiplyTime = Date.now();
  
  // Spawn initial bacteria
  spawnBacteria(4);
  
  // Setup weapon selector
  document.querySelectorAll('.weapon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.weapon-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      weaponType = btn.dataset.weapon;
    });
  });
  
  // Click to shoot
  canvas.addEventListener('click', (e) => {
    if (!gameActive) return;
    
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // Find nearest bacterium
    let nearest = null;
    let minDist = Infinity;
    
    bacteria.forEach(b => {
      const dist = Math.sqrt((b.x - clickX) ** 2 + (b.y - clickY) ** 2);
      if (dist < minDist) {
        minDist = dist;
        nearest = b;
      }
    });
    
    if (nearest && minDist < 200) {
      shootProjectile(nearest);
    }
  });
  
  gameLoop();
  updateStats();
}

function spawnBacteria(count) {
  for (let i = 0; i < count; i++) {
    const edge = Math.floor(Math.random() * 4);
    let x, y;
    
    switch(edge) {
      case 0: x = Math.random() * canvas.width; y = -50; break;
      case 1: x = canvas.width + 50; y = Math.random() * canvas.height; break;
      case 2: x = Math.random() * canvas.width; y = canvas.height + 50; break;
      case 3: x = -50; y = Math.random() * canvas.height; break;
    }
    
    bacteria.push(new Bacterium(x, y));
  }
}

function gameLoop() {
  if (!gameActive) return;
  
  // Clear canvas with semi-transparent overlay
  ctx.fillStyle = 'rgba(10, 10, 30, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Update and draw particles
  particles = particles.filter(p => {
    p.update();
    p.draw();
    return p.life > 0;
  });
  
  // Update and draw projectiles
  projectiles = projectiles.filter(p => {
    p.update();
    p.draw();
    
    for (let i = bacteria.length - 1; i >= 0; i--) {
      if (p.checkCollision(bacteria[i])) {
        if (bacteria[i].takeDamage(p.weapon.damage)) {
          score += 100 * (combo + 1);
          combo++;
          maxCombo = Math.max(maxCombo, combo);
          createParticles(bacteria[i].x, bacteria[i].y, bacteria[i].color, 25);
          bacteria.splice(i, 1);
          
          if (score > level * 1000) {
            level++;
            spawnBacteria(2);
          }
        }
        return false;
      }
    }
    
    return p.life > 0;
  });
  
  // Update and draw bacteria
  bacteria.forEach(b => {
    b.update(16);
    b.draw();
  });
  
  // Multiply bacteria every 5 seconds
  if (Date.now() - lastMultiplyTime > 5000 && bacteria.length < 15) {
    lastMultiplyTime = Date.now();
    if (bacteria.length > 0) {
      const randomBacterium = bacteria[Math.floor(Math.random() * bacteria.length)];
      const newBacteria = randomBacterium.split();
      bacteria.push(...newBacteria);
      createParticles(randomBacterium.x, randomBacterium.y, '#ffff00', 20);
    }
  }
  
  // Spawn new bacteria if too few
  if (bacteria.length < 2) {
    spawnBacteria(1);
  }
  
  // Update UI
  document.getElementById('lives').textContent = lives;
  document.getElementById('score').textContent = score;
  document.getElementById('eaten').textContent = eatenChars;
  document.getElementById('bacteria-count').textContent = bacteria.length;
  document.getElementById('level').textContent = level;
  
  // Check game over
  if (lives <= 0) {
    endGame();
    return;
  }
  
  animationId = requestAnimationFrame(gameLoop);
}

function shootProjectile(target) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height - 100;
  
  projectiles.push(new Projectile(
    centerX,
    centerY,
    target.x,
    target.y,
    weapons[weaponType]
  ));
}

async function endGame() {
  gameActive = false;
  
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  // Restore all eaten text!
  textNodes.forEach(t => t.restore());
  
  // Save stats
  const stats = await chrome.storage.local.get(['highScore', 'gamesPlayed', 'totalKills']);
  const newHighScore = Math.max(score, stats.highScore || 0);
  
  await chrome.storage.local.set({
    highScore: newHighScore,
    gamesPlayed: (stats.gamesPlayed || 0) + 1,
    totalKills: (stats.totalKills || 0) + Math.floor(score / 100)
  });
  
  // Show game over
  ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 60px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 100);
  
  ctx.font = 'bold 30px Arial';
  ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 - 20);
  ctx.fillText(`Text Eaten: ${eatenChars} characters`, canvas.width / 2, canvas.height / 2 + 20);
  ctx.fillText(`Level Reached: ${level}`, canvas.width / 2, canvas.height / 2 + 60);
  
  if (score === newHighScore && score > 0) {
    ctx.fillStyle = '#ffd700';
    ctx.fillText('🏆 NEW HIGH SCORE! 🏆', canvas.width / 2, canvas.height / 2 + 120);
  }
  
  ctx.fillStyle = '#aaaaaa';
  ctx.font = '20px Arial';
  ctx.fillText('Press ESC to exit', canvas.width / 2, canvas.height / 2 + 180);
}

function updateStats() {}

function closeGame() {
  gameActive = false;
  
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  // Restore all text!
  textNodes.forEach(t => t.restore());
  
  if (gameContainer) {
    gameContainer.remove();
    gameContainer = null;
  }
  
  canvas = null;
  ctx = null;
  bacteria = [];
  particles = [];
  projectiles = [];
  textNodes = [];
}

// Event listeners
document.addEventListener('keydown', (e) => {
  if (!gameActive) return;
  
  if (e.key === 'Escape') {
    closeGame();
    return;
  }
  
  if (e.key >= '1' && e.key <= '5') {
    const weaponKeys = ['laser', 'bow', 'missile', 'tank', 'pebble'];
    weaponType = weaponKeys[parseInt(e.key) - 1];
    document.querySelectorAll('.weapon-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx === parseInt(e.key) - 1);
    });
  }
});

window.addEventListener('resize', () => {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startGame') {
    if (!gameActive) {
      initGame();
    }
  }
});
