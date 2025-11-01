# 🦠 Word Defender - TEXT EATER VERSION

## 🎮 What's Different?

This version makes bacteria **actually eat text from the webpage!** As bacteria move around, they consume and remove characters from the page in real-time. Much more dramatic and engaging!

## 🆕 New Features

### 1. **Real Text Consumption**
- Bacteria eat actual characters from the webpage
- Text disappears as bacteria move near it
- Watch words vanish letter by letter!

### 2. **Click to Shoot**
- **Click on bacteria** to shoot them (instead of typing words)
- Easier and more action-focused gameplay
- Choose your weapon with number keys (1-5)

### 3. **Text Restoration**
- All eaten text is **automatically restored** when game ends
- Your webpage returns to normal - no permanent damage!

### 4. **New Stats**
- **Text Eaten** counter shows how many characters consumed
- **Bacteria Count** shows active enemies
- Lose a life every 50 characters eaten

## 🎯 How to Play

### Starting the Game
1. Go to a webpage with lots of text (Wikipedia works great!)
2. Click the Word Defender extension icon
3. Click "Start Game"
4. The game overlay appears

### Controls
- **Click on bacteria** to shoot them
- **1-5 keys** to switch weapons
  - 1 = Laser ⚡ (Fast)
  - 2 = Bow 🏹 (Precise)
  - 3 = Missile 🚀 (Double damage)
  - 4 = Tank 💥 (Triple damage)
  - 5 = Pebble ⚪ (Fastest)
- **ESC** to exit game

### Objective
- **Stop bacteria from eating all the text!**
- Click on bacteria to destroy them before they consume too much
- Bacteria eat nearby text every second
- Lose a life every 50 characters eaten
- Survive as long as possible!

## 🦠 Bacteria Behavior

### Movement
- Bacteria wander around the screen randomly
- They retarget to new locations every 3 seconds
- Move faster at higher levels

### Eating Pattern
- Bacteria eat text within 150 pixels
- They target the closest text element
- Eat one character per second (faster at higher levels)
- Show a counter of how many characters they've eaten

### Multiplication
- Bacteria split every 5 seconds
- Each split creates 2 bacteria
- New bacteria are 30% faster
- Maximum 15 bacteria on screen

## 📊 Scoring System

### Points
- **100 points** per bacteria destroyed
- **Combo multiplier** for consecutive kills
- **Level up** every 1000 points

### Lives
- Start with **3 lives**
- Lose 1 life every **50 characters** eaten
- Game over at 0 lives

### Stats Tracked
- High score
- Total games played
- Total kills
- Text eaten (characters)
- Level reached

## 🎨 Visual Indicators

### Bacteria Display
- **Health bar** above each bacterium
- **Character counter** shows how much they've eaten
- **Color-coded** for variety
- **Animated tentacles** and pulsing body

### Text Eating Effect
- **Red particles** appear when text is eaten
- Text gradually disappears from the page
- Visual feedback for every character consumed

## 💡 Pro Tips

### Best Websites to Play On
✅ **Wikipedia** - Lots of text, perfect for this game  
✅ **News sites** - CNN, BBC, New York Times  
✅ **Blog articles** - Medium, Dev.to  
✅ **Documentation** - MDN, GitHub READMEs  

❌ Avoid pages with little text or mostly images

### Strategy Tips
1. **Click fast!** Don't let bacteria accumulate
2. **Prioritize bacteria near text** - they're actively eating
3. **Use heavy weapons** (Tank) for bacteria that have eaten a lot
4. **Watch the multiplication timer** - every 5 seconds
5. **Protect important text** - click bacteria near headlines/titles

### Weapon Selection
- **Laser/Pebble** - Quick cleanup of many bacteria
- **Missile** - Good balance of speed and power
- **Tank** - For bacteria with high health

## 🔄 Comparison with Original Version

| Feature | Original | Text Eater |
|---------|----------|------------|
| Text interaction | Words on bacteria | Eats webpage text |
| Shooting | Type words | Click bacteria |
| Difficulty | Typing speed | Reaction time |
| Visual impact | Moderate | High (text vanishes!) |
| Gameplay style | Typing practice | Action shooter |

## 🛠️ Installation

The extension is already configured to use the text-eater version!

1. Make sure you have the 3 icon files in `icons/` folder
2. Load the extension in Chrome (`chrome://extensions/`)
3. Enable Developer Mode
4. Click "Load unpacked"
5. Select the `word-defender` folder
6. Play!

## 🔧 Switching Between Versions

If you want to go back to the typing version:

1. Open `manifest.json`
2. Change line 21 from:
   ```json
   "js": ["content-text-eater.js"],
   ```
   to:
   ```json
   "js": ["content.js"],
   ```
3. Reload the extension in Chrome

## ⚠️ Important Notes

### Text Restoration
- **All text is restored** when you exit the game
- The page returns to its original state
- No permanent changes to the webpage

### Performance
- Works best on pages with 50-500 text elements
- May lag on extremely text-heavy pages
- Close other tabs if experiencing slowdown

### Compatibility
- Works on most websites
- May not work on sites with strict Content Security Policy
- Doesn't work on chrome:// pages

## 🎮 Gameplay Example

```
1. Start game on Wikipedia article
2. 4 bacteria spawn from edges
3. They wander toward text
4. Text starts disappearing: "The quick brown fox" → "The qick bown fx"
5. You click on bacteria to shoot them
6. Bacteria explodes in particles
7. +100 points!
8. More bacteria spawn...
9. Text eaten counter: 47 characters
10. Keep clicking to survive!
```

## 🏆 High Score Tips

1. **React quickly** - Don't let bacteria accumulate
2. **Protect dense text areas** - More text = more to lose
3. **Build combos** - Consecutive kills multiply score
4. **Manage weapon choice** - Right tool for the job
5. **Watch multiplication** - Kill bacteria before they split

## 📞 Troubleshooting

### "Not enough text" error
- Try a different page with more content
- Wikipedia articles work best
- Avoid image-heavy or minimal pages

### Text not disappearing
- Make sure bacteria are near text (within 150 pixels)
- Wait 1 second for eating interval
- Check that bacteria counter is increasing

### Game feels too easy/hard
- Edit `content-text-eater.js`
- Change `eatingInterval` (line 43) for eating speed
- Change `eatRadius` (line 145) for eating range
- Change spawn count in `spawnBacteria()` calls

## 🎉 Enjoy!

This version provides a more **visual and immediate** experience. Watch in horror as bacteria devour the text on your screen, then save the day by clicking them away!

**Remember:** All text is restored when you exit - your webpage is safe! 🛡️

---

**Have fun defending text from hungry bacteria! 🦠📝**
