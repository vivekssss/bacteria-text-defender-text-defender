# 🦠 Word Defender - Chrome Extension Game

An exciting typing shooter game where you defend words from bacteria by typing them out! Inspired by games like Ztype and Typing of the Dead.

## 🎮 Game Features

### Core Gameplay
- **Word-Eating Bacteria**: Bacteria spawn with words attached and slowly eat letters using mathematical formulas (Fibonacci/Golden Ratio pattern)
- **Type to Shoot**: Type the word displayed on a bacterium to shoot it down
- **Multiple Weapons**: Choose from 5 different weapon types:
  - ⚡ **Laser** (Fast, standard damage)
  - 🏹 **Bow** (Medium speed, precise)
  - 🚀 **Missile** (Slower, double damage)
  - 💥 **Tank** (Slowest, triple damage)
  - ⚪ **Pebble** (Fastest, standard damage)

### Advanced Mechanics
- **Bacteria Multiplication**: Every 5 seconds, bacteria split and multiply
- **Progressive Difficulty**: Bacteria speed and eating rate increase with each level
- **Combo System**: Chain kills for score multipliers
- **Lives System**: Lose lives when bacteria completely eat their words
- **Dynamic Word Extraction**: Uses words from the current webpage

### Visual Effects
- Animated bacteria with tentacles and pulsing effects
- Particle systems for explosions and hits
- Weapon trails and projectile effects
- Health bars for each bacterium
- Glowing UI elements with animations
- Grid background with transparency effects

### Scoring System
- Base points: Word length × 10
- Combo multiplier: (Combo count + 1)
- Level progression at 500 point intervals
- High score tracking across sessions
- Total kills and games played statistics

## 🚀 Installation

1. **Download/Clone** this repository to your local machine
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** (toggle in top-right corner)
4. **Click "Load unpacked"** and select the `word-defender` folder
5. The extension icon will appear in your toolbar

## 🎯 How to Play

1. **Start the Game**:
   - Click the extension icon in your toolbar
   - Click "Start Game" button
   - The game will overlay on your current webpage

2. **Controls**:
   - **Type letters** to target and shoot bacteria
   - **Number keys (1-5)** to switch weapons
   - **ESC** to pause/exit the game

3. **Objective**:
   - Type the words shown on bacteria to destroy them
   - Don't let bacteria eat all their letters
   - Survive as long as possible and get the highest score

4. **Tips**:
   - Focus on bacteria closest to the center
   - Build combos for higher scores
   - Switch weapons based on situation (fast weapons for quick kills, heavy weapons for tough bacteria)
   - Watch for multiplication events every 5 seconds

## 📊 Statistics Tracked

- **High Score**: Your best score ever
- **Games Played**: Total number of games
- **Total Kills**: Cumulative bacteria destroyed

## 🎨 Technical Features

### Game Engine
- Canvas-based rendering with 60 FPS
- Particle system for visual effects
- Collision detection system
- Dynamic difficulty scaling
- State management for game flow

### Bacteria AI
- Pathfinding towards center
- Mathematical letter-eating pattern (Golden Ratio)
- Health and damage system
- Splitting/multiplication mechanics
- Animated tentacles and pulsing

### Weapon System
- 5 unique weapon types with different stats
- Projectile physics
- Trail effects
- Damage calculations

### UI/UX
- Modern glassmorphism design
- Responsive layout
- Real-time stat updates
- Smooth animations
- Color-coded feedback

## 🛠️ File Structure

```
word-defender/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup interface
├── popup.js              # Popup logic and stats
├── content.js            # Main game engine
├── game.css              # Game styling and animations
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This file
```

## 🎮 Game Mechanics Deep Dive

### Letter Eating Algorithm
Bacteria use a Fibonacci-based pattern to eat letters:
```javascript
const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
eatIndex = Math.floor(len / phi) % len;
```

### Multiplication System
- Occurs every 5 seconds
- Random bacterium splits into two
- Each child gets half the word
- Speed increases by 20%
- Maximum 20 bacteria on screen

### Scoring Formula
```
Score = WordLength × 10 × (Combo + 1)
```

### Level Progression
- New level every 500 points
- Bacteria speed increases
- Eating rate increases
- More bacteria spawn

## 🎨 Customization

You can customize the game by editing `content.js`:

- **Weapon Stats**: Modify the `weapons` object
- **Colors**: Change bacteria colors in `getRandomColor()`
- **Difficulty**: Adjust spawn rates, multiplication timers
- **Visual Effects**: Modify particle counts and animations

## 🐛 Known Limitations

- Works best on pages with sufficient text content
- Performance may vary on very complex pages
- Some websites with strict CSP may block the overlay

## 🔮 Future Enhancements

- Power-ups and special abilities
- Boss bacteria with special patterns
- Leaderboard system
- Sound effects and music
- More weapon types
- Achievements system
- Difficulty modes

## 📝 Credits

Inspired by:
- **Ztype** - The classic typing shooter
- **Typing of the Dead** - Typing game mechanics
- **Agar.io** - Bacteria visual style

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and improve this game! Some ideas:
- Add new weapon types
- Create different bacteria species
- Implement multiplayer features
- Add sound effects
- Create mobile version

---

**Enjoy defending words from bacteria! Type fast, aim true, and may your combos be ever high! 🎯🦠**
