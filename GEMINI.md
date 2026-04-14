# MIA TAX - SOURCE OF TRUTH & RULES

## 1. Tech Stack
- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind v4, Framer Motion
- **Design:** Dark Navy (#002069) + Blue (#3B6FD8), RTL Hebrew (Heebo font).

## 2. Layout & Design Rules (CRITICAL)
- **Pixel-Perfect:** Convert Figma CSS to Tailwind exactly. No approximations.
- **Viewport Locked:** Every page must fit the desktop viewport. **NO SCROLLING.** Use `h-screen` and `overflow-hidden`.
- **Navbar Clearance:** The fixed navbar ends at **88px** from the top. All sections (except Hero) MUST have `pt-[104px]` (88px + 16px buffer) to prevent content overlap.
- **Responsiveness:** Mobile and Tablet breakpoints are mandatory for every component.

## 3. Communication Strategy
- **No Guessing:** Ask clarifying questions before writing code for new features.
- **Short & Direct:** Keep explanations very short and to the point.

## 4. Performance Rules
- **SKIP ANALYSIS:** Do NOT index the project or perform a full analysis. 
- **READY TRIGGER:** Read this file, acknowledge with "Ready for Mia Tax," and wait for my code snippets.