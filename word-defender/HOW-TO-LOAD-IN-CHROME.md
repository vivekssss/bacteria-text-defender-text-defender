# 🚀 How to Load Word Defender Extension in Chrome

## ⚠️ IMPORTANT: Generate Icons First!

Before loading the extension, you **MUST** create the icon files:

### Quick Icon Generation (2 minutes)
1. Open `icons/create-icons.html` in any web browser
2. Click "Download 16x16" → Save as `icon16.png` in the `icons/` folder
3. Click "Download 48x48" → Save as `icon48.png` in the `icons/` folder
4. Click "Download 128x128" → Save as `icon128.png` in the `icons/` folder

**Without icons, the extension will fail to load!**

---

## 📋 Step-by-Step Installation Guide

### Step 1: Open Chrome Extensions Page

**Method A: Using Address Bar**
1. Open Google Chrome
2. Type `chrome://extensions/` in the address bar
3. Press Enter

**Method B: Using Menu**
1. Click the three dots (⋮) in the top-right corner
2. Go to **More tools** → **Extensions**

**Method C: Using Keyboard Shortcut (Windows)**
1. Press `Ctrl + Shift + E` (if available)

---

### Step 2: Enable Developer Mode

1. Look at the **top-right corner** of the Extensions page
2. Find the **"Developer mode"** toggle switch
3. Click it to turn it **ON** (it should turn blue)

```
┌─────────────────────────────────────────┐
│ Extensions              Developer mode  │
│                                    [ON] │ ← Click here
└─────────────────────────────────────────┘
```

---

### Step 3: Load the Extension

1. After enabling Developer Mode, you'll see new buttons appear
2. Click the **"Load unpacked"** button

```
┌──────────────────────────────────────────────┐
│  [Load unpacked]  [Pack extension]  [Update] │
│   ↑ Click this                                │
└──────────────────────────────────────────────┘
```

3. A file browser window will open
4. Navigate to: `C:\extentions\word-defender\`
5. Select the **word-defender** folder (the one containing manifest.json)
6. Click **"Select Folder"**

---

### Step 4: Verify Installation

After loading, you should see:

✅ **Word Defender** appears in your extensions list  
✅ Extension icon appears in your Chrome toolbar  
✅ No error messages  

```
┌────────────────────────────────────────────────┐
│ 🦠 Word Defender - Typing Shooter Game        │
│ Version 1.0.0                                  │
│ Defend words from bacteria! Type to shoot.    │
│ [Details] [Remove] [🔄]                        │
└────────────────────────────────────────────────┘
```

---

### Step 5: Pin the Extension (Optional but Recommended)

1. Look for the **puzzle piece icon** (🧩) in Chrome toolbar
2. Click it to see all extensions
3. Find **"Word Defender"**
4. Click the **pin icon** (📌) next to it
5. The extension icon will now always be visible in your toolbar

---

## 🎮 Testing the Extension

### Test 1: Check the Popup
1. Click the Word Defender icon in your toolbar
2. You should see the popup with:
   - High Score: 0
   - Games Played: 0
   - Total Kills: 0
   - "Start Game" button

### Test 2: Start a Game
1. Open any webpage with text (try Wikipedia)
2. Click the Word Defender icon
3. Click "Start Game"
4. The game overlay should appear
5. Start typing words to shoot bacteria!

---

## 🔧 Troubleshooting Installation

### ❌ Error: "Manifest file is missing or unreadable"

**Problem:** Chrome can't find manifest.json

**Solutions:**
- Make sure you selected the correct folder (`word-defender`)
- Check that `manifest.json` exists in the root folder
- Verify the file isn't corrupted (open it in a text editor)

---

### ❌ Error: "Failed to load extension"

**Problem:** Syntax error in manifest.json or missing files

**Solutions:**
1. Open `manifest.json` in a text editor
2. Check for syntax errors (missing commas, quotes, etc.)
3. Validate JSON at https://jsonlint.com
4. Make sure all referenced files exist:
   - popup.html
   - popup.js
   - content.js
   - game.css
   - icons/icon16.png
   - icons/icon48.png
   - icons/icon128.png

---

### ❌ Icons Not Showing

**Problem:** Icon files don't exist

**Solutions:**
1. **Generate the icons first!** (see top of this guide)
2. Open `icons/create-icons.html` in browser
3. Download all three icons
4. Save them in the `icons/` folder with exact names:
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`
5. Click the refresh button (🔄) on the extension

