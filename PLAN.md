# Mask — Marketing Website Redesign Plan

> **Goal:** Rebuild the "Mask" game landing page from a mechanical-feeling tech site into an immersive, hand-painted, atmospheric experience that converts YouTube Shorts viewers into waitlist signups.

## Context & Requirements Summary

| Aspect | Decision |
|--------|----------|
| **Purpose** | YouTube Shorts → Website → Waitlist Email Signup |
| **Tech Stack** | Static HTML/CSS/JS (no framework) |
| **CSS** | Vanilla CSS (replacing TailwindCSS CDN) |
| **Deployment** | Vercel (free tier, `.vercel.app` domain for now) |
| **Backend** | None for now — modal-only on signup. Supabase planned for later. |
| **Assets Available** | Studio logo, character concept sketch, dark blue game tiles/rocks/crawler |
| **Generated Art** | Atmospheric background textures ONLY (no character/area concept art) |
| **Mobile** | Equal priority with desktop — both must be perfect |
| **Social Links** | YouTube (primary), Instagram (future/optional) |
| **Steam** | No Steam link — waitlist is sole CTA |
| **Waitlist Counter** | Hidden until 100+ signups (structure built, CSS-hidden) |

---

## User Review Required

> [!IMPORTANT]
> **Complete Visual Identity Overhaul:** The current orange-heavy, Russo One, esports-style design will be entirely replaced with a hand-painted, dark atmospheric aesthetic. The existing TailwindCSS CDN approach will be replaced with vanilla CSS. This is a full rewrite of `index.html` and introduction of a separate `styles.css`.

> [!IMPORTANT]
> **Section Architecture Changes:** I'm proposing restructuring the page sections based on the marketing funnel (see below). The "Clips" section will be redesigned as a video showcase section with a single featured slot + placeholder cards. The "Art" section will become a "World of Mask" lore section.

---

## Design Vision

### Aesthetic Direction: "Hand-Painted Abyss"

Inspired by the Hollow Knight official website, but adapted to Mask's unique **deep blue-black, gritty, painted** visual language. The site should feel like you're peering into the game world — not reading a corporate product page.

**Key principles:**
- **No pure black** — use deep charcoal blues (`#0a0a14`, `#0d0f1a`) as base instead of `#000000`
- **Light as a guide** — soft glows and bioluminescent accents draw the eye to CTAs
- **Layered depth** — parallax layers create the feeling of looking INTO a cave/abyss
- **Organic textures** — painted noise, brush-stroke borders, non-geometric shapes
- **Breathing atmosphere** — the page feels alive with subtle fog, particles, and slow gradients

### Color Palette

| Role | Hex | Rationale |
|------|-----|-----------|
| **Deep Background** | `#0a0a14` | Near-black with blue undertone — matches game asset palette |
| **Surface** | `#0d0f1a` | Slightly lighter for cards/sections |
| **Elevated Surface** | `#141828` | Cards, modals, hover states |
| **Primary Accent** | `#F97316` | Kept from character design (white + orange protagonist) |
| **Primary Glow** | `rgba(249, 115, 22, 0.4)` | Orange glow for CTAs and highlights |
| **Secondary Accent** | `#3b4d8c` | Muted deep blue — from game floor tiles/rocks |
| **Bioluminescent** | `#4a7dff` | Soft blue glow for atmospheric effects |
| **Text Primary** | `#e8e6e3` | Warm off-white (not harsh `#FFFFFF`) |
| **Text Secondary** | `#7a7d8a` | Muted for supporting text |
| **Text Dim** | `#4a4d5a` | Footer, captions |

### Typography

**Replacing** Russo One + Chakra Petch with fonts that feel more organic and atmospheric:

| Role | Font | Weight | Rationale |
|------|------|--------|-----------|
| **Display/Hero** | **Cinzel** | 700-900 | Elegant serif with gothic undertones — perfect for dark fantasy titles |
| **Section Headings** | **Cinzel** | 600-700 | Consistent with hero, uppercase tracking |
| **Body Text** | **Inter** | 300-400 | Clean, highly readable, modern — contrasts beautifully with ornate headings |
| **UI/Labels** | **Inter** | 500-600 | Buttons, nav links, small caps |

Google Fonts import:
```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
```

---

## Section Architecture

The page is a single vertical scroll — no routing, no multi-page. Optimized for the funnel: **arrive → feel awe → understand the game → sign up**.

### Section Flow

