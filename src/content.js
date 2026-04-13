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

const observer = new MutationObserver((mutations) => {
  if (!settings.enabled || !selector) {
    return;
  }

  if (Date.now() - lastClick < 5000) {
    return;
  }

  for (const mutation of mutations) {
    if (mutation.addedNodes.length) {
      const skipButton = document.querySelector(selector);
      if (skipButton) {
        skipButton.click();
        lastClick = Date.now();
        return;
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