---

### ❌ Extension Loads but Icon Not in Toolbar

**Problem:** Extension is hidden

**Solutions:**
1. Click the puzzle piece icon (🧩) in Chrome toolbar
2. Find "Word Defender" in the list
3. Click the pin icon (📌) to pin it
4. The icon should now appear in your toolbar

---

### ❌ "This extension may not be from the Chrome Web Store"

**Problem:** This is a normal warning for unpacked extensions

**Solutions:**
- This is expected! Click "Load anyway" or dismiss the warning
- Unpacked extensions always show this warning
- It's safe because you created the extension yourself

---

## 🔄 Updating the Extension

After making changes to the code:

1. Go to `chrome://extensions/`
2. Find "Word Defender"
3. Click the **refresh icon** (🔄)
4. Your changes will be applied

**OR**

1. Click the puzzle piece icon (🧩)
2. Right-click "Word Defender"
3. Select "Reload extension"

---

## 🗑️ Uninstalling the Extension

If you want to remove it:

1. Go to `chrome://extensions/`
2. Find "Word Defender"
3. Click **"Remove"**
4. Confirm removal

Your stats will be deleted, but the files remain on your computer.

---

## 📊 Extension Permissions

Word Defender requests these permissions:

- **storage** - To save your high scores and statistics
- **activeTab** - To inject the game into webpages

These are minimal permissions and completely safe.

---

## 🌐 Where Can You Play?

### ✅ Works On:
- Wikipedia articles
- News websites (CNN, BBC, etc.)
- Blogs and articles
- Documentation sites
- Most regular webpages

### ❌ Doesn't Work On:
- `chrome://` pages (extensions, settings, etc.)
- `chrome-extension://` pages
- Some sites with strict Content Security Policy
- The Chrome Web Store itself

---

## 💡 Pro Tips

### Tip 1: Use Keyboard Shortcut
- You can set a keyboard shortcut to open the extension
- Go to `chrome://extensions/shortcuts`
- Find "Word Defender"
- Set a custom shortcut (e.g., `Ctrl+Shift+W`)

### Tip 2: Test on Good Pages
- Start with Wikipedia for best experience
- Pages with lots of text work better
- Avoid very complex or dynamic pages initially

### Tip 3: Keep Developer Mode On
- Leave Developer Mode enabled while testing
- You'll see helpful error messages
- Makes debugging easier

### Tip 4: Check Console for Errors
- Press `F12` to open DevTools
- Go to Console tab
- Look for error messages if something doesn't work

---

## 🎯 Quick Reference

### Installation Checklist
- [ ] Icons generated (icon16.png, icon48.png, icon128.png)
- [ ] Chrome opened
- [ ] Navigated to chrome://extensions/
- [ ] Developer Mode enabled
- [ ] Clicked "Load unpacked"
- [ ] Selected word-defender folder
- [ ] Extension appears in list
- [ ] No error messages
- [ ] Icon pinned to toolbar
- [ ] Tested on a webpage

### File Structure Check
```
word-defender/
├── manifest.json          ✓ Required
├── popup.html            ✓ Required
├── popup.js              ✓ Required
├── content.js            ✓ Required
├── game.css              ✓ Required
└── icons/
    ├── icon16.png        ✓ Required (must generate)
    ├── icon48.png        ✓ Required (must generate)
    └── icon128.png       ✓ Required (must generate)
```

---

## 🎮 Ready to Play!

Once installed:
1. Go to any webpage (try Wikipedia)
2. Click the Word Defender icon
3. Click "Start Game"
4. Start typing to shoot bacteria!

**Controls:**
- Type letters to shoot
- 1-5 keys to switch weapons
- ESC to exit game

---

## 📞 Still Having Issues?

1. **Check TROUBLESHOOTING.md** for detailed solutions
2. **Verify all files exist** in the correct locations
3. **Check browser console** (F12) for error messages
4. **Try a different webpage** (Wikipedia works well)
5. **Reload the extension** after making changes

---

## 🎉 Success!

If you see the Word Defender icon in your toolbar and can click it to open the popup, **congratulations!** You've successfully installed the extension.

Now go defend some words! 🦠🎯

---

**Need more help?**
- See: INSTALLATION.md for detailed guide
- See: TROUBLESHOOTING.md for common issues
- See: QUICKSTART.md for quick overview
