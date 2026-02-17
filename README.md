# ClawForChrome
100% AI Coded. This extension acts as a bridge between your web browser and the OpenClaw/Moltbot instance running locally on your machine. It enables the agent to "see" what you are browsing and allows it to send commands (like opening URLs or extracting data) back to the browser via a WebSocket connection.

# OpenClaw Browser Bridge ⚓

A lightweight Chrome Extension designed to bridge the gap between your web browser and a local **OpenClaw (Moltbot)** instance. It allows for real-time data synchronization, web scraping, and remote browser control via WebSockets.

## 🚀 Features

* **Real-time Connection:** Maintains a persistent WebSocket link to `localhost:8080`.
* **Context Sharing:** Send the current tab's URL and title to your agent with one click.
* **Deep Scraping:** A built-in Content Script extracts text directly from the DOM to provide the agent with full page context.
* **Remote Commands:** Allows OpenClaw to remotely open new tabs or navigate to specific URLs.

## 📂 Project Structure

| File | Description |
| :--- | :--- |
| `manifest.json` | Extension metadata and permission settings. |
| `background.js` | The service worker handling the WebSocket connection. |
| `content.js` | The script injected into web pages to scrape data. |
| `popup.html/js` | The user interface for manual interactions. |

---

## 🛠 Installation

1.  **Clone/Download** this repository to a local folder.
2.  Open Google Chrome and navigate to `chrome://extensions/`.
3.  Enable **Developer mode** (toggle in the top right corner).
4.  Click **Load unpacked** and select the folder containing the project files.
5.  Ensure your **OpenClaw/Moltbot** instance is running and listening on `ws://localhost:8080`.

## 📡 Communication Protocol

The extension communicates using JSON packets over WebSockets. 

### Outbound (Extension → OpenClaw)
```json
{
  "action": "analyze_page_content",
  "text": "Main body text of the website...",
  "url": "[https://example.com](https://example.com)"
}
