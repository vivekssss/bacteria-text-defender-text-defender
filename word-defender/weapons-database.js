// Comprehensive weapons database - 50 unique weapons
// Weapons unlock as player levels up

const weaponsDatabase = [
  // Starting weapons (Level 1)
  { id: 'laser', name: '⚡ Laser', damage: 2, speed: 20, color: '#00ffff', size: 8, trail: true, visual: '⚡', unlockLevel: 1 },
  { id: 'gun', name: '🔫 Gun', damage: 1, speed: 25, color: '#ffff00', size: 5, trail: false, visual: '🔫', unlockLevel: 1 },
  { id: 'missile', name: '🚀 Missile', damage: 5, speed: 12, color: '#ff6600', size: 15, explosion: true, visual: '🚀', unlockLevel: 1 },
  
  // Level 2
  { id: 'bow', name: '🏹 Bow', damage: 3, speed: 18, color: '#8B4513', size: 10, trail: true, visual: '🏹', unlockLevel: 2 },
  { id: 'sword', name: '⚔️ Sword', damage: 4, speed: 15, color: '#C0C0C0', size: 12, trail: false, visual: '⚔️', unlockLevel: 2 },
  
  // Level 3
  { id: 'axe', name: '🪓 Axe', damage: 6, speed: 10, color: '#8B4513', size: 14, trail: false, visual: '🪓', unlockLevel: 3 },
  { id: 'hammer', name: '🔨 Hammer', damage: 5, speed: 12, color: '#696969', size: 13, trail: false, visual: '🔨', unlockLevel: 3 },
  
  // Level 4
  { id: 'wrench', name: '🔧 Wrench', damage: 3, speed: 16, color: '#4169E1', size: 10, trail: false, visual: '🔧', unlockLevel: 4 },
  { id: 'knife', name: '🔪 Knife', damage: 2, speed: 22, color: '#DC143C', size: 8, trail: true, visual: '🔪', unlockLevel: 4 },
  
  // Level 5
  { id: 'bomb_item', name: '💣 Bomb', damage: 10, speed: 8, color: '#FF4500', size: 16, explosion: true, visual: '💣', unlockLevel: 5 },
  { id: 'dynamite', name: '🧨 Dynamite', damage: 8, speed: 10, color: '#FF6347', size: 14, explosion: true, visual: '🧨', unlockLevel: 5 },
  
  // Level 6
  { id: 'pebble', name: '⚪ Pebble', damage: 1, speed: 30, color: '#808080', size: 6, trail: false, visual: '⚪', unlockLevel: 6 },
  { id: 'baseball', name: '⚾ Baseball', damage: 2, speed: 24, color: '#FFFFFF', size: 8, trail: false, visual: '⚾', unlockLevel: 6 },
  
  // Level 7
  { id: 'basketball', name: '🏀 Basketball', damage: 4, speed: 14, color: '#FF8C00', size: 12, trail: false, visual: '🏀', unlockLevel: 7 },
  { id: 'football', name: '🏈 Football', damage: 3, speed: 18, color: '#8B4513', size: 10, trail: false, visual: '🏈', unlockLevel: 7 },
  
  // Level 8
  { id: 'soccer', name: '⚽ Soccer Ball', damage: 3, speed: 19, color: '#000000', size: 10, trail: false, visual: '⚽', unlockLevel: 8 },
  { id: 'bowling', name: '🎳 Bowling Ball', damage: 7, speed: 9, color: '#000000', size: 15, trail: false, visual: '🎳', unlockLevel: 8 },
  
  // Level 9
  { id: 'shoes', name: '👟 Shoes', damage: 4, speed: 15, color: '#ff1493', size: 12, trail: false, visual: '👟', unlockLevel: 9 },
  { id: 'boot', name: '🥾 Boot', damage: 5, speed: 13, color: '#8B4513', size: 13, trail: false, visual: '🥾', unlockLevel: 9 },
  
  // Level 10
  { id: 'sandal', name: '🩴 Sandal', damage: 2, speed: 20, color: '#FFD700', size: 9, trail: false, visual: '🩴', unlockLevel: 10 },
  { id: 'heels', name: '👠 High Heel', damage: 6, speed: 11, color: '#FF1493', size: 14, trail: false, visual: '👠', unlockLevel: 10 },
  
  // Level 11
  { id: 'furniture', name: '🪑 Chair', damage: 6, speed: 8, color: '#8B4513', size: 20, trail: false, visual: '🪑', unlockLevel: 11 },
  { id: 'couch', name: '🛋️ Couch', damage: 10, speed: 5, color: '#8B4513', size: 25, trail: false, visual: '🛋️', unlockLevel: 11 },
  
  // Level 12
  { id: 'bed', name: '🛏️ Bed', damage: 12, speed: 4, color: '#F5F5DC', size: 28, trail: false, visual: '🛏️', unlockLevel: 12 },
  { id: 'door', name: '🚪 Door', damage: 8, speed: 7, color: '#8B4513', size: 22, trail: false, visual: '🚪', unlockLevel: 12 },
  
  // Level 13
  { id: 'electronics', name: '📱 Phone', damage: 3, speed: 16, color: '#00ff00', size: 10, trail: true, visual: '📱', unlockLevel: 13 },
  { id: 'laptop', name: '💻 Laptop', damage: 5, speed: 12, color: '#708090', size: 14, trail: false, visual: '💻', unlockLevel: 13 },
  
  // Level 14
  { id: 'computer', name: '🖥️ Computer', damage: 6, speed: 10, color: '#2F4F4F', size: 16, trail: false, visual: '🖥️', unlockLevel: 14 },
  { id: 'keyboard', name: '⌨️ Keyboard', damage: 4, speed: 14, color: '#000000', size: 12, trail: false, visual: '⌨️', unlockLevel: 14 },
  
  // Level 15
  { id: 'mouse', name: '🖱️ Mouse', damage: 2, speed: 20, color: '#696969', size: 8, trail: false, visual: '🖱️', unlockLevel: 15 },
  { id: 'printer', name: '🖨️ Printer', damage: 7, speed: 8, color: '#708090', size: 18, trail: false, visual: '🖨️', unlockLevel: 15 },
  
  // Level 16
  { id: 'camera', name: '📷 Camera', damage: 4, speed: 15, color: '#000000', size: 11, trail: true, visual: '📷', unlockLevel: 16 },
  { id: 'tv', name: '📺 TV', damage: 9, speed: 6, color: '#2F4F4F', size: 24, trail: false, visual: '📺', unlockLevel: 16 },
  
  // Level 17
  { id: 'microwave', name: '📟 Microwave', damage: 8, speed: 7, color: '#C0C0C0', size: 20, trail: false, visual: '📟', unlockLevel: 17 },
  { id: 'radio', name: '📻 Radio', damage: 3, speed: 17, color: '#8B4513', size: 10, trail: false, visual: '📻', unlockLevel: 17 },
  
  // Level 18
  { id: 'clock', name: '⏰ Alarm Clock', damage: 4, speed: 14, color: '#FF0000', size: 11, trail: false, visual: '⏰', unlockLevel: 18 },
  { id: 'watch', name: '⌚ Watch', damage: 2, speed: 22, color: '#FFD700', size: 7, trail: false, visual: '⌚', unlockLevel: 18 },
  
  // Level 19
  { id: 'trophy', name: '🏆 Trophy', damage: 6, speed: 11, color: '#FFD700', size: 14, trail: true, visual: '🏆', unlockLevel: 19 },
  { id: 'medal', name: '🥇 Medal', damage: 5, speed: 13, color: '#FFD700', size: 12, trail: true, visual: '🥇', unlockLevel: 19 },
  
  // Level 20
  { id: 'crown', name: '👑 Crown', damage: 10, speed: 10, color: '#FFD700', size: 18, trail: true, visual: '👑', unlockLevel: 20 },
  { id: 'gem', name: '💎 Diamond', damage: 15, speed: 8, color: '#00FFFF', size: 16, trail: true, visual: '💎', unlockLevel: 20 },
  
  // Level 21-25
  { id: 'ring', name: '💍 Ring', damage: 8, speed: 16, color: '#FFD700', size: 10, trail: true, visual: '💍', unlockLevel: 21 },
  { id: 'coin', name: '🪙 Coin', damage: 3, speed: 25, color: '#FFD700', size: 8, trail: false, visual: '🪙', unlockLevel: 22 },
  { id: 'crystal', name: '🔮 Crystal Ball', damage: 12, speed: 9, color: '#9370DB', size: 17, trail: true, visual: '🔮', unlockLevel: 23 },
  { id: 'magnet', name: '🧲 Magnet', damage: 5, speed: 14, color: '#DC143C', size: 11, trail: false, visual: '🧲', unlockLevel: 24 },
  { id: 'battery', name: '🔋 Battery', damage: 4, speed: 18, color: '#00FF00', size: 9, trail: true, visual: '🔋', unlockLevel: 25 },
  
  // Level 26-30
  { id: 'bulb', name: '💡 Light Bulb', damage: 3, speed: 19, color: '#FFFF00', size: 10, trail: true, visual: '💡', unlockLevel: 26 },
  { id: 'candle', name: '🕯️ Candle', damage: 2, speed: 15, color: '#FFA500', size: 8, trail: true, visual: '🕯️', unlockLevel: 27 },
  { id: 'fire', name: '🔥 Fire', damage: 10, speed: 12, color: '#FF4500', size: 15, trail: true, visual: '🔥', unlockLevel: 28 },
  { id: 'lightning', name: '⚡ Lightning', damage: 20, speed: 30, color: '#FFFF00', size: 12, trail: true, visual: '⚡', unlockLevel: 29 },
  { id: 'star', name: '⭐ Star', damage: 25, speed: 20, color: '#FFD700', size: 18, trail: true, visual: '⭐', unlockLevel: 30 }
];

// Function to get weapons available at a given level
function getAvailableWeapons(level) {
  return weaponsDatabase.filter(w => w.unlockLevel <= level);
}

// Function to get newly unlocked weapons at a level
function getNewlyUnlockedWeapons(level) {
  return weaponsDatabase.filter(w => w.unlockLevel === level);
}