```
┌─────────────────────────────────┐
│  1. FIXED NAV (glassmorphism)   │  Minimal: Logo + "Join Waitlist" CTA
├─────────────────────────────────┤
│  2. HERO                        │  Full-screen. Atmospheric background.
│     "MASK" title + tagline      │  Particle effects. Scroll indicator.
│     Single CTA: Join Waitlist   │  YouTube embed slot (hidden until ready)
├─────────────────────────────────┤
│  3. THE WORLD (Lore Tease)      │  "The Rift" featured area card
│     5 area cards                │  4 other areas as "coming soon" fog cards
│     Brief atmospheric text      │  Uses real game assets where available
├─────────────────────────────────┤
│  4. GAMEPLAY SHOWCASE           │  Video/clip embed slots (YouTube Shorts)
│     Featured clip + 2 slots     │  Placeholder states with atmospheric effects
│     "Coming soon" states        │  Easy to add content later
├─────────────────────────────────┤
│  5. THE PROTAGONIST             │  Character concept art showcase
│     Character sketch + lore     │  Orange accent border, painted frame
│     Brief description           │  
├─────────────────────────────────┤
│  6. WAITLIST CTA (main)         │  Full-width atmospheric section
│     Email input + submit        │  Glowing orange CTA button
│     Compelling copy             │  Hidden counter (shows after 100+)
├─────────────────────────────────┤
│  7. FOOTER                      │  Studio credit, social links, copyright
│     "By Semicolon Expected"     │  YouTube link, optional Instagram
└─────────────────────────────────┘
```

### Section Details

