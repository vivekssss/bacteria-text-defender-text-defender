// REALISTIC TEXT EATER - Bacteria appear ON the webpage and eat real text!

let gameActive = false;
let gameUI = null;
let darkOverlay = null;
let bacteria = [];
let particles = [];
let projectiles = [];
let score = 0;
let level = 1;
let lives = 999; // Infinite lives!
let textNodes = [];
let animationId = null;
let lastSpawnTime = Date.now();
let weaponType = 'laser';
let difficulty = 'medium';
let bombsAvailable = 0;
let killCount = 0;

// Difficulty settings
const difficultySettings = {
  easy: {
    bacteriaSpeed: 0.5,
    eatingInterval: 3000,
    spawnInterval: 8000,
    initialBacteria: 2,
    maxBacteria: 8,
    bombEvery: 15
  },
  medium: {
    bacteriaSpeed: 1,
    eatingInterval: 2000,
    spawnInterval: 5000,
    initialBacteria: 3,
    maxBacteria: 12,
    bombEvery: 20
  },
  hard: {
    bacteriaSpeed: 1.5,
    eatingInterval: 1500,
    spawnInterval: 3000,
    initialBacteria: 5,
    maxBacteria: 15,
    bombEvery: 25
  }
};

// Weapons
const weapons = {
  laser: { 
    name: '⚡ Laser', 
    damage: 2, 
    speed: 20, 
    color: '#00ffff',
    size: 8,
    trail: true 
  },
  missile: { 
    name: '🚀 Missile', 
    damage: 5, 
    speed: 12, 
    color: '#ff6600',
    size: 15,
    explosion: true 
  },
  gun: { 
    name: '🔫 Gun', 
    damage: 1, 
    speed: 25, 
    color: '#ffff00',
    size: 5,
    trail: false 
  }
};

// Text node tracking
class TextElement {
  constructor(node) {
    this.node = node;
    this.originalText = node.textContent;
    this.currentText = node.textContent;
    const rect = node.parentElement.getBoundingClientRect();
    this.x = rect.left + rect.width / 2 + window.scrollX;
    this.y = rect.top + rect.height / 2 + window.scrollY;
  }

  eatCharacter(bacteriumX, bacteriumY) {
    if (this.currentText.length > 0) {
      // Eat from the character closest to bacteria position
      const charWidth = this.node.parentElement.getBoundingClientRect().width / this.currentText.length;
      const relativeX = bacteriumX - (this.node.parentElement.getBoundingClientRect().left + window.scrollX);
      const pos = Math.max(0, Math.min(this.currentText.length - 1, Math.floor(relativeX / charWidth)));
      this.currentText = this.currentText.slice(0, pos) + this.currentText.slice(pos + 1);
      this.node.textContent = this.currentText;
      return true;
    }
    return false;
  }

  restore() {
    this.node.textContent = this.originalText;
  }
}

// Bacterium class - appears as HTML element on page
class Bacterium {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.settings = difficultySettings[difficulty];
    this.speed = this.settings.bacteriaSpeed * (0.8 + Math.random() * 0.4);
    this.size = 40 + Math.random() * 20;
    this.health = 3 + level;
    this.maxHealth = 3 + level;
    this.color = this.getRandomColor();
    this.element = this.createElement();
    this.targetX = Math.random() * window.innerWidth + window.scrollX;
    this.targetY = Math.random() * window.innerHeight + window.scrollY;
    this.eatingTimer = 0;
    this.charsEaten = 0;
    this.rotation = 0;
    
