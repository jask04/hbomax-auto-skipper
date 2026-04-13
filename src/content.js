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

let lastUrl = location.href;

setInterval(() => {
  if (!settings.enabled || !selector) {
    return;
  }

  // Reset skipped markers when URL changes (new episode or replay)
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    document.querySelectorAll('[data-skipped]').forEach((el) => {
      delete el.dataset.skipped;
    });
  }

  const skipButton = document.querySelector(selector);
  if (skipButton && !skipButton.dataset.skipped) {
    skipButton.dataset.skipped = 'true';
    skipButton.click();
  }
}, 1000);