#### 1. Fixed Navigation
- **Left:** Game title "MASK" in Cinzel, small "by Semicolon Expected" below
- **Center:** No nav links on desktop (it's a single-page landing — scrolling IS navigation)
- **Right:** Single CTA button "Join Waitlist" (orange, glowing)
- **Mobile:** Hamburger → simple overlay with section anchors
- **Behavior:** Glassmorphism background, becomes more opaque on scroll
- **Rationale:** Removing the 4-link nav (Intro/Clips/Art/Join). For a landing page driving conversions, fewer nav options = higher conversion. The CTA button is always visible.

> [!IMPORTANT]
> **Navigation removal:** The current site has 4 nav links. I'm removing them and keeping ONLY the waitlist CTA in the header. This is a deliberate conversion optimization — every click that ISN'T "Join Waitlist" is a distraction. The user scrolls naturally through the page. Do you agree with this approach, or do you want to keep section anchors?

#### 2. Hero Section
- **Background:** Multi-layer parallax with generated dark atmospheric textures (foggy abyss, painted rock formations). Will be replaced with YouTube trailer embed when available.
- **Particle system:** Floating dust motes / embers, subtle, performant (canvas-based, `requestAnimationFrame`)
- **Fog overlay:** CSS animated gradient fog drifting across the bottom
- **Title:** "MASK" in massive Cinzel (responsive `clamp()` sizing), subtle orange text-shadow glow
- **Tagline:** "A hand-painted metroidvania" — simple, genre-defining
- **CTA:** Single button "Join the Waitlist" → smooth-scrolls to waitlist section
- **Scroll indicator:** Subtle bouncing chevron at bottom

#### 3. The World (Lore Tease)
- **Section header:** "Explore the Depths" or "A World Beneath"
- **Featured card (The Rift):** Large card with:
  - Generated atmospheric texture as background
  - Title "The Rift" in Cinzel
  - Brief lore blurb (2-3 lines)
  - "First area revealed" badge
  - Decorative border with orange accent line
- **4 Coming-Soon cards:** Smaller cards in a row/grid:
  - "The Great Tree" (Forest), "The Fortress", "Lost Memory", "The Mycelium" (Mushroom)
  - Each has name visible but covered in animated fog/mist overlay
  - "Coming Soon" label
  - On hover: fog clears slightly, revealing a dark silhouette placeholder
- **Scroll-triggered reveal:** Cards fade in staggered as user scrolls into view

#### 4. Gameplay Showcase
- **Section header:** "Witness the Combat" or "Gameplay"
- **Layout:** 1 featured large slot + 2 smaller slots (responsive grid)
- **Current state:** All 3 show "Coming Soon" with atmospheric placeholder:
  - Dark card with subtle particle animation
  - Pulsing play button icon
  - "Footage coming soon" text
- **Future state:** YouTube embed (iframe) drops in, placeholder hides
- **Design:** Cards have painted brush-stroke borders, not geometric rectangles

#### 5. The Protagonist
- **Layout:** Side-by-side on desktop (image left, text right), stacked on mobile
- **Image:** Character concept sketch in a decorative painted frame
  - On hover: subtle parallax shift, orange glow behind frame
- **Text:**
  - "The Protagonist" heading
  - Brief atmospheric lore text about the character
  - 2 feature callouts with orange accent borders:
    - "White & Orange" — visual identity
    - "Combat Focused" — gameplay identity
- **Image treatment:** Slight vignette overlay on the sketch to blend with dark background

#### 6. Waitlist Section (Primary CTA)
- **Design:** Glass card on dark background with orange glow bleeding from behind
- **Heading:** "Step Into the Abyss" (or similar atmospheric CTA)
- **Subtext:** "Be the first to know when Mask awakens. Join the waitlist for development updates and early access."
- **Form:** Single email input + submit button
  - Input: dark background, subtle border, glows orange on focus
  - Button: solid orange, black text, glow effect, hover animation
- **Confirmation:** Modal with atmospheric success message (keep existing modal concept)
- **Counter:** Hidden `<div>` with counter, shown via CSS class when threshold met

#### 7. Footer
- **Minimal:** Studio logo (small) + "Mask © 2026 Semicolon Expected"
- **Social:** YouTube icon link (primary), Instagram (when ready)
- **Style:** Very subtle, doesn't compete with the waitlist CTA above

---

## Atmospheric Effects (Performance-Optimized)

### 1. Particle System (Hero only)
- **Tech:** HTML5 Canvas overlay, `requestAnimationFrame`
- **Particles:** ~40-60 small dots (dust/embers), slow drift upward
- **Performance:** Only renders when hero is in viewport (IntersectionObserver)
- **Fallback:** `prefers-reduced-motion` → particles disabled

### 2. Parallax Scrolling
- **Tech:** CSS `transform: translateZ()` with `perspective` on parent, or `scroll` event with throttled `requestAnimationFrame`
- **Layers:** 2-3 background layers at different scroll speeds
- **Performance:** Uses `will-change: transform`, GPU-accelerated

### 3. Fog / Mist Animation
- **Tech:** CSS `@keyframes` with semi-transparent gradient divs
- **Usage:** Hero bottom edge, World section "coming soon" cards
- **Performance:** Pure CSS, GPU-accelerated opacity/transform

### 4. Scroll-Triggered Reveals
- **Tech:** IntersectionObserver API (no library)
- **Effect:** Sections fade in + translate up when scrolled into view
- **Performance:** Native browser API, zero JS animation cost

### 5. Custom Cursor
- **Tech:** CSS `cursor: url()` for custom cursor image, or JS-tracked cursor glow
- **Approach:** Subtle orange glow that follows cursor (large, blurred circle behind cursor)
- **Performance:** `pointer-events: none` overlay, `requestAnimationFrame`, only on desktop (disabled on touch)

### 6. Ambient Background
- **Tech:** CSS gradient animation (`@keyframes` cycling hue/opacity of background layers)
- **Effect:** Very slow (30s+ cycle) breathing gradient shift
- **Performance:** Pure CSS, single element

---

## File Structure

```
MaskGame/
├── index.html              ← [REWRITE] Complete rewrite with new structure
├── styles.css              ← [NEW] All CSS extracted from inline
├── main.js                 ← [NEW] All JS extracted (particles, scroll, form)
├── assets/
│   ├── textures/           ← [NEW] Generated atmospheric background textures
│   │   ├── hero-bg.webp
│   │   ├── fog-overlay.png
│   │   └── section-divider.png
│   └── icons/
│       └── cursor-glow.svg ← [NEW] Custom cursor if used
├── character_concept.png   ← [KEEP] Existing
├── studio_logo.png         ← [KEEP] Existing
├── context.md              ← [KEEP] Existing
├── PLAN.md                 ← [NEW] Copy of this plan in project root
├── design-system/          ← [KEEP] Existing (update MASTER.md with new palette/fonts)
└── docs/                   ← [KEEP] Existing
```

---

## Proposed Changes

### Core Website

#### [REWRITE] [index.html](file:///c:/Users/Shubhadeep%20Roy/Downloads/MaskGame/index.html)
Complete rewrite. New semantic HTML structure with 7 sections as described above. Removes TailwindCSS CDN dependency. Links to external `styles.css` and `main.js`. Includes proper SEO meta tags, Open Graph tags for social sharing, and structured semantic HTML.

#### [NEW] styles.css
All CSS extracted from inline `<style>` block. Organized into:
- CSS custom properties (design tokens)
- Reset / base styles
- Typography system
- Component styles (nav, cards, buttons, inputs, modal)
- Section-specific styles (hero, world, gameplay, protagonist, waitlist, footer)
- Atmospheric effects (fog, parallax, particles)
- Responsive breakpoints (375px, 768px, 1024px, 1440px)
- `prefers-reduced-motion` media query
- Print styles

#### [NEW] main.js
All JS extracted. Modules:
- `initParticles()` — Canvas particle system for hero
- `initParallax()` — Scroll-based parallax layers
- `initScrollReveal()` — IntersectionObserver for scroll animations
- `initCustomCursor()` — Cursor glow effect (desktop only)
- `initNavigation()` — Mobile menu toggle, scroll behavior
- `initWaitlistForm()` — Form handling + modal
- `initAmbientEffects()` — Fog, breathing gradients

---

### Generated Assets

#### [NEW] assets/textures/hero-bg.webp
Dark, painted atmospheric texture — cavern/abyss feel, deep blue-black tones, subtle rock formations. Generated via AI image tool.

#### [NEW] assets/textures/fog-overlay.png
Semi-transparent fog/mist PNG for CSS animation overlays.

#### [NEW] assets/textures/section-divider.png
Painted brush-stroke horizontal divider between sections (replaces generic `<hr>` or border).

---

### Documentation

#### [NEW] [PLAN.md](file:///c:/Users/Shubhadeep%20Roy/Downloads/MaskGame/PLAN.md)
Copy of this implementation plan placed in project root as requested.

#### [MODIFY] [MASTER.md](file:///c:/Users/Shubhadeep%20Roy/Downloads/MaskGame/design-system/maskgame/MASTER.md)
Update with new color palette, typography, and component specs.

---

## Implementation Phases

### Phase 1: Foundation (CSS + HTML structure)
1. Create `styles.css` with design tokens, reset, typography
2. Rewrite `index.html` with new semantic structure (all 7 sections)
3. Generate atmospheric texture assets
4. Implement responsive layout (mobile-first grid)

### Phase 2: Atmosphere (Effects + Polish)
1. Implement particle system (hero canvas)
2. Add parallax scrolling layers
3. Add fog/mist CSS animations
4. Implement scroll-triggered reveal animations
5. Add custom cursor glow (desktop)
6. Add ambient background breathing

### Phase 3: Interactivity
1. Implement mobile navigation
2. Implement waitlist form + modal
3. Add smooth scroll behavior
4. Test all interactions on mobile + desktop

### Phase 4: Polish & Deploy
1. Performance audit (Lighthouse)
2. Accessibility pass (contrast, focus states, reduced motion)
3. SEO meta tags + Open Graph
4. Cross-browser testing
5. Deploy to Vercel
6. Copy plan to project root as `PLAN.md`

---

## Open Questions

> [!IMPORTANT]
> **Navigation removal:** I'm proposing to remove the 4-link nav (Intro/Clips/Art/Join) and keep only the "Join Waitlist" CTA in the fixed header. This maximizes conversion focus. Do you want to keep any section anchor links, or trust the natural scroll flow?

> [!NOTE]
> **Game lore text:** I'll need brief atmospheric descriptions for each of the 5 areas. For now I can write placeholder lore text — just let me know if you want to write these yourself or want me to draft them in-character.

> [!NOTE]
> **Which area assets to use:** You mentioned having floor tiles, transition rocks, and crawler designs. Should I incorporate any of these as decorative elements on the actual page (e.g., the crawler as a decorative illustration near the "World" section, rocks as section dividers)?

---

## Verification Plan

### Automated
- Lighthouse audit (Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 90)
- Visual check at all breakpoints (375px, 768px, 1024px, 1440px)
- `prefers-reduced-motion` test — all animations disabled gracefully
- Form validation test (empty submit, invalid email, valid email)

### Manual
- Open the deployed Vercel URL on a phone (simulating YouTube Shorts → site flow)
- Verify scroll performance on mobile (no jank)
- Verify the waitlist modal appears and dismisses correctly
- Verify all atmospheric effects look correct on both Chrome and Safari
- Time from page load to visible content (should be < 2 seconds)