    document.body.appendChild(this.element);
    this.updatePosition();
  }

  getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  createElement() {
    const div = document.createElement('div');
    div.className = 'word-defender-bacterium';
    div.innerHTML = `
      <div class="bacterium-body" style="background: ${this.color};">
        <div class="eye left"></div>
        <div class="eye right"></div>
        <div class="mouth"></div>
        <div class="tentacle" style="--angle: 0deg;"></div>
        <div class="tentacle" style="--angle: 45deg;"></div>
        <div class="tentacle" style="--angle: 90deg;"></div>
        <div class="tentacle" style="--angle: 135deg;"></div>
        <div class="tentacle" style="--angle: 180deg;"></div>
        <div class="tentacle" style="--angle: 225deg;"></div>
        <div class="tentacle" style="--angle: 270deg;"></div>
        <div class="tentacle" style="--angle: 315deg;"></div>
      </div>
      <div class="health-bar">
        <div class="health-fill" style="width: 100%;"></div>
      </div>
      <div class="eaten-count">0</div>
    `;
    
    div.style.cssText = `
      position: absolute;
      width: ${this.size}px;
      height: ${this.size}px;
      pointer-events: all;
      cursor: crosshair;
      z-index: 999997;
      transition: transform 0.1s;
    `;
    
    div.addEventListener('click', () => this.onClick());
    return div;
  }

  onClick() {
    if (!gameActive) return;
    shootProjectile(this);
  }

  updatePosition() {
    if (!this.element) return;
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.element.style.transform = `rotate(${this.rotation}deg)`;
  }

  update(deltaTime) {
    // Move toward target
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < 20) {
      this.targetX = Math.random() * window.innerWidth + window.scrollX;
      this.targetY = Math.random() * (document.body.scrollHeight - window.innerHeight) + window.scrollY;
    } else {
      this.x += (dx / dist) * this.speed;
      this.y += (dy / dist) * this.speed;
    }
    
    this.rotation += 1;
    this.updatePosition();
    
    // Eat nearby text
    this.eatingTimer += deltaTime;
    if (this.eatingTimer >= this.settings.eatingInterval) {
      this.eatNearbyText();
      this.eatingTimer = 0;
    }
  }

  eatNearbyText() {
    const eatRadius = 200;
    const nearby = textNodes.filter(t => {
      const dx = t.x - this.x;
      const dy = t.y - this.y;
      return Math.sqrt(dx * dx + dy * dy) < eatRadius && t.currentText.length > 0;
    });

    if (nearby.length > 0) {
      nearby.sort((a, b) => {
        const distA = Math.sqrt((a.x - this.x) ** 2 + (a.y - this.y) ** 2);
        const distB = Math.sqrt((b.x - this.x) ** 2 + (b.y - this.y) ** 2);
        return distA - distB;
      });

      if (nearby[0].eatCharacter(this.x + this.size/2, this.y + this.size/2)) {
        this.charsEaten++;
        this.element.querySelector('.eaten-count').textContent = this.charsEaten;
        createParticle(this.x + this.size/2, this.y + this.size/2, '#ff0000');
        
        // Infinite lives - no game over!
      }
    }
  }

  takeDamage(damage) {
    this.health -= damage;
    const healthPercent = Math.max(0, (this.health / this.maxHealth) * 100);
    const healthBar = this.element.querySelector('.health-fill');
    if (healthBar) {
      healthBar.style.width = healthPercent + '%';
      healthBar.style.background = healthPercent > 50 ? '#00ff00' : healthPercent > 25 ? '#ffff00' : '#ff0000';
    }
    
    createParticle(this.x + this.size/2, this.y + this.size/2, this.color);
    
    return this.health <= 0;
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.style.animation = 'bacteriumExplode 0.3s ease-out';
      setTimeout(() => {
        if (this.element && this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }
      }, 300);
    }
    
    for (let i = 0; i < 15; i++) {
      createParticle(this.x + this.size/2, this.y + this.size/2, this.color);
    }
  }
}

// Projectile class
class Projectile {
  constructor(x, y, targetX, targetY, weapon) {
    this.x = x;
    this.y = y;
    this.weapon = weapon;
    const dx = targetX - x;
    const dy = targetY - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    this.vx = (dx / dist) * weapon.speed;
    this.vy = (dy / dist) * weapon.speed;
    this.element = this.createElement();
    this.life = 100;
    
    document.body.appendChild(this.element);
    this.updatePosition();
  }

