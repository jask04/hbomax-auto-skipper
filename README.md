# HBOMax Auto Skipper
![alt text](src/icons/icon-96.png)
Automatically skips HBOMax intros, recaps, and credits.

## Features

- **Skip Intro** — Automatically skips episode intros
- **Skip Recap** — Automatically skips "previously on" recaps
- **Skip Credits** — Automatically skips to the next episode during credits

All three can be toggled independently, plus a master on/off switch.

## Installation

1. Clone or download this repository
2. Open Firefox and navigate to `about:debugging`
3. Click **"This Firefox"** → **"Load Temporary Add-on"**
4. Select the `manifest.json` file from this repo

## How It Works

The extension uses a `MutationObserver` to watch for skip buttons appearing in the HBOMax player UI. When a button is detected and the corresponding setting is enabled, it's automatically clicked.

## License

[MIT](LICENSE)
