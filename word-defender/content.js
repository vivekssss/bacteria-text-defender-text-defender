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
let words = [];
let animationId = null;
let lastMultiplyTime = Date.now();
let weaponType = 'laser';
let combo = 0;
let maxCombo = 0;

// Weapon types with different effects
const weapons = {
  laser: { emoji: '⚡', color: '#00ffff', speed: 15, damage: 1 },
  bow: { emoji: '🏹', color: '#ff6b6b', speed: 12, damage: 1 },
  missile: { emoji: '🚀', color: '#ffd700', speed: 10, damage: 2 },
  tank: { emoji: '💥', color: '#ff4500', speed: 8, damage: 3 },
  pebble: { emoji: '⚪', color: '#808080', speed: 20, damage: 1 }
};

// Bacteria class
class Bacterium {
  constructor(word, x, y, speed = null) {
    this.word = word;
    this.originalWord = word;
    this.x = x;
    this.y = y;
    this.speed = speed || (0.3 + Math.random() * 0.5 + level * 0.1);
    this.angle = Math.random() * Math.PI * 2;
    this.size = 30 + word.length * 5;
    this.health = word.length;
    this.maxHealth = word.length;
    this.color = this.getRandomColor();
    this.tentacles = [];
    this.eatingTimer = 0;
    this.eatingInterval = 2000 - (level * 100); // Faster eating at higher levels
    this.rotation = 0;
    this.pulsePhase = Math.random() * Math.PI * 2;
    
    // Generate tentacles
    for (let i = 0; i < 6; i++) {
      this.tentacles.push({
        angle: (Math.PI * 2 / 6) * i,
        length: this.size * 0.6,
        wave: Math.random() * Math.PI * 2
      });
    }
  }

  getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update(deltaTime) {
    // Move towards center with some randomness
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const dx = centerX - this.x;
    const dy = centerY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 100) {
      this.x += (dx / distance) * this.speed;
      this.y += (dy / distance) * this.speed;
    }
    
    // Add some wobble
    this.x += Math.sin(Date.now() * 0.001 + this.angle) * 0.5;
    this.y += Math.cos(Date.now() * 0.001 + this.angle) * 0.5;
    
