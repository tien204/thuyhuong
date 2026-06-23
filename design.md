---
name: Đinh Thị Thủy Hương Portfolio
description: Warm café canvas, Starbucks green accent, editorial case-study layout
colors:
  canvas: "#f2f0eb"
  surface-soft: "#f9f9f9"
  surface-strong: "#edebe9"
  white: "#ffffff"
  primary: "#006241"
  primary-active: "#00754a"
  green-house: "#1e3932"
  green-light: "#d4e9e2"
  gold: "#cba258"
  gold-lightest: "#faf6ee"
  ink: "rgba(0, 0, 0, 0.87)"
  body: "rgba(0, 0, 0, 0.58)"
  hero-navy: "#0a1628"
  hairline: "#e7e7e7"
  input-border: "#d6dbde"
typography:
  display:
    fontFamily: "var(--font-inter), Helvetica Neue, Helvetica, Arial, sans-serif"
    fontWeight: 800
    letterSpacing: "-0.04em"
  body:
    fontFamily: "var(--font-inter), Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  script:
    fontFamily: "var(--font-caveat), Kalam, cursive"
    fontWeight: 500
  ribbon:
    fontFamily: "Arial Black, Segoe UI Black, sans-serif"
    fontWeight: 900
rounded:
  sm: "4px"
  card: "12px"
  pill: "50px"
  circle: "50%"
spacing:
  section: "4rem"
  base: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary-active}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "7px 16px"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "16px 24px"
  case-study-bar:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
---

# Design System: Portfolio Thủy Hương

## Overview

**Creative North Star: "The Branding Boardroom"**

Hệ thống lấy cảm hứng từ Starbucks digital: nền warm neutral như phòng họp café sáng, một accent xanh đậm mang cảm giác tin cậy và chuyên nghiệp. Typography Inter với weight mạnh cho headline, Caveat cho chi tiết handwritten nhỏ. Layout ưu tiên photography và mockup thật, asymmetric overlap trong case study.

Không dùng pure black (#000) cho nền chính; hero navy chỉ cho band hero. Gold giới hạn cho Rewards ceremony, không làm accent phụ.

**Key Characteristics:**
- Canvas warm (`#f2f0eb`) + surface cool (`#f9f9f9`) xen kẽ theo section.
- Một accent green (`#006241` / `#00754a`) cho heading, ribbon, CTA, case-study bar.
- Radius mềm: card 12px, pill 50px, circle cho orb/button tròn.
- Shadow có kiểm soát: `shadow-card`, `shadow-frap` từ globals; tránh drop-shadow filter trên PNG khi scroll.
- Max-width container ~1280–1320px, gutter responsive qua `--outer-gutter-*`.

## Colors

Palette warm café với green làm single accent chính.

### Primary
- **Starbucks Green** (`#006241`): Heading case study, ribbon number accent, timeline dots, bar Social Post.
- **Green Accent** (`#00754a`): Links phụ, focus ring, button primary, ribbon texture.

### Secondary
- **Green House** (`#1e3932`): Profile navy, feature band, card rewards tone.
- **Green Light** (`#d4e9e2`): Disabled / soft fill khi cần.

### Tertiary
- **Gold** (`#cba258`): Chỉ rewards-pill và ceremony moments, không dùng cho CTA chính.

### Neutral
- **Canvas Warm** (`#f2f0eb`): Nền section chính, profile cream.
- **Surface Soft** (`#f9f9f9`): Card case study container.
- **Ink** (`rgba(0,0,0,0.87)`): Body text chính.
- **Body Soft** (`rgba(0,0,0,0.58)`): Mô tả phụ.
- **Hero Navy** (`#0a1628`): Hero background band.

**The One Green Rule.** Green xuất hiện có chủ đích trên heading, ribbon, bar và link; không trộn đỏ campaign hay blue brand làm accent song song.

## Typography

**Display / Body:** Inter (`--font-inter`)  
**Script:** Caveat (`--font-caveat`) cho annotation nhỏ (ví dụ năm trên hero avatar)  
**Ribbon:** Arial Black stack cho số section và tag pill  

**Character:** Sans sạch, weight contrast cao ở display; body relaxed 1.5 line-height, max ~65ch cho đoạn dài.

### Hierarchy
- **Hero display** (800–900, clamp ~4–13rem, tracking tight): PORTFOLIO wordmark.
- **Section title** (extrabold, clamp 1.4–2rem): Tên campaign.
- **Body** (400, 14–16px): Mô tả case study, profile summary.
- **Label / ribbon** (black weight, uppercase tracking): Ribbon tags `01`, `Branding Planner`.

## Elevation

Hệ thống dùng tonal layering + shadow có giới hạn. Depth chủ yếu từ photography overlap, rotate nhẹ, z-index trong case study board.

### Shadow Vocabulary
- **shadow-card** (`--shadow-card`): Card profile, pill trắng trên bar xanh.
- **shadow-frap** (`--shadow-frap`): Bar Social Post, button orb.
- **shadow-card-hover**: Lift nhẹ translateY(-1px) khi hover (desktop only).

**The Flat Asset Rule.** PNG cutout (laptop, ly, túi) không dùng drop-shadow filter; tránh repaint khi scroll.

## Components

### Buttons
- **Shape:** Pill 50px radius, min height tactile, `scale(0.95)` on active.
- **Primary:** Green accent fill, white text.
- **Focus:** 2px outline `--color-green-accent`.

### Cards
- **Profile card:** White, radius 12px, shadow nhẹ blue-tinted `rgba(0,49,139,0.15)`.
- **Case study board:** Surface soft, rounded 32px, padding generous sm→lg.

### Ribbon Section Header
- 3D WebGL ribbon (green accent texture), số + tag pill viền green.
- Pause render khi off-screen (IntersectionObserver).

### Case Study Section Bar
- Pill bar full-width: `--color-primary` background.
- White label pill "Social Post", italic description, chevron toggle tròn.

### Profile Board
- Two-column lg: avatar card trái, tools/clients/education phải.
- Bullet accent: pill navy 4×12px.

## Do's and Don'ts

**Do**
- Dùng CSS variables từ `globals.css` (`--color-primary`, `--color-canvas`, v.v.).
- Giữ asymmetric layout trong experience case study.
- Nén ảnh lớn (WebP khi có thể); `sizes` chính xác trên Next Image.
- Semantic HTML: `section`, `article`, `header` cho case study.

**Don't**
- Thêm accent đỏ/xanh dương song song với green primary.
- Dùng `#000` / `#fff` thuần; dùng token `--color-ink`, `--color-white`.
- Box-shadow + filter stack trên nhiều layer PNG chồng nhau.
- Copy placeholder "Section này được dựng theo bố cục editorial..." khi ship production.