  createElement() {
    const div = document.createElement('div');
    div.className = 'word-defender-projectile';
    div.style.cssText = `
      position: absolute;
      width: ${this.weapon.size}px;
      height: ${this.weapon.size}px;
      background: ${this.weapon.color};
      border-radius: 50%;
      box-shadow: 0 0 10px ${this.weapon.color};
      z-index: 999998;
      pointer-events: none;
    `;
    return div;
  }

  updatePosition() {
    if (this.element) {
      this.element.style.left = this.x + 'px';
      this.element.style.top = this.y + 'px';
    }
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    this.updatePosition();
    
    if (this.weapon.trail) {
      createParticle(this.x, this.y, this.weapon.color);
    }
  }

  checkCollision(bacterium) {
    const dx = this.x - (bacterium.x + bacterium.size/2);
    const dy = this.y - (bacterium.y + bacterium.size/2);
    return Math.sqrt(dx * dx + dy * dy) < bacterium.size/2;
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    
    if (this.weapon.explosion) {
      for (let i = 0; i < 10; i++) {
        createParticle(this.x, this.y, this.weapon.color);
      }
    }
  }
}

// Particle system
function createParticle(x, y, color) {
  const particle = document.createElement('div');
  particle.className = 'word-defender-particle';
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 5 + 2;
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;
  
  particle.style.cssText = `
    position: absolute;
    width: 5px;
    height: 5px;
    background: ${color};
    border-radius: 50%;
    left: ${x}px;
    top: ${y}px;
    z-index: 999999;
    pointer-events: none;
  `;
  
  document.body.appendChild(particle);
  
  let life = 1;
  const interval = setInterval(() => {
    const currentX = parseFloat(particle.style.left);
    const currentY = parseFloat(particle.style.top);
    particle.style.left = (currentX + vx) + 'px';
    particle.style.top = (currentY + vy + 0.5) + 'px';
    particle.style.opacity = life;
    life -= 0.05;
    
    if (life <= 0) {
      clearInterval(interval);
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }
  }, 16);
}

// Extract text nodes
function extractTextNodes() {
  textNodes = [];
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        if (node.parentElement.closest('.word-defender-ui, .word-defender-bacterium, script, style')) {
          return NodeFilter.FILTER_REJECT;
        }
        if (node.textContent.trim().length > 10) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      }
    }
  );

  let node;
  while (node = walker.nextNode()) {
    textNodes.push(new TextElement(node));
  }
}

// Shoot projectile
function shootProjectile(target) {
  const proj = new Projectile(
    window.innerWidth / 2 + window.scrollX,
    window.innerHeight - 50 + window.scrollY,
    target.x + target.size/2,
    target.y + target.size/2,
    weapons[weaponType]
  );
  projectiles.push(proj);
}

