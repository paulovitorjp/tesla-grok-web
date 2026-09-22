# Detailed Constraint Research

## Tesla In-Car Browser

### Engine
- Chromium-based (Blink rendering engine)
- Supports modern HTML5, CSS3, ES6+ JavaScript
- Has a built-in ad blocker (as of recent software updates)

### Limitations Discovered
1. **Data URLs:** `data:text/html,...` URLs are not rendered; they appear as text in the address bar
2. **URL Parameters:** Prefill parameters for CodePen (`?prefill_data_...`) and JSFiddle do not populate editor fields
3. **Zoom:** No manual zoom control available
4. **External Resources:** Ad blocker may strip scripts/styles from certain CDNs
5. **Regional Restrictions:** Browser may be disabled while driving in some markets

### What Works
- Opening standard `https://` URLs by voice
- Rendering self-contained HTML with inline CSS and JS
- Basic form interaction (touch-based)
- Video playback (MP4)
- Image display (PNG, JPG, SVG, GIF)

## Grok in Tesla

### Capabilities
- Voice-activated conversation
- Can open websites by URL
- Can control vehicle functions (climate, navigation, media, etc.)
- Grok Bot (announced Sept 2026) can manage:
  - Gmail (read, send)
  - Google Calendar (read, create events)
  - Google Drive (search, read files)
  - GitHub (search repos, read/write files, manage PRs)
  - Automations (scheduled tasks)

### Limitations
- Cannot type into fields within opened apps
- Cannot execute code locally
- Cannot access the vehicle's file system
- Cannot send SMS/text messages
- Server-side only (requires connectivity)
- Rate limited per Grok account

## Hardware Requirements
- AMD Ryzen infotainment (late 2021+)
- Premium Connectivity or Wi-Fi for Grok access
- Sufficient RAM for browser + Grok session

## Recommended Architecture

```
┌─────────────────┐     voice      ┌──────────────┐
│  Tesla Browser  │ ◄──────────── │  Grok (API)  │
│  (Chromium)     │ ────────────► │  Server-side │
└─────────────────┘   responses   └──────────────┘
        │
        ▼
┌─────────────────┐
│  Self-contained │
│  HTML/CSS/JS    │
│  (no external   │
│   dependencies) │
└─────────────────┘
```

All rendering must happen client-side with no external CDN calls that could be blocked.
