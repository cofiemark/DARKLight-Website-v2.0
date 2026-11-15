# Downloads Page UI & Visual Graphics Redesign Spec

**Date:** 2026-11-15  
**Target File:** `pages/Downloads.tsx`  
**Selected Approach:** Unified Interactive Hardware Hub with Board Switcher + Categorized Resource Cards

## 1. Overview & Goals
Transform `pages/Downloads.tsx` from a plain 4-table text page into a visually rich, hardware-themed **Developer & Hardware Downloads Hub** aligned with the DarkLight brand aesthetic (`BoardShowcaseCarousel.tsx` and `Home.tsx`).

## 2. Visual & Interactive Sections

### 2.1 Hero Banner with Custom SVG Toolchain Graphic
- Glassmorphic header container with subtle circuit grid background and ambient radial glow.
- Custom inline SVG illustration showing the **DarkLight Development Pipeline**:
  `SEGGER Studio IDE` → `J-Link SWD/JTAG Probe` → `DarkLight Cortex-M0 Silicon` with animated signal lines.
- Quick ecosystem badges (`SDK v2.4.0`, `5 Hardware Targets`, `3.3V Logic`, `RTOS Ready`).
- Live **Search Input** + **Category Filter Pills** (`All`, `Toolchains & Drivers`, `Board SDK & Docs`, `RTOS Templates`, `Libraries`) so developers can filter resources across the page immediately.

### 2.2 Sticky Sidebar Navigation
- Upgraded sticky left navigation with active section styling, icons, quick-jump links (`#software-tools`, `#board-hub`, `#libraries`), and direct board sub-links that select the target board and scroll to `#board-hub`.

### 2.3 Software Tools & Drivers Bento Grid (`#software-tools`)
- 3 rich cards for **SEGGER Embedded Studio**, **J-Link Software Pack**, and **USB Driver Package**.
- Each card includes:
  - Custom category icon & decorative schematic/waveform SVG accent
  - Type badge (`IDE`, `Debugger`, `Driver`), version pill (`v8.16a`, `v7.96`, `v2.1.0`), and OS compatibility (`Win • macOS • Linux`)
  - Styled action button (`Visit SEGGER` with external link icon or `Download` with download icon).

### 2.4 Interactive 5-Board Hardware Hub (`#board-hub`)
- Supports all 5 DarkLight boards from `BOARDS` (`DarkLight Uhuru`, `DarkLight Katana`, `DarkLight Bravo`, `DarkLight Uhuru Connect`, `DarkLight Katana Connect`).
- **Board Selector Tabs**: Tier-colored interactive pills with live status dot.
- **Selected Board Visual Banner**:
  - High-resolution board photography with silicon overlay badges (`48MHz Cortex-M0`, `256KB Flash`, `48-Pin`, plus `WiFi 6 + BLE 5.0` on Connect boards).
  - Custom SVG IC package / pinout graphic motif.
  - **"View Technical Pinout"** button that opens an interactive Pinout Modal directly on the Downloads page.
- **Board Downloadables Card Grid**:
  - 6 categorized cards per board (`CPU Support Package`, `Datasheet`, `FreeRTOS Template`, `EmbOS Template`, `Baremetal Template`, `Example Projects`), dynamically tailored with the selected board's name, version, file format badge (`SDK`, `PDF`, `ZIP`, `EXAMPLES`), file size, and primary action button.

### 2.5 Peripheral Driver Libraries (`#libraries`)
- Visual developer cards for `lib_ws2812b` and `lib_apa102` featuring:
  - Custom **LED Protocol Waveform / Timing SVG graphic** (800kHz NZR pulse train for WS2812B; dual-line SPI clock+data waveform for APA102)
  - Non-blocking DMA hardware badge, header file preview pill (`#include "dl_ws2812b.h"`), version/size tags, and `Download ZIP` button.
