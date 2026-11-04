---
version: 1.0.0
name: Vintage Marauder Parchment
description: Subtle magical vintage cartography design system inspired by enchanted maps, aged parchment, and sepia inkcraft.
colors:
  parchment-base: "#f4ede0"
  parchment-light: "#fbf8f2"
  parchment-aged: "#e8dcbe"
  parchment-border: "#cfbe9b"
  ink-primary: "#2b2118"
  ink-secondary: "#5c4938"
  ink-muted: "#8c735d"
  ink-faded: "#b8a48e"
  accent-gold: "#c59a3f"
  accent-amber: "#df9b32"
  accent-glow: "#ffd778"
  void-bg: "#0c0d12"
  void-surface: "#14161f"
  void-border: "#232738"
  wax-seal: "#8b2626"
  wax-seal-hover: "#a32e2e"
typography:
  heading-hero:
    fontFamily: "'Cinzel Decorative', 'Cinzel', serif"
    fontSize: 42px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.04em
  heading-section:
    fontFamily: "'Cinzel', serif"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.05em
  subheading:
    fontFamily: "'Cormorant Garamond', serif"
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.02em
  body-primary:
    fontFamily: "'EB Garamond', 'Cormorant Garamond', Georgia, serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: 0.01em
  body-ui:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0.01em
  script-accent:
    fontFamily: "'Marck Script', 'Caveat', cursive"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.3
rounded:
  sm: 4px
  md: 8px
  lg: 14px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
components:
  orb-trigger:
    backgroundColor: "{colors.accent-amber}"
    rounded: "{rounded.full}"
    padding: 24px
  parchment-card:
    backgroundColor: "{colors.parchment-light}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.md}"
    padding: 24px
  wax-button:
    backgroundColor: "{colors.wax-seal}"
    textColor: "{colors.parchment-light}"
    rounded: "{rounded.full}"
    padding: 12px
---

# Vintage Marauder Parchment Design System

## Overview
A subtle, sophisticated aesthetic paying homage to enchanted vintage cartography and living parchment maps, without overt or branded clichés. The interface begins in a dark, mysterious void with a single pulsating orb of light. When activated, parchment textures and organic sepia ink spread across the screen, revealing the portfolio through a guided journey punctuated by ink trails, compass marks, and hand-drawn architectural borders.

## Colors
- **Parchment Spectrum (`#fbf8f2` to `#e8dcbe`)**: Authentic warm pulp tones with micro-texture grains and natural age gradients.
- **Ink Tones (`#2b2118` to `#b8a48e`)**: Deep walnut and iron-gall sepia ink for high contrast and historical calligraphy feel.
- **Arcane Accents (`#c59a3f`, `#ffd778`)**: Warm luminescent amber and gold used exclusively for interactive beacons, the initial orb, and active hover states.
- **Void Darkness (`#0c0d12`)**: Deep nocturnal canvas before the map is conjured.
- **Wax Seal Red (`#8b2626`)**: Accent color for prominent action triggers and sealed message submissions.

## Typography
- **Display & Headings**: `Cinzel Decorative` and `Cinzel` evoke classical lapidary inscriptions and antique book titles.
- **Narrative & Section Accents**: `Cormorant Garamond` and `Marck Script` convey secret notes and hand-penned cartographer remarks.
- **Body & Editorial**: `EB Garamond` ensures rich literary texture.
- **Functional UI & Tech Badges**: `Inter` ensures crisp, high-density legibility for code repositories, tech tags, and links.

## Layout
- **Initial Void State**: 100vh centered viewport, dark ambiance, glowing interactive beacon with breathing aura.
- **The Ink Blossom Transition**: Radial SVG mask / canvas bleed expanding from beacon coordinate to encompass the viewport.
- **Guided Trail Layout**: A continuous central or winding cartographic dashed line with compass waypoints, connecting the Hero, About, Skills, Projects, and Dispatch sections.

## Elevation & Depth
- Flat parchment layering combined with subtle ink drop shadows (`rgba(43, 33, 24, 0.08)`) and deckle-edged borders.
- Illuminated glowing elements use layered gaussian blur spreads (`0 0 25px rgba(223, 155, 50, 0.45)`).

## Shapes
- Vintage ornate frames, corner filigrees, dashed trail paths, compass roses, and circular wax stamps.
- Geometric cards have subtle 4px to 8px rounding with 1px hand-ruled sepia borders (`#cfbe9b`).

## Components
- **The Lumos Orb**: Hover-reactive golden particle core with pulsating halo and caption *"Clique para revelar"*.
- **The Ink Oath Banner**: Displays the motto *"Juro solenemente entregar um bom trabalho"* with ink seepage and fade-in timing.
- **Cartographic Project Cards**: Double-bordered cards displaying artifact previews, live deployment portals, and tech spell-tags.
- **Footprint / Trail Navigator**: Scroll-synced footsteps appearing sequentially along the path as the user explores.
- **Conceal Map Switch**: Discreet bottom toggle allowing the visitor to tap and fold the map back into the dark void (*"Traquinagem terminada"*).

## Do's and Don'ts
- **DO** use organic easing (`cubic-bezier(0.16, 1, 0.3, 1)`) for ink spreading and reveals.
- **DO** maintain high accessibility and contrast between sepia ink and parchment.
- **DON'T** use explicit Harry Potter crests, house badges, trademarked fonts, or cartoonish graphics.
- **DON'T** make the animations blocking or slow on repeat visits.

