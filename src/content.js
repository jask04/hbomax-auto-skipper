let settings = {
  enabled: true,
  skipIntro: true,
  skipRecap: true,
  skipCredits: true,
};

let selector = '';

function buildSelector() {
  const parts = [];
  if (settings.skipIntro || settings.skipRecap) {
    parts.push('button[data-testid="player-ux-skip-button"]');
  }
  if (settings.skipCredits) {
    parts.push('button[data-testid="player-ux-up-next-button"]');
  }
  selector = parts.join(', ');
}

browser.storage.local.get(settings, (data) => {
  settings = data;
  buildSelector();
});

browser.storage.onChanged.addListener(() => {
  browser.storage.local.get(settings, (data) => {
    settings = data;
    buildSelector();
  });
});

const lastClicks = {};

setInterval(() => {
  if (!settings.enabled || !selector) {
    return;
  }

  const skipButton = document.querySelector(selector);
  if (skipButton) {
    const type = skipButton.getAttribute('data-testid');
    if (Date.now() - (lastClicks[type] || 0) < 30000) {
      return;
    }
    skipButton.click();
    lastClicks[type] = Date.now();
  }
}, 1000);
