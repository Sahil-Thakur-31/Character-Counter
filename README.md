# Character Counter Pro

A fast, polished, dependency-free text analytics tool for writers, editors, and developers. Type or paste text and get live character, word, sentence, and paragraph counts alongside readability metrics, word-frequency analysis, and social-media length limits - all running entirely in the browser with zero backend.

## Features

**Core analytics**
- Live character, word, sentence, and paragraph counts
- Character count excluding whitespace
- Reading time and speaking time estimates
- Average word length and longest word
- Unique word count
- Flesch–Kincaid readability grade with a plain-language label (Very easy → Expert)
- Word density ranking with relative-frequency bars

**Editing tools**
- Undo / redo with its own history stack (independent of browser-native undo)
- Case conversion: UPPERCASE, lowercase, Title Case, Sentence case, Capitalize Words - applies to the current selection or the whole document
- Find & replace with live match count, replace-one, and replace-all
- Copy to clipboard, import a `.txt`/`.md` file, export the current text as `.txt`, `.md`, `.pdf`, or `.doc` (Word), and clear with one click
- Character-limit goals for common formats (X/Twitter post, SMS, SEO title, meta description, YouTube title, Instagram caption) with a live countdown ring that shifts color as you approach or exceed the limit

**Interface**
- Light and dark themes with a smooth, animated toggle, persisted across sessions
- Focus mode that hides secondary chrome for distraction-free writing
- Adjustable editor font size and line height
- Independently scrolling editor and analytics panels within a fixed, full-viewport layout
- Toast notifications for actions like copy, export, import, and replace
- All preferences and your current text are saved to `localStorage`, so nothing is lost on refresh

## Getting started

No build step, no dependencies, no server required.

1. Clone or download this repository.
2. Open `index.html` in any modern browser.

To serve it locally instead of opening the file directly (useful for consistent clipboard/file-API behavior):

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then visit `http://localhost:8080`.

## Keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Shift + Z` or `Ctrl/Cmd + Y` | Redo |
| `Esc` | Close settings, find & replace, or any open dropdown |

## Project structure

```
Character-Counter/
├── index.html    # Markup and layout
├── styles.css    # Design tokens, theming, animations, responsive layout
├── script.js     # All application logic (vanilla JS, no framework)
└── README.md
```

## Tech stack

Vanilla HTML, CSS, and JavaScript - no frameworks, bundlers, or build tools. Fonts are loaded from Google Fonts (Plus Jakarta Sans, JetBrains Mono); everything else, including every icon, is self-contained inline SVG.

## Browser support

Any modern evergreen browser (Chrome, Edge, Firefox, Safari). Uses the Clipboard API, `localStorage`, CSS `color-mix()`, and CSS custom properties.

## License

MIT - free to use, modify, and distribute.
