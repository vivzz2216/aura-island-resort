# AURA Maldives Resort — UI Clone & Interactive Experience

An exact, pixel-perfect clone and luxury editorial web replica of the **AURA Maldives Resort** interface, featuring high-resolution photography, smooth typography motion reveals, glassmorphic booking controls, and complete multi-section island storytelling.

---

## 🌴 Project Overview

- **Hero Replica**: 1:1 match of the reference design, including the sunburst logo, spaced `A U R A` typography, editorial serif headline (*"Somewhere beyond ordinary."*), floating dark-glass booking bar, left vertical pagination indicator (`01 / 06 ↓`), and the floating bedroom preview teaser (*"Wake up to the ocean →"*).
- **Generated 4K Assets**: Photorealistic, high-resolution imagery specifically generated for the Maldivian resort:
  - `assets/hero-island.jpg` — Pristine aerial drone shot of the private island and turquoise coral lagoon
  - `assets/villa-bedroom.jpg` — Luxury overwater villa suite overlooking the ocean
  - `assets/dining.jpg` — Sunset candlelit sandbank dining under a wooden cabana
  - `assets/wellness.jpg` — Open-air wellness pavilion and infinity plunge pool
  - `assets/reference-original.png` — Original uploaded reference screenshot
- **Typography & Motion**:
  - Headings: *Cormorant Garamond* (editorial high-contrast italic)
  - Wordmark: *Cinzel* with letter-spacing tracking
  - UI Text: *Plus Jakarta Sans*
  - Animations: Staggered line reveal masks, smooth hover elevations, interactive calendar popovers, and mouse parallax.
- **Ambient Audio**: Built-in generative Web Audio API ocean waves synthesizer (pure client-side, zero external audio files).

---

## 🚀 How to Run

You can open `index.html` directly in any web browser, or serve it locally:

### Option A: Open directly
Double-click `index.html` in file explorer or run:
```powershell
Start-Process "c:\Users\pilla\AntigravityWorkspaces\Account1\test3\index.html"
```

### Option B: Local HTTP Server (Recommended)
```powershell
cd c:\Users\pilla\AntigravityWorkspaces\Account1\test3
python -m http.server 3000
```
Then navigate to `http://localhost:3000`.

---

## 📁 File Structure

```
test3/
├── index.html          # Main semantic HTML structure & sections
├── style.css           # Design system, glassmorphism, animations & responsiveness
├── app.js              # Motion engine, date/guest popovers, scroll spy, ambient audio
├── README.md           # Documentation
└── assets/
    ├── hero-island.jpg         # 4K Drone Aerial Island (1376x768)
    ├── villa-bedroom.jpg       # 4K Overwater Villa Bedroom (1376x768)
    ├── dining.jpg              # Sunset Sandbank Dining (1376x768)
    ├── wellness.jpg            # Overwater Spa & Infinity Pool (1376x768)
    └── reference-original.png  # User Reference Screenshot
```

---

## ✨ Interactive Features

1. **Background Switcher** (Top Right):
   - Toggle between **4K Island** (ultra-sharp photorealistic drone shot) and **Original** (exact reference screenshot).
2. **Interactive Glass Booking Bar** (Bottom Center):
   - Click **Arrival** or **Departure** to open the interactive calendar date picker.
   - Click **Guests** to adjust Adults, Children, and Villa Suites with counter buttons.
   - Click **Find your stay →** to auto-scroll to the residences section.
3. **Floating Teaser Card** (Bottom Right):
   - Click *"Wake up to the ocean →"* to open the luxury suite showcase modal.
4. **Left Section Indicator** (`01 / 06 ↓`):
   - Dynamically tracks current section as you scroll.
   - Click the down arrow `↓` to smoothly jump to the next section.
5. **Sound Ambient Toggle** (Bottom Left):
   - Toggle real-time synthesized gentle ocean waves powered by the Web Audio API.
6. **Plan Your Escape Modal** (Top Right Button):
   - Bespoke booking inquiry drawer with instant feedback.

