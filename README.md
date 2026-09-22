# Tesla Grok Web

A lightweight, self-contained web experience designed for Tesla in-car browsers to interact with Grok and render Markdown or HTML responses.

## Project Goal

Build a website that Tesla owners can open by voice ("Hey Grok, open [site]") inside the car's Chromium-based browser. The site should:

1. Let users talk to Grok through a simple interface
2. Render Grok's responses as formatted Markdown or HTML inline
3. Work within all the constraints of the Tesla in-car environment

## Known Constraints (Workarounds Needed)

### Hardware
- Grok only runs on AMD Ryzen-based infotainment units (vehicles from late 2021 onward)
- Pre-2021 Intel-based units are permanently locked out
- **Workaround:** Detect hardware capability and show a friendly fallback message

### Connectivity
- Grok is entirely server-side; no Premium Connectivity or Wi-Fi = no Grok
- Rate limited against the user's Grok account
- **Workaround:** Cache recent responses locally; show offline state gracefully; queue requests when connectivity returns

### Browser Quirks
- Chromium-based but with limitations:
  - `data:` URLs do not render
  - URL prefill parameters (CodePen, JSFiddle) do not carry over
  - No manual zoom adjustment
  - Built-in ad blocker may strip external resources
  - Some markets block the browser while driving (even on FSD)
- **Workaround:** Self-contained single HTML file with inline CSS/JS; no external CDN dependencies that could be blocked; use system fonts; test on actual in-car browser

### Grok Interaction Limits
- Can open websites by voice
- Can control vehicle functions
- Grok Bot can manage email, calendar, files via Connectors
- Cannot type into app fields
- Cannot run code locally or access the file system
- Cannot send text messages (yet)
- **Workaround:** All interaction must be voice-driven or touch-driven on the rendered page; no reliance on Grok typing into form fields

### Regional
- Browser may be blocked while driving in some markets
- **Workaround:** Detect driving state if possible; show a "parked" message

## Project Structure

```
tesla-grok-web/
├── README.md          # This file
├── index.html         # Main self-contained page
├── css/
│   └── style.css      # Inline-friendly styles
├── js/
│   ├── app.js         # Main application logic
│   ├── markdown.js    # Lightweight Markdown renderer
│   └── grok.js        # Grok interaction layer
├── assets/
│   └── logo.svg       # Grok logo
└── docs/
    └── constraints.md # Detailed constraint research
```

## Getting Started

1. Open `index.html` in any browser to test
2. For in-car testing, host on a public URL and say "Hey Grok, open [URL]"
3. All assets must be self-contained or hosted on a CDN that won't be blocked by the ad blocker

## License

MIT
