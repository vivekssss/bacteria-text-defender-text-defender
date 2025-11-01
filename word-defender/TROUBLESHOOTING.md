# 🔧 Troubleshooting Guide - Word Defender

## 🚨 Common Issues and Solutions

### 1. Extension Won't Load

#### Problem: "Failed to load extension"
**Symptoms:**
- Error message when loading unpacked extension
- Extension doesn't appear in list

**Solutions:**
✅ **Check file structure**
```
word-defender/
├── manifest.json  ← Must be in root folder
├── popup.html
├── popup.js
├── content.js
├── game.css
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

✅ **Verify manifest.json**
- Open the file and check for syntax errors
- Ensure all quotes are properly closed
- Validate JSON at jsonlint.com

✅ **Check file permissions**
- Make sure you have read access to all files
- On Windows, right-click folder → Properties → Security

✅ **Try these steps:**
1. Close Chrome completely
2. Reopen Chrome
3. Go to `chrome://extensions/`
4. Remove old version if exists
5. Click "Load unpacked" again

---

### 2. Icons Not Showing

#### Problem: Extension loads but no icon appears
**Symptoms:**
- Extension in list but no toolbar icon
- Broken image icon in extensions page

**Solutions:**
✅ **Generate the icons first!**
This is the most common issue. You MUST create the icon files:

**Method 1: Browser (Easiest)**
1. Open `icons/create-icons.html` in browser
2. Click "Download 16x16" → Save as `icon16.png`
3. Click "Download 48x48" → Save as `icon48.png`
4. Click "Download 128x128" → Save as `icon128.png`
5. Save all files in the `icons/` folder
6. Reload extension in Chrome

**Method 2: Python**
```bash
cd icons
pip install Pillow
python generate-icons.py
```

**Method 3: Node.js**
```bash
cd icons
npm install
npm run generate
```

✅ **Verify icon files exist**
- Check that `icons/icon16.png` exists
- Check that `icons/icon48.png` exists
- Check that `icons/icon128.png` exists
- File names must be EXACT (lowercase, no spaces)

✅ **Check file sizes**
- icon16.png should be 16x16 pixels
- icon48.png should be 48x48 pixels
- icon128.png should be 128x128 pixels

✅ **Reload extension**
1. Go to `chrome://extensions/`
2. Click refresh icon (🔄) on Word Defender
3. Check toolbar for icon

✅ **Pin the extension**
- Click puzzle piece icon in Chrome toolbar
- Find "Word Defender"
- Click pin icon to show in toolbar

---

### 3. Game Won't Start

#### Problem: Clicking "Start Game" does nothing
**Symptoms:**
- Popup opens but game doesn't start
- No overlay appears on page

