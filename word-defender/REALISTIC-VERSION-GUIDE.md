# 🦠 Word Defender - REALISTIC VERSION

## ✨ This is EXACTLY What You Asked For!

Bacteria appear **directly on the webpage** (not blocking your view), they eat the actual text, and you get:
- ✅ **3 Difficulty Levels** (Easy, Medium, Hard)
- ✅ **Bomb Power-up** 💣 - Destroys ALL bacteria at once!
- ✅ **Laser Weapon** ⚡ - Fast with trail effect
- ✅ **Missile Weapon** 🚀 - Powerful with explosion
- ✅ **Gun Weapon** 🔫 - Rapid fire
- ✅ **Bacteria appear ON the webpage** - You see both the page AND the bacteria!
- ✅ **Text gets eaten in real-time** - Watch words disappear!

---

## 🎮 How to Play

### Starting the Game
1. Go to any webpage with text (Wikipedia recommended!)
2. Click the Word Defender extension icon
3. Click "Start Game"
4. **Bacteria appear on your webpage!**

### Controls
- **Click on bacteria** to shoot them
- **Choose weapon** from the UI panel (top-right)
- **Press bomb button** 💣 when available
- **Select difficulty** to change challenge
- **Click Exit** to quit

---

## 🎯 Game Features

### 1. **3 Difficulty Levels**

#### 🟢 **Easy Mode**
- Slower bacteria (0.5 speed)
- Eats text every 3 seconds
- Max 8 bacteria on screen
- New bacteria every 8 seconds
- **Bomb reward** every 15 kills

#### 🟡 **Medium Mode** (Default)
- Normal speed bacteria (1.0 speed)
- Eats text every 2 seconds
- Max 12 bacteria on screen
- New bacteria every 5 seconds
- **Bomb reward** every 20 kills

#### 🔴 **Hard Mode**
- Fast bacteria (1.5 speed)
- Eats text every 1.5 seconds
- Max 15 bacteria on screen
- New bacteria every 3 seconds
- **Bomb reward** every 25 kills

**Switch difficulty anytime** using the buttons in the UI!

---

### 2. **💣 Bomb Power-Up**

#### How to Get Bombs
- **Kill bacteria** to earn bombs
- Easy: 1 bomb every 15 kills
- Medium: 1 bomb every 20 kills
- Hard: 1 bomb every 25 kills

#### What Bombs Do
- **Destroys ALL bacteria** on screen instantly!
- Creates a **yellow flash** effect
- Gives you **50 points** per bacterium destroyed
- **Strategic use** - Save for emergencies!

#### When to Use
- When overwhelmed by bacteria
- When bacteria are eating too fast
- To protect important text areas
- Emergency situations

---

### 3. **Weapons**

#### ⚡ **Laser**
- **Damage**: 2
- **Speed**: Very Fast (20)
- **Special**: Leaves a cyan trail
- **Best for**: Quick shots, multiple targets

#### 🚀 **Missile**
- **Damage**: 5 (Highest!)
- **Speed**: Medium (12)
- **Special**: Explosion effect on impact
- **Best for**: Tough bacteria, high health enemies

#### 🔫 **Gun**
- **Damage**: 1
- **Speed**: Fastest (25)
- **Special**: Rapid fire, no trail
- **Best for**: Weak bacteria, spam clicking

**Switch weapons anytime** - no cooldown!

---

## 🦠 Bacteria Behavior

### Appearance
- **Colorful blobs** with tentacles
- **Eyes and mouth** that animate
- **Pulsing animation** - looks alive!
- **Floating effect** - moves naturally
- **Health bar** shows damage
- **Counter** shows characters eaten

### Movement
- Spawn from screen edges
- Wander randomly across the page
- **Scroll with the page** - they stay visible!
- Retarget every few seconds
- Speed increases with difficulty

### Eating Text
- Eats text within 200 pixels
- Targets closest text first
- **Removes characters** from the actual webpage
- Shows particle effect when eating
- Counter updates with each character

### When They Split
- Currently don't split (simplified for clicking gameplay)
- New bacteria spawn automatically based on difficulty timer
- Population controlled by difficulty settings

---

## 📊 Scoring & Progress

### Points
- **100 points** per bacterium killed
- Higher levels give tougher bacteria (more health)
- No combo system (simplified)

### Lives
- Start with **3 lives**
- Lose 1 life every **10 characters** eaten by bacteria
- **Game Over** at 0 lives

### Levels
- **Level up** every 500 points
- Higher levels = tougher bacteria (more health)
- Bacteria speed doesn't increase (controlled by difficulty)

