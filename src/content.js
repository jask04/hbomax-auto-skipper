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

let lastClick = 0;

setInterval(() => {
  if (!settings.enabled || !selector) {
    return;
  }

  if (Date.now() - lastClick < 30000) {
    return;
  }

  const skipButton = document.querySelector(selector);
  if (skipButton) {
    skipButton.click();
    lastClick = Date.now();
  }
}, 1000);