    // Keep in bounds
    this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x));
    this.y = Math.max(this.size, Math.min(canvas.height - this.size, this.y));
    
    // Rotation and pulse
    this.rotation += 0.02;
    this.pulsePhase += 0.05;
    
    // Update tentacles
    this.tentacles.forEach(t => {
      t.wave += 0.1;
    });
    
    // Eating logic - remove letters based on mathematical formula
    this.eatingTimer += deltaTime;
    if (this.eatingTimer >= this.eatingInterval && this.word.length > 1) {
      this.eatLetter();
      this.eatingTimer = 0;
    }
  }

  eatLetter() {
    // Mathematical formula: eat from position based on Fibonacci-like sequence
    const len = this.word.length;
    let eatIndex;
    
    if (len <= 2) {
      eatIndex = 0;
    } else {
      // Use golden ratio for eating pattern
      const phi = (1 + Math.sqrt(5)) / 2;
      eatIndex = Math.floor(len / phi) % len;
    }
    
    this.word = this.word.slice(0, eatIndex) + this.word.slice(eatIndex + 1);
    
    // Create particle effect
    createParticles(this.x, this.y, '#ff0000', 5);
    
    if (this.word.length === 0) {
      lives--;
      return true; // Signal to remove this bacterium
    }
    return false;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    // Draw tentacles
    this.tentacles.forEach(t => {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.6;
      
      const waveOffset = Math.sin(t.wave) * 10;
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
    
    // Draw body with pulse effect
    const pulseSize = this.size + Math.sin(this.pulsePhase) * 5;
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, pulseSize);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(0.7, this.color + 'aa');
    gradient.addColorStop(1, this.color + '00');
    
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw core
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, pulseSize * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw eyes
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(-pulseSize * 0.15, -pulseSize * 0.1, pulseSize * 0.08, 0, Math.PI * 2);
    ctx.arc(pulseSize * 0.15, -pulseSize * 0.1, pulseSize * 0.08, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
    
    // Draw word above bacteria
    ctx.save();
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.textAlign = 'center';
    ctx.strokeText(this.word, this.x, this.y - this.size - 10);
    ctx.fillText(this.word, this.x, this.y - this.size - 10);
    ctx.restore();
    
    // Draw health bar
    const barWidth = 60;
    const barHeight = 6;
    const healthPercent = this.health / this.maxHealth;
    
    ctx.fillStyle = '#333333';
    ctx.fillRect(this.x - barWidth/2, this.y + this.size + 5, barWidth, barHeight);
    
    ctx.fillStyle = healthPercent > 0.5 ? '#00ff00' : healthPercent > 0.25 ? '#ffff00' : '#ff0000';
    ctx.fillRect(this.x - barWidth/2, this.y + this.size + 5, barWidth * healthPercent, barHeight);
  }

  takeDamage(damage) {
    this.health -= damage;
    createParticles(this.x, this.y, this.color, 10);
    return this.health <= 0;
  }

  split() {
    // Create two smaller bacteria
    const word1 = this.word.slice(0, Math.ceil(this.word.length / 2));
    const word2 = this.word.slice(Math.ceil(this.word.length / 2));
    
    if (word1.length > 0 && word2.length > 0) {
      const offset = 50;
      return [
        new Bacterium(word1, this.x - offset, this.y, this.speed * 1.2),
        new Bacterium(word2, this.x + offset, this.y, this.speed * 1.2)
      ];
    }
    return [];
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
    this.size = Math.random() * 4 + 2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.2; // Gravity
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
    const speed = Math.random() * 5 + 2;
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
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw trail
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = this.weapon.color;
    ctx.fillText(this.weapon.emoji, this.x - this.vx, this.y - this.vy);
    
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

// Extract words from page
function extractWords() {
  const textContent = document.body.innerText;
  const wordList = textContent
    .split(/\s+/)
    .filter(w => w.length >= 3 && w.length <= 10)
    .filter(w => /^[a-zA-Z]+$/.test(w))
    .map(w => w.toLowerCase());
  
  // Get unique words
  return [...new Set(wordList)].slice(0, 100);
}

// Initialize game
function initGame() {
  if (gameActive) return;
  
  words = extractWords();
  if (words.length < 10) {
    words = ['defend', 'shoot', 'type', 'quick', 'fast', 'game', 'word', 'bacteria', 'laser', 'missile', 
             'arrow', 'tank', 'score', 'combo', 'level', 'power', 'speed', 'attack', 'destroy', 'protect'];
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
          <div class="stat">🔥 Combo: <span id="combo">0</span></div>
          <div class="stat">📊 Level: <span id="level">1</span></div>
        </div>
        <div class="ui-bottom">
          <div id="input-display"></div>
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
  
  // Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Initialize game state
  gameActive = true;
  bacteria = [];
  particles = [];
  projectiles = [];
  score = 0;
  level = 1;
  lives = 3;
  currentInput = '';
  combo = 0;
  maxCombo = 0;
  lastMultiplyTime = Date.now();
  
  // Spawn initial bacteria
  spawnBacteria(3);
  
  // Setup weapon selector
  document.querySelectorAll('.weapon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.weapon-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      weaponType = btn.dataset.weapon;
    });
  });
  
  // Start game loop
  gameLoop();
  
  // Update stats
  updateStats();
}

function spawnBacteria(count) {
  for (let i = 0; i < count; i++) {
    const word = words[Math.floor(Math.random() * words.length)];
    const edge = Math.floor(Math.random() * 4);
    let x, y;
    
    switch(edge) {
      case 0: x = Math.random() * canvas.width; y = -50; break;
      case 1: x = canvas.width + 50; y = Math.random() * canvas.height; break;
      case 2: x = Math.random() * canvas.width; y = canvas.height + 50; break;
      case 3: x = -50; y = Math.random() * canvas.height; break;
    }
    
    bacteria.push(new Bacterium(word, x, y));
  }
}

function gameLoop() {
  if (!gameActive) return;
  
  // Clear canvas
  ctx.fillStyle = 'rgba(10, 10, 30, 0.3)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw grid background
  ctx.strokeStyle = 'rgba(100, 100, 255, 0.1)';
  ctx.lineWidth = 1;
  for (let i = 0; i < canvas.width; i += 50) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let i = 0; i < canvas.height; i += 50) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
  
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
    
    // Check collisions
    for (let i = bacteria.length - 1; i >= 0; i--) {
      if (p.checkCollision(bacteria[i])) {
        if (bacteria[i].takeDamage(p.weapon.damage)) {
          // Bacteria destroyed
          score += bacteria[i].originalWord.length * 10 * (combo + 1);
          combo++;
          maxCombo = Math.max(maxCombo, combo);
          createParticles(bacteria[i].x, bacteria[i].y, bacteria[i].color, 20);
          bacteria.splice(i, 1);
          
          // Update level
          if (score > level * 500) {
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
  bacteria.forEach((b, index) => {
    b.update(16);
    b.draw();
  });
  
  // Multiply bacteria every 5 seconds
  if (Date.now() - lastMultiplyTime > 5000 && bacteria.length < 20) {
    lastMultiplyTime = Date.now();
    if (bacteria.length > 0) {
      const randomBacterium = bacteria[Math.floor(Math.random() * bacteria.length)];
      const newBacteria = randomBacterium.split();
      bacteria.push(...newBacteria);
      
      // Visual feedback
      createParticles(randomBacterium.x, randomBacterium.y, '#ffff00', 15);
    }
    spawnBacteria(1);
  }
  
  // Spawn new bacteria if too few
  if (bacteria.length < 3) {
    spawnBacteria(1);
  }
  
  // Update UI
  document.getElementById('lives').textContent = lives;
  document.getElementById('score').textContent = score;
  document.getElementById('combo').textContent = combo;
  document.getElementById('level').textContent = level;
  document.getElementById('input-display').textContent = currentInput || 'Type to shoot...';
  
  // Check game over
  if (lives <= 0) {
    endGame();
    return;
  }
  
  animationId = requestAnimationFrame(gameLoop);
}

function handleTyping(char) {
  if (!gameActive) return;
  
  currentInput += char.toLowerCase();
  
  // Check if any bacteria word starts with current input
  let matchFound = false;
  for (let i = 0; i < bacteria.length; i++) {
    if (bacteria[i].word.startsWith(currentInput)) {
      matchFound = true;
      
      // If complete match, shoot!
      if (bacteria[i].word === currentInput) {
        shootProjectile(bacteria[i]);
        currentInput = '';
        break;
      }
    }
  }
  
  // Reset if no match
  if (!matchFound) {
    currentInput = char.toLowerCase();
    combo = 0;
    
    // Check again with just the new character
    for (let i = 0; i < bacteria.length; i++) {
      if (bacteria[i].word.startsWith(currentInput)) {
        matchFound = true;
        break;
      }
    }
    
    if (!matchFound) {
      currentInput = '';
    }
  }
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
  
  // Save stats
  const stats = await chrome.storage.local.get(['highScore', 'gamesPlayed', 'totalKills']);
  const newHighScore = Math.max(score, stats.highScore || 0);
  const totalKills = (stats.totalKills || 0) + Math.floor(score / 100);
  
  await chrome.storage.local.set({
    highScore: newHighScore,
    gamesPlayed: (stats.gamesPlayed || 0) + 1,
    totalKills: totalKills
  });
  
  // Show game over screen
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 60px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 100);
  
  ctx.font = 'bold 30px Arial';
  ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 - 20);
  ctx.fillText(`Max Combo: ${maxCombo}`, canvas.width / 2, canvas.height / 2 + 20);
  ctx.fillText(`Level Reached: ${level}`, canvas.width / 2, canvas.height / 2 + 60);
  
  if (score === newHighScore && score > 0) {
    ctx.fillStyle = '#ffd700';
    ctx.fillText('🏆 NEW HIGH SCORE! 🏆', canvas.width / 2, canvas.height / 2 + 120);
  }
  
  ctx.fillStyle = '#aaaaaa';
  ctx.font = '20px Arial';
  ctx.fillText('Press ESC to exit', canvas.width / 2, canvas.height / 2 + 180);
}

function updateStats() {
  // This function can be called to update UI stats
}

function closeGame() {
  gameActive = false;
  
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  if (gameContainer) {
    gameContainer.remove();
    gameContainer = null;
  }
  
  canvas = null;
  ctx = null;
  bacteria = [];
  particles = [];
  projectiles = [];
}

// Event listeners
document.addEventListener('keydown', (e) => {
  if (!gameActive) return;
  
  if (e.key === 'Escape') {
    closeGame();
    return;
  }
  
  if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
    e.preventDefault();
    handleTyping(e.key);
  }
  
  // Weapon shortcuts
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

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startGame') {
    if (!gameActive) {
      initGame();
    }
  }
});