---

## 🎨 Visual Features

### Bacteria Animations
- **Floating** up and down
- **Pulsing** size
- **Rotating** slowly
- **Waving tentacles**
- **Explosion** on death

### Particle Effects
- **Red particles** when eating text
- **Colored particles** when hit
- **Explosion** particles on death
- **Weapon trails** (laser only)
- **Bomb flash** (yellow screen flash)

### UI Panel (Top-Right)
- Shows Lives ❤️
- Shows Score 🎯
- Shows Level 📊
- Shows Bacteria Count 🦠
- Weapon selection buttons
- Bomb button with count
- Difficulty selection
- Exit button

---

## 💡 Strategy Tips

### General Tips
1. **Click fast** - Bacteria accumulate quickly
2. **Protect dense text** - They target nearby words
3. **Use right weapon** - Missile for tough, gun for weak
4. **Save bombs** - Use when overwhelmed
5. **Watch spawn timer** - New bacteria appear regularly

### Weapon Strategy
- Start with **Laser** for balanced play
- Switch to **Missile** for high-health bacteria
- Use **Gun** for rapid cleanup

### Bomb Strategy
- **Don't waste** on 1-2 bacteria
- **Perfect for** 5+ bacteria on screen
- **Emergency use** when about to lose life
- **Strategic timing** - use before new spawn

### Difficulty Strategy
- **Easy** - Learn the game, relax
- **Medium** - Balanced challenge
- **Hard** - Test your skills!

---

## 🌐 Best Websites to Play On

### ✅ Excellent
- **Wikipedia** - Perfect amount of text
- **News sites** - CNN, BBC, NYT
- **Blogs** - Medium, Dev.to
- **Documentation** - MDN, GitHub

### ⚠️ Okay
- Social media (varies)
- Shopping sites
- Forums

### ❌ Avoid
- Image-heavy sites
- Video sites
- Chrome system pages
- Pages with very little text

---

## 🎯 How It Works

### Text Eating Mechanism
1. Game scans webpage for text nodes
2. Bacteria calculate distance to text
3. When close enough (200px), they eat 1 character
4. Text is actually removed from the DOM
5. You see words disappear in real-time!
6. All text is restored when game ends

### Shooting Mechanism
1. You click on a bacterium
2. Projectile spawns from bottom-center
3. Flies toward bacterium
4. On collision, damage is dealt
5. Health bar updates
6. When health = 0, bacterium explodes!

### Bomb Mechanism
1. You click the bomb button
2. Screen flashes yellow
3. ALL bacteria are destroyed instantly
4. Explosion particles everywhere
5. Points awarded for each kill
6. Bomb count decreases

---

## 🎮 Example Gameplay

```
1. Start game on Wikipedia
2. Difficulty: Medium
3. 3 bacteria spawn from edges
4. They float toward text
5. One starts eating "The quick brown fox"
   → "The quik bown fx"
6. You click it with Laser
7. Takes 2 shots to kill (damage 2, health 4)
8. +100 points!
9. More bacteria spawn
10. Text eaten counter: 8 characters
11. Kill 20 bacteria → Bomb earned!
12. Screen fills with 10 bacteria
13. Click bomb button 💣
14. BOOM! All destroyed!
15. +500 points!
16. Continue playing...
```

---

## 🔧 Installation

1. Make sure you have the 3 icons in `icons/` folder
2. Open Chrome: `chrome://extensions/`
3. Enable **Developer Mode**
4. Click **Load unpacked**
5. Select `word-defender` folder
6. **Done!**

If already installed, click the **refresh button** (🔄) on the extension to update.

---

## ⚠️ Important Notes

### Text Safety
- ✅ All text is **automatically restored** when game ends
- ✅ Original page is **unchanged** after exit
- ✅ No permanent damage to websites

### Performance
- Works best with 50-200 text elements
- May lag on very long pages
- Close other tabs if slow

### Visual Style
- Bacteria appear **on top** of content
- Page is still **visible and readable**
- UI panel is **semi-transparent**
- Click Exit anytime to remove everything

---

## 🎉 Summary

This version gives you EXACTLY what you wanted:

✅ **Bacteria on the original screen** - No black overlay!  
✅ **Eating actual text** - Watch it disappear!  
✅ **3 difficulty levels** - Easy, Medium, Hard  
✅ **Bomb power-up** - Destroy everything!  
✅ **Laser weapon** - Fast with trail  
✅ **Missile weapon** - Powerful explosion  
✅ **Click to shoot** - Simple and fun  

**Have fun defending your webpage from hungry bacteria! 🦠💥**
