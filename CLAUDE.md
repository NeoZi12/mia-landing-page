@AGENTS.md

# Project Collaboration Instructions

## 1. Figma-to-Tailwind Conversion
User provides Figma CSS + screenshots. Convert Figma CSS to Tailwind CSS. If direct conversion isn't possible, find a smart Tailwind equivalent that produces the exact same visual result. The goal is always a pixel-perfect match to the Figma design — never approximate or invent styles.

## 2. No Guessing — Always Ask First
Every time we add a new page or feature, ask clarifying questions so everything is 100% clear before writing any code. Never make assumptions about layout, content, interactions, or intent.

## 3. Pages Must Fit the Viewport — No Scrolling
Every page must be exactly the size of the browser window on desktop. No content should overflow or require scrolling beyond the viewport height. Use `h-screen`, `overflow-hidden`, or equivalent to constrain pages to the viewport.

## 5. Navbar Spacing — Always Clear the Fixed Navbar
The fixed navbar sits at `top: 16px`, height `72px` — bottom edge at **88px** from the top of the viewport. Every section (except the hero, where the navbar is hidden) must have a minimum `padding-top: 104px` (88px + 16px breathing room) so content never slides under the navbar.

## 4. 100% Responsive at All Times
Every addition must work perfectly on mobile, iPad/tablet, and smaller desktop screens. Always add responsive Tailwind breakpoints (sm, md, lg) for every layout. Responsiveness is not optional — verify it for every change.
