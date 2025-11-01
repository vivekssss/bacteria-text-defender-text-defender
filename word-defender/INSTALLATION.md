# 📦 Installation Guide - Word Defender

## Quick Start (5 minutes)

### Step 1: Generate Icons
Before installing the extension, you need to create the icon files. Choose one method:

#### Method A: Using Browser (Easiest)
1. Open `icons/create-icons.html` in your web browser
2. Click each "Download" button to save the three icon files
3. Save them in the `icons/` folder as:
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`

#### Method B: Using Node.js (Automated)
```bash
cd icons
npm install canvas
node generate-icons.js
```

#### Method C: Use Any Image Editor
Create three PNG files (16x16, 48x48, 128x128) with a bacteria/game theme and save them in the `icons/` folder.

### Step 2: Install Extension in Chrome

1. **Open Chrome Extensions Page**
   - Type `chrome://extensions/` in the address bar
   - OR click Menu (⋮) → Extensions → Manage Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to and select the `word-defender` folder
   - Click "Select Folder"

4. **Verify Installation**
   - You should see "Word Defender - Typing Shooter Game" in your extensions list
   - The extension icon will appear in your Chrome toolbar
   - If you don't see it, click the puzzle piece icon and pin it

### Step 3: Play the Game!

1. **Navigate to any webpage** (preferably one with text content)
2. **Click the extension icon** in your toolbar
3. **Click "Start Game"** button
4. **Start typing** to shoot bacteria!

## 🎮 Controls

- **Type letters** - Target and shoot bacteria
- **1-5 keys** - Switch weapons
- **ESC** - Exit game

## 🔧 Troubleshooting

### Icons Not Showing
- Make sure you've created the icon files in the `icons/` folder
- The files must be named exactly: `icon16.png`, `icon48.png`, `icon128.png`
- Try reloading the extension after adding icons

### Game Not Starting
- Make sure you're on a webpage (not chrome:// pages)
- Check the browser console (F12) for errors
- Try refreshing the page and starting again

### Extension Not Loading
- Verify all files are in the correct locations
- Check that `manifest.json` is in the root folder
- Make sure Developer Mode is enabled
- Try removing and re-adding the extension

### Performance Issues
- Close other tabs to free up resources
- Try on simpler webpages
- Reduce the number of bacteria by editing `content.js`

## 📁 Required File Structure

```
word-defender/
├── manifest.json          ✓ Required
├── popup.html            ✓ Required
├── popup.js              ✓ Required
├── content.js            ✓ Required
├── game.css              ✓ Required
├── icons/
│   ├── icon16.png        ✓ Required
│   ├── icon48.png        ✓ Required
│   ├── icon128.png       ✓ Required
│   ├── create-icons.html (Helper)
│   └── generate-icons.js (Helper)
├── README.md             (Documentation)
└── INSTALLATION.md       (This file)
```

## 🔄 Updating the Extension

After making changes to the code:

1. Go to `chrome://extensions/`
2. Find "Word Defender"
3. Click the refresh icon (🔄)
4. Test your changes

## 🗑️ Uninstalling

1. Go to `chrome://extensions/`
2. Find "Word Defender"
3. Click "Remove"
4. Confirm removal

## 🌐 Testing on Different Websites

The game works best on pages with text content. Try these:

- **News sites**: CNN, BBC, New York Times
- **Wikipedia**: Any article
- **Blogs**: Medium, Dev.to
- **Documentation**: MDN, GitHub README files

Avoid:
- Chrome system pages (chrome://)
- Some sites with strict Content Security Policy
- Pages with very little text

## 💡 Tips for Best Experience

1. **Use pages with English text** - The game extracts words from the page
2. **Full screen mode** (F11) - For immersive gameplay
3. **Good lighting** - Easier to read words quickly
4. **Practice typing** - Speed improves with practice
5. **Try different weapons** - Each has unique characteristics

## 🐛 Reporting Issues

If you encounter bugs:

1. Open browser console (F12)
2. Check for error messages
3. Note what you were doing when the error occurred
4. Check if icons are properly installed
5. Try on a different webpage

## 🎯 Next Steps

Once installed:

1. Check your stats in the popup
2. Try to beat your high score
3. Experiment with different weapons
4. Challenge friends to beat your score
5. Customize the game (see README.md)

## 📚 Additional Resources

- **README.md** - Full game documentation
- **content.js** - Main game code (for customization)
- **game.css** - Styling and animations

---

**Ready to defend some words? Let's go! 🚀🦠**
