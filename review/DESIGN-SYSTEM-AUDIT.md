# Design System Audit & Token Specification
**Project: "QUICKSILVER" — Executive Portfolio of Rajkamal B Gowda, AI Application Architect**
*Audited & Standardized: November 2026*

---

## 1. Executive Summary & Design System Philosophy

The **QUICKSILVER** design system is engineered around **"Liquid Silver Intelligence"**—a light-theme visual paradigm reflecting Apple industrial design, Swiss editorial typography, and high-key research atelier aesthetics.

### Core Architectural Rules:
1. **Light Theme Exclusivity:** No dark mode or generic neon cyberpunk tropes. Page surfaces are high-key porcelain white, pearl, and brushed silver.
2. **Proportion Ratio:**
   - **90% Neutrals**: Porcelain `#F7F8FA`, Pearl `#EEF0F3`, White `#FFFFFF`, Graphite text `#16181C` & `#4A4F57`.
   - **8% Silver / Polished Chrome**: Brushed silver `#C9CDD3`, chrome mid `#A7ADB5`, chrome shadow `#6E747C`.
   - **2% Thin-Film Iridescence & Signal**: Iris cyan `#9FE7F5`, Iris lilac `#C9B8FF`, Iris peach `#FFD8C2`, Signal blue `#2F6BFF`.
3. **Contrast Compliance:** 100% WCAG AA compliance across all text surfaces. No faint text on low-contrast backgrounds.

---

## 2. Spacing & Layout Grid Scale

The layout enforces an 8-point baseline grid with deliberate macro-whitespace to convey authority and executive poise.

| Token | Pixels / Rem | Typical Application |
|---|---|---|
| `space-1` | 4px (0.25rem) | Fine badge margins, inline icon offsets |
| `space-2` | 8px (0.5rem) | System annotations, pill padding, micro gaps |
| `space-3` | 12px (0.75rem) | Card inner padding, metric row gaps |
| `space-4` | 16px (1.0rem) | Dossier card padding, button heights |
| `space-6` | 24px (1.5rem) | Bento card padding, section sub-headers |
| `space-8` | 32px (2.0rem) | Column gutter spacing, station headers |
| `space-12` | 48px (3.0rem) | Component group separation |
| `space-16` | 64px (4.0rem) | Station vertical rhythm (mobile) |
| `space-24` | 96px (6.0rem) | Station vertical rhythm (desktop `py-24`) |

### Sidebar Navigation Offset:
- Desktop: `w-72` (18rem) / `w-80` (20rem) fixed left column.
- Content offset: `lg:pl-72 xl:pl-80` to prevent any layout occlusion.
- Atelier Hero: Spans full width (`absolute inset-0 w-full h-full` for background canvas) with bounded content container (`max-w-7xl mx-auto`).

---

## 3. Typographic Hierarchy & Scale

We utilize an editorial hierarchy combining display sans, neutral body type, and technical monospace system labels:

| Level | Font Family | Size / Leading | Weight | Tracking | Purpose |
|---|---|---|---|---|---|
| **Display Hero** | Space Grotesk / Syne | `clamp(2.5rem, 6vw, 4.5rem)` | 700 Bold | `-0.03em` | Primary Hero statement |
| **Section Title** | Space Grotesk | `clamp(2rem, 4vw, 3rem)` | 700 Bold | `-0.025em` | Station headlines (`SYS.01` to `SYS.10`) |
| **Card Heading** | Space Grotesk | `1.25rem` – `1.5rem` | 600 SemiBold | `-0.015em` | Project titles, architecture nodes |
| **Body Primary** | Inter / Geist | `1rem` (16px) / `1.65` | 400 Regular | `normal` | Case studies, system narratives |
| **Body Secondary** | Inter / Geist | `0.875rem` (14px) / `1.5` | 400 Regular | `normal` | Captions, metadata, card summaries |
| **System Label** | JetBrains Mono | `0.6875rem` (11px) | 500 Medium | `+0.05em` | HUD badges, metric tickers, system status |
| **Code / Metrics**| JetBrains Mono | `0.8125rem` (13px) | 600 SemiBold | `normal` | Latency figures, token rates, cost tags |

---

## 4. Borders, Shadows & Surface Reduction Policy

To eliminate visual noise and "badge soup":
1. **1px Precision Borders**: Default to `border border-silver-200` (`#E4E7EB`) with subtle hover elevation to `border-silver-400`.
2. **Layered Glassmorphism**: Cards use `bg-white/90` or `bg-pearl/80` with `backdrop-blur-md` rather than aggressive opaque drop shadows.
3. **Shadow Elevation**: Soft contact shadows (`shadow-xs` to `shadow-md`), avoiding deep black drop-shadows in high-key daylight.
4. **Curated Badges**: Reduced badge clutter; maximum 3 technical badges per card, formatted as understated monochrome capsules with single-color status indicators.

---

## 5. Unified 3D Material & Lighting Specification

All 3D WebGL / R3F scenes adhere strictly to the high-key daylight studio paradigm:

- **Liquid Mercury Mesh (`MercuryMind`, `HeroCanvas`)**:
  - `MeshPhysicalMaterial`: `color = #FFFFFF`, `metalness = 1.0`, `roughness = 0.08`, `clearcoat = 1.0`, `clearcoatRoughness = 0.05`.
  - Reflects light studio environment (soft white HDRI), giving genuine chrome liquid sheen without dark or neon reflections.
- **Brushed Silver**:
  - `metalness = 0.85`, `roughness = 0.28`, subtle anisotropic grain.
- **Holo-Glass**:
  - `MeshTransmissionMaterial`: `transmission = 0.95`, `thickness = 0.4`, `roughness = 0.05`, `chromaticAberration = 0.04`, subtle thin-film iridescence on Fresnel edge normals.
- **Background Particles**:
  - Ultra-faint silver droplets (`rgba(203, 213, 225, 0.45)`), strictly placed on background canvas `z-[1]` behind all cards and interactive controls.

