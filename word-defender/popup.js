// Load and display stats
async function loadStats() {
  const stats = await chrome.storage.local.get(['highScore', 'gamesPlayed', 'totalKills']);
  
  document.getElementById('highScore').textContent = stats.highScore || 0;
  document.getElementById('gamesPlayed').textContent = stats.gamesPlayed || 0;
  document.getElementById('totalKills').textContent = stats.totalKills || 0;
}

// Start game
document.getElementById('startBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.tabs.sendMessage(tab.id, { action: 'startGame' });
  window.close();
});

// Reset stats
document.getElementById('resetBtn').addEventListener('click', async () => {
  if (confirm('Are you sure you want to reset all stats?')) {
    await chrome.storage.local.set({
      highScore: 0,
      gamesPlayed: 0,
      totalKills: 0
    });
    loadStats();
  }
});

// Initialize
loadStats();