**Solutions:**
✅ **Check the webpage**
- You must be on a regular webpage (not chrome:// pages)
- Try these sites: Wikipedia, news sites, blogs
- Avoid: chrome://extensions/, chrome://settings/, etc.

✅ **Refresh the page**
1. Refresh the webpage (F5)
2. Try starting game again

✅ **Check browser console**
1. Press F12 to open DevTools
2. Go to Console tab
3. Look for error messages
4. Common errors and fixes:
   - "Cannot read property..." → Refresh page
   - "Permission denied" → Try different website
   - "content.js not found" → Reload extension

✅ **Verify content script loaded**
1. Open DevTools (F12)
2. Go to Sources tab
3. Look for "content.js" in file list
4. If missing, reload extension

✅ **Try incognito mode**
1. Open incognito window
2. Enable extension in incognito:
   - Go to `chrome://extensions/`
   - Find Word Defender
   - Click "Details"
   - Enable "Allow in incognito"
3. Try game in incognito

---

### 4. Typing Not Working

#### Problem: Typing doesn't shoot bacteria
**Symptoms:**
- Game starts but typing has no effect
- Input display doesn't update

**Solutions:**
✅ **Click on the page first**
- Click anywhere on the game canvas
- Ensure page has focus

✅ **Check keyboard layout**
- Game only recognizes A-Z letters
- Switch to English keyboard if using different layout

✅ **Type the complete word**
- You must type the ENTIRE word shown on bacteria
- Partial typing won't shoot
- Watch the input display at bottom

✅ **Check for conflicts**
- Disable other extensions temporarily
- Some extensions intercept keyboard events

✅ **Verify words are visible**
- Words should appear above bacteria
- If no words visible, bacteria may not have spawned

---

### 5. Performance Issues

#### Problem: Game is laggy or slow
**Symptoms:**
- Low frame rate
- Stuttering animations
- Delayed input

**Solutions:**
✅ **Close other tabs**
- Chrome uses lots of memory
- Close unnecessary tabs
- Restart Chrome

✅ **Try simpler pages**
- Complex pages with lots of content may slow game
- Try on simple text pages
- Wikipedia articles work well

✅ **Reduce bacteria count**
Edit `content.js` line ~400:
```javascript
const MAX_BACTERIA = 10; // Reduce from 20
```

✅ **Disable other extensions**
- Temporarily disable other extensions
- Some extensions cause conflicts

✅ **Update Chrome**
- Make sure you have latest Chrome version
- Go to `chrome://settings/help`

✅ **Check system resources**
- Open Task Manager (Ctrl+Shift+Esc)
- Check CPU and memory usage
- Close other programs if needed

---

### 6. Stats Not Saving

#### Problem: High scores don't persist
**Symptoms:**
- Stats reset after closing browser
- High score always shows 0

**Solutions:**
✅ **Check storage permissions**
- Extension should have storage permission
- Check manifest.json includes "storage"

✅ **Don't use incognito**
- Incognito mode may not save data
- Use regular browsing mode

✅ **Clear and reset**
1. Open popup
2. Click "Reset Stats"
3. Play a game
4. Check if stats save

✅ **Check Chrome storage**
1. Open DevTools (F12)
2. Go to Application tab
3. Click "Storage" → "Local Storage"
4. Look for extension data

---

### 7. Game Won't Close

#### Problem: Can't exit game
**Symptoms:**
- ESC key doesn't work
- Stuck in game overlay

**Solutions:**
✅ **Press ESC key**
- Make sure you're pressing the actual ESC key
- Try multiple times

✅ **Refresh the page**
- Press F5 to refresh
- This will force close the game

✅ **Close the tab**
- Close and reopen the tab
- Last resort option

---

### 8. Words Not Appearing

#### Problem: Bacteria spawn but have no words
**Symptoms:**
- Bacteria visible but no text above them
- Can't type anything

**Solutions:**
✅ **Check page content**
- Page must have text content
- Try a different webpage with more text

✅ **Refresh the page**
- Refresh before starting game
- Wait for page to fully load

✅ **Check console for errors**
- Open DevTools (F12)
- Look for JavaScript errors

---

### 9. Weapons Not Switching

#### Problem: Can't change weapons
**Symptoms:**
- Clicking weapon buttons does nothing
- Number keys don't work

**Solutions:**
✅ **Use number keys 1-5**
- 1 = Laser
- 2 = Bow
- 3 = Missile
- 4 = Tank
- 5 = Pebble

✅ **Click weapon buttons**
- Buttons at bottom of screen
- Should highlight when selected

✅ **Check if game has focus**
- Click on game canvas first
- Then try switching weapons

---

### 10. Bacteria Not Moving

#### Problem: Bacteria spawn but don't move
**Symptoms:**
- Bacteria appear but stay still
- No animations

**Solutions:**
✅ **Wait a moment**
- Game may be loading
- Give it 2-3 seconds

✅ **Check frame rate**
- Open DevTools (F12)
- Check for errors in console
- Game should run at 60 FPS

✅ **Refresh and restart**
- Refresh page
- Start game again

---

## 🐛 Debug Mode

### Enable Console Logging
Add this to the top of `content.js`:
```javascript
const DEBUG = true;

function log(...args) {
  if (DEBUG) console.log('[Word Defender]', ...args);
}
```

Then add logging throughout:
```javascript
log('Game started');
log('Bacteria spawned:', bacteria.length);
log('User typed:', currentInput);
```

### Check Game State
In browser console, type:
```javascript
// Check if game is active
console.log('Game active:', gameActive);

// Check bacteria count
console.log('Bacteria:', bacteria.length);

// Check score
console.log('Score:', score);
```

---

## 📞 Still Having Issues?

### Checklist Before Asking for Help
- [ ] Icons are generated and in correct location
- [ ] All files are present (manifest.json, popup.html, etc.)
- [ ] Extension loads without errors in chrome://extensions/
- [ ] Tested on multiple websites
- [ ] Checked browser console for errors
- [ ] Tried refreshing page and reloading extension
- [ ] Using latest Chrome version

### Information to Provide
When reporting issues, include:
1. **Chrome version** (chrome://version/)
2. **Operating system** (Windows/Mac/Linux)
3. **Exact error message** (from console)
4. **Steps to reproduce** the problem
5. **Website URL** where issue occurs
6. **Screenshots** if possible

---

## 🔍 Advanced Troubleshooting

### Reinstall Extension
1. Go to `chrome://extensions/`
2. Remove Word Defender
3. Close Chrome completely
4. Reopen Chrome
5. Load extension again

### Clear Extension Data
```javascript
// In browser console on any page:
chrome.storage.local.clear(() => {
  console.log('Extension data cleared');
});
```

### Verify File Integrity
Check that all files match expected content:
- manifest.json has correct structure
- content.js has no syntax errors
- All CSS is valid
- Icons are valid PNG files

### Test in Fresh Profile
1. Create new Chrome profile
2. Install extension there
3. Test if issue persists
4. Helps identify conflicts with other extensions

---

## ✅ Quick Fixes Summary

| Issue | Quick Fix |
|-------|-----------|
| Won't load | Check manifest.json syntax |
| No icons | Generate icons with create-icons.html |
| Won't start | Try different webpage |
| No typing | Click on game canvas first |
| Laggy | Close other tabs, reduce bacteria |
| Stats not saving | Don't use incognito mode |
| Won't close | Press ESC or refresh page |
| No words | Use page with more text |
| Weapons stuck | Use number keys 1-5 |
| Not moving | Wait 2-3 seconds, check console |

---

**Most issues can be solved by:**
1. ✅ Generating the icons
2. ✅ Reloading the extension
3. ✅ Refreshing the webpage
4. ✅ Checking the browser console

**Happy debugging! 🐛🔧**