// Use bomb - destroys all bacteria
function useBomb() {
  if (bombsAvailable <= 0) return;
  
  bombsAvailable--;
  updateUI();
  
  // Visual effect
  const flash = document.createElement('div');
  flash.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 0, 0.5);
    z-index: 999999;
    pointer-events: none;
    animation: bombFlash 0.5s ease-out;
  `;
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 500);
  
  // Destroy all bacteria
  bacteria.forEach(b => {
    b.destroy();
    score += 50;
  });
  bacteria = [];
  killCount += bacteria.length;
  updateUI();
}

// Initialize game
function initGame() {
  if (gameActive) return;
  
  extractTextNodes();
  
  if (textNodes.length < 5) {
    alert('Not enough text on this page! Try Wikipedia or a news site.');
    return;
  }
  
  // Add CSS
  if (!document.getElementById('word-defender-styles')) {
    const style = document.createElement('style');
    style.id = 'word-defender-styles';
    style.textContent = `
      .word-defender-bacterium {
        animation: bacteriumFloat 3s ease-in-out infinite;
      }
      
      .bacterium-body {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: relative;
        box-shadow: 0 0 20px rgba(0,0,0,0.3);
        animation: bacteriumPulse 1.5s ease-in-out infinite;
      }
      
      .tentacle {
        position: absolute;
        width: 3px;
        height: 60%;
        background: inherit;
        top: 50%;
        left: 50%;
        transform-origin: top center;
        transform: translateX(-50%) rotate(var(--angle)) translateY(-50%);
        opacity: 0.7;
        animation: tentacleWave 2s ease-in-out infinite;
      }
      
      .eye {
        position: absolute;
        width: 20%;
        height: 20%;
        background: white;
        border-radius: 50%;
        top: 30%;
      }
      
      .eye::after {
        content: '';
        position: absolute;
        width: 50%;
        height: 50%;
        background: black;
        border-radius: 50%;
        top: 25%;
        left: 25%;
      }
      
      .eye.left { left: 25%; }
      .eye.right { right: 25%; }
      
      .mouth {
        position: absolute;
        width: 30%;
        height: 15%;
        border: 2px solid black;
        border-radius: 0 0 50% 50%;
        border-top: none;
        bottom: 25%;
        left: 35%;
      }
      
      .health-bar {
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333;
        border-radius: 2px;
      }
      
      .health-fill {
        height: 100%;
        background: #00ff00;
        border-radius: 2px;
        transition: width 0.3s, background 0.3s;
      }
      
      .eaten-count {
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-weight: bold;
        text-shadow: 0 0 3px black;
        font-size: 12px;
      }
      
      @keyframes bacteriumFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(180deg); }
      }
      
      @keyframes bacteriumPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      
      @keyframes tentacleWave {
        0%, 100% { transform: translateX(-50%) rotate(var(--angle)) translateY(-50%) scaleY(1); }
        50% { transform: translateX(-50%) rotate(var(--angle)) translateY(-50%) scaleY(1.3); }
      }
      
      @keyframes bacteriumExplode {
        to { transform: scale(2); opacity: 0; }
      }
      
      @keyframes bombFlash {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Create UI
  gameUI = document.createElement('div');
  gameUI.className = 'word-defender-ui';
  gameUI.innerHTML = `
    <div class="game-controls">
      <div class="stat-row">
        <div class="stat">❤️ <span id="wd-lives">3</span></div>
        <div class="stat">🎯 <span id="wd-score">0</span></div>
        <div class="stat">📊 Level <span id="wd-level">1</span></div>
        <div class="stat">🦠 <span id="wd-bacteria">0</span></div>
      </div>
      <div class="weapon-row">
        <button class="weapon-btn active" data-weapon="laser">⚡ Laser</button>
        <button class="weapon-btn" data-weapon="missile">🚀 Missile</button>
        <button class="weapon-btn" data-weapon="gun">🔫 Gun</button>
        <button class="bomb-btn" id="wd-bomb">💣 Bomb (<span id="wd-bomb-count">0</span>)</button>
      </div>
      <div class="difficulty-row">
        <button class="diff-btn ${difficulty==='easy'?'active':''}" data-diff="easy">Easy</button>
        <button class="diff-btn ${difficulty==='medium'?'active':''}" data-diff="medium">Medium</button>
        <button class="diff-btn ${difficulty==='hard'?'active':''}" data-diff="hard">Hard</button>
      </div>
      <button class="exit-btn">❌ Exit Game</button>
    </div>
  `;
  
  gameUI.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.85);
    padding: 15px;
    border-radius: 10px;
    color: white;
    font-family: Arial;
    z-index: 999999;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  `;
  
  document.body.appendChild(gameUI);
  
  // Event listeners
  gameUI.querySelectorAll('.weapon-btn').forEach(btn => {
    btn.onclick = () => {
      gameUI.querySelectorAll('.weapon-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      weaponType = btn.dataset.weapon;
    };
  });
  
  gameUI.querySelectorAll('.diff-btn').forEach(btn => {
    btn.onclick = () => {
      gameUI.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      difficulty = btn.dataset.diff;
      resetGame();
    };
  });
  
  document.getElementById('wd-bomb').onclick = useBomb;
  gameUI.querySelector('.exit-btn').onclick = closeGame;
  
  // Initialize game state
  gameActive = true;
  score = 0;
  lives = 3;
  level = 1;
  bacteria = [];
  projectiles = [];
  bombsAvailable = 0;
  killCount = 0;
  
  // Spawn initial bacteria
  const settings = difficultySettings[difficulty];
  for (let i = 0; i < settings.initialBacteria; i++) {
    spawnBacterium();
  }
  
  gameLoop();
  updateUI();
}

function spawnBacterium() {
  const settings = difficultySettings[difficulty];
  if (bacteria.length >= settings.maxBacteria) return;
  
  const edge = Math.floor(Math.random() * 4);
  let x, y;
  
  switch(edge) {
    case 0: x = Math.random() * window.innerWidth + window.scrollX; y = window.scrollY; break;
    case 1: x = window.innerWidth + window.scrollX; y = Math.random() * window.innerHeight + window.scrollY; break;
    case 2: x = Math.random() * window.innerWidth + window.scrollX; y = window.innerHeight + window.scrollY; break;
    case 3: x = window.scrollX; y = Math.random() * window.innerHeight + window.scrollY; break;
  }
  
  bacteria.push(new Bacterium(x, y));
  updateUI();
}

function gameLoop() {
  if (!gameActive) return;
  
  const now = Date.now();
  const settings = difficultySettings[difficulty];
  
  // Spawn new bacteria
  if (now - lastSpawnTime > settings.spawnInterval) {
    spawnBacterium();
    lastSpawnTime = now;
  }
  
  // Update bacteria
  bacteria.forEach(b => b.update(16));
  
  // Update projectiles
  projectiles = projectiles.filter(p => {
    p.update();
    
    // Check collisions
    for (let i = bacteria.length - 1; i >= 0; i--) {
      if (p.checkCollision(bacteria[i])) {
        if (bacteria[i].takeDamage(p.weapon.damage)) {
          bacteria[i].destroy();
          bacteria.splice(i, 1);
          score += 100;
          killCount++;
          
          // Award bomb every X kills
          if (killCount % settings.bombEvery === 0) {
            bombsAvailable++;
          }
          
          // Level up
          if (score > level * 500) {
            level++;
          }
          
          updateUI();
        }
        p.destroy();
        return false;
      }
    }
    
    if (p.life <= 0) {
      p.destroy();
      return false;
    }
    
    return true;
  });
  
  // No game over - infinite gameplay!
  
  animationId = requestAnimationFrame(gameLoop);
}

function updateUI() {
  if (!gameUI) return;
  document.getElementById('wd-lives').textContent = lives;
  document.getElementById('wd-score').textContent = score;
  document.getElementById('wd-level').textContent = level;
  document.getElementById('wd-bacteria').textContent = bacteria.length;
  document.getElementById('wd-bomb-count').textContent = bombsAvailable;
}

function resetGame() {
  bacteria.forEach(b => b.destroy());
  bacteria = [];
  projectiles.forEach(p => p.destroy());
  projectiles = [];
  score = 0;
  lives = 3;
  level = 1;
  bombsAvailable = 0;
  killCount = 0;
  
  const settings = difficultySettings[difficulty];
  for (let i = 0; i < settings.initialBacteria; i++) {
    spawnBacterium();
  }
  
  updateUI();
}

function endGame() {
  gameActive = false;
  
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  // Restore text
  textNodes.forEach(t => t.restore());
  
  alert(`GAME OVER!\n\nScore: ${score}\nLevel: ${level}\nKills: ${killCount}\n\nClick OK to exit.`);
  closeGame();
}

function closeGame() {
  gameActive = false;
  
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  bacteria.forEach(b => b.destroy());
  projectiles.forEach(p => p.destroy());
  
  textNodes.forEach(t => t.restore());
  
  if (gameUI && gameUI.parentNode) {
    gameUI.parentNode.removeChild(gameUI);
  }
  
  bacteria = [];
  projectiles = [];
  textNodes = [];
  gameUI = null;
}

// Listen for start message
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'startGame') {
    if (!gameActive) {
      initGame();
    }
  }
});
