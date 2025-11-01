@echo off
echo ========================================
echo   Word Defender - Setup Helper
echo ========================================
echo.

echo This script will help you set up the Word Defender Chrome extension.
echo.

:menu
echo Choose an option:
echo.
echo 1. Open icon generator in browser
echo 2. Generate icons with Python (requires Python + Pillow)
echo 3. Generate icons with Node.js (requires Node.js + canvas)
echo 4. Open Chrome extensions page
echo 5. Open project folder
echo 6. View README
echo 7. Exit
echo.

set /p choice="Enter your choice (1-7): "

if "%choice%"=="1" goto browser
if "%choice%"=="2" goto python
if "%choice%"=="3" goto nodejs
if "%choice%"=="4" goto chrome
if "%choice%"=="5" goto folder
if "%choice%"=="6" goto readme
if "%choice%"=="7" goto end

echo Invalid choice. Please try again.
echo.
goto menu

:browser
echo.
echo Opening icon generator in your default browser...
start icons\create-icons.html
echo.
echo Instructions:
echo 1. Click each "Download" button
echo 2. Save the files in the icons\ folder
echo 3. Make sure they're named: icon16.png, icon48.png, icon128.png
echo.
pause
goto menu

:python
echo.
echo Attempting to generate icons with Python...
cd icons
python generate-icons.py
cd ..
echo.
if errorlevel 1 (
    echo Python generation failed. Make sure you have:
    echo 1. Python installed
    echo 2. Pillow installed: pip install Pillow
    echo.
    echo Or use option 1 to generate icons in browser.
)
pause
goto menu

:nodejs
echo.
echo Attempting to generate icons with Node.js...
cd icons
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)
call npm run generate
cd ..
echo.
if errorlevel 1 (
    echo Node.js generation failed. Make sure you have:
    echo 1. Node.js installed
    echo 2. Run 'npm install' in the icons folder
    echo.
    echo Or use option 1 to generate icons in browser.
)
pause
goto menu

:chrome
echo.
echo Opening Chrome extensions page...
start chrome://extensions/
echo.
echo Instructions:
echo 1. Enable "Developer mode" (toggle in top-right)
echo 2. Click "Load unpacked"
echo 3. Select the word-defender folder
echo 4. The extension will appear in your toolbar
echo.
pause
goto menu

:folder
echo.
echo Opening project folder...
start .
pause
goto menu

:readme
echo.
echo Opening README...
start README.md
pause
goto menu

:end
echo.
echo Thank you for using Word Defender Setup Helper!
echo.
echo Quick Start:
echo 1. Generate icons (option 1, 2, or 3)
echo 2. Load extension in Chrome (option 4)
echo 3. Play the game!
echo.
echo For detailed instructions, see INSTALLATION.md or QUICKSTART.md
echo.
pause
