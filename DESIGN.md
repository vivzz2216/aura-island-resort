---
name: AURA Resort
description: Preserved marine hero with sand-and-ink editorial resort sections.
colors:
  sand: "#f1ede4"
  ink: "#102e35"
  ocean: "#082a32"
  stay-surface: "#e6e7df"
  muted-ink: "#40575a"
  lagoon-action: "#b5ded8"
  action-ink: "#0d3035"
  cyan: "#7fd9df"
  hero-dark: "#031726"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(3.6rem, 7.5vw, 6.4rem)"
    fontWeight: 300
    lineHeight: 1.02
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(44px, 4.8vw, 72px)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "15px"
    lineHeight: 1.8
  wordmark:
    fontFamily: "Cinzel, serif"
    fontSize: "1.15rem"
    fontWeight: 500
    letterSpacing: "0.42em"
rounded:
  editorial: "0px"
  field: "8px"
  modal: "20px"
  hero-pill: "9999px"
spacing:
  section: "100px"
  editorial-gutter: "7%"
  villa-gap: "55px"
components:
  button-reserve:
    backgroundColor: "{colors.lagoon-action}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.editorial}"
    padding: "17px 24px"
  villa-tab:
    backgroundColor: "transparent"
    textColor: "{colors.muted-ink}"
    rounded: "{rounded.editorial}"
    padding: "14px 0"
  villa-tab-active:
    textColor: "{colors.ink}"
---

# Design System: AURA Resort

## Overview

The original hero remains the visual authority for the opening: marine photography, cyan details and its existing glass controls. Preserve its markup, styling and interactions. Below the hero, warm sand and ink establish a quieter editorial pace, alternating with marine photo panels.

**Key Characteristics:**
- Cormorant Garamond editorial titles and Plus Jakarta Sans details.
- Rectangular photographs, alternating villa rows and quiet underlined actions.
- Full-width island and dining imagery with restrained surface depth.

## Colors

### Primary
- **Marine Ink:** editorial text on light backgrounds.
- **Deep Ocean:** immersive experience-section background.
- **Ocean Cyan:** inherited hero controls and details.

### Secondary
- **Lagoon Action:** the rectangular reservation action, with dark action ink.

### Neutral
- **Warm Sand:** island and dining sections.
- **Stay Stone:** villa-section surface.
- **Muted Ink:** descriptions and secondary details on light sections.
- **Hero Dark and White:** inherited opening surfaces and light text on photography.

## Typography

Cormorant Garamond supplies serif titles, italic emphasis, villa names and editorial notes. Plus Jakarta Sans handles copy, filters, prices and actions. Cinzel is reserved for the inherited wordmark. The headline token describes general editorial titles; individual island, dining and reservation titles have composition-specific sizes. Villa titles use (35px), regular weight. Editorial descriptions generally use (12–15px) with line height (1.8).

## Layout

Editorial containers cap at (1440px) with (7%) gutters. Island content forms an asymmetric two-column spread. Villa rows alternate image and copy, with images taking (57%) width and (380px) height. Experience panels use a (1.25:1) grid, with a tall lead photograph. Dining splits edge-to-edge image and copy; reservation returns to immersive island photography. Section rhythm is generally (100px). At (1000px), gaps tighten. At (650px), rows and grids stack, villa images become (300px) high and dining imagery precedes its copy. The preserved hero retains its original (1200px), (992px) and (640px) breakpoints.

## Elevation & Depth

Editorial sections use tonal fields, dividers and photographic overlays rather than raised cards. Villa and experience surfaces have no enclosing shadow. Preserve inherited glass and modal treatments where already used; the modal retains its deep ambient shadow. Content reveals use the existing exponential easing and reduced-motion overrides.

## Shapes

Below the hero, images, badges and reservation actions are rectangular with square corners. Villa filters are text tabs with an active underline. Inherited hero pills, rounded modal corners and input fields remain distinct from the editorial surface language.

## Components

### Actions and filters

Editorial actions are underlined text with directional arrows. Villa explore actions shift slightly right on hover. Active villa filters use marine ink and a bottom rule (2px). The reservation action uses the lagoon token. Editorial focus outlines are warm gold (2px), offset (6px).

### Villa and experience panels

Villa rows pair large images with unboxed serif title, price, description, features and explore action. Experience photographs use a dark gradient for text legibility; they do not lift on hover. Dining entries use fine bottom dividers.

### Inherited navigation, fields and modals

Retain the existing hero navigation, date/guest selectors and inquiry interaction patterns. Inquiry fields use translucent dark surfaces, rounded corners (8px) and cyan focus borders. Modal height is bounded to (90dvh), with internal scrolling and mobile padding (24px). Fixed audio and wallpaper controls recede while reading below the hero.

## Do's and Don'ts

### Do:
- Do preserve the original hero and its existing interaction behavior.
- Do use sand-and-ink editorial sections, marine photo panels and serif hierarchy below it.
- Do retain working villa filters, inquiry modals, keyboard focus and reduced motion.

### Don't:
- Don't extend the hero's glass-card styling into the editorial villa rows.
- Don't round editorial image frames or add raised card shadows.
