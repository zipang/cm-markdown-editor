# MARKDOWN THEMABLE EDITOR

## Tech

- [CodeMirror with a few plugins](https://codemirror.net/docs/)
- [Rehype, Remark.. for the markdown to HTML conversion](https://unifiedjs.com/)
- [Vite](https://vite.dev/)

## Features

### (almost) WISIWYG edit mode

The theming (typographic styles, colors..) are automatically applied _during_ the edition _but_.. the **Markdown** syntax tags like (`#`, `##`, etc..) are _always_ visible with some colored sugar to make them stand out.

![Rendering Screenshot](/rendering-screenshot.png)

### Markdown to HTML with advanced plugins

List of preloaded-plugins:

- [x] GFM (Github Flavored Markdown)
- [x] History (undo any edit with `Ctrl-Z`, redo with `Ctrl-Y`)
- [x] Automatic slug ids for headings (allow TOC generation)
- [x] Open external links in new window
- [x] Line breaks (force line breaks with single newline `\n`)
- [x] TODO lists (like this one)
- [x] Support for inline (`$...$`) and block (`$$...$$`) $\LaTeX$ expressions
- [x] Common keybindings + some more...
- [ ] Drop images for insertion

List of keybindings :

All the of the [standards key maps](https://codemirror.net/docs/ref/#commands.standardKeymap) plus the followings:

- `Ctrl-b`: Toggle **bold** selection
- `Ctrl-i`: Toggle _italic_ selection
- `BackQuote`: Toggle `code` selection
- `Alt-ArrowUp`, `Ctrl-Shift-ArrowUp`: Move line Up
- `Alt-ArrowDown`, `Ctrl-Shift-ArrowDown`: Move line Down
- `Shift-Alt-ArrowUp`: Copy line Up
- `Shift-Alt-ArrowDown`: Copy line Down

### Themes

Load a different theme by appending a parameter `?theme=` to the editor's URL.

Themes are just CSS files that override the current values of the available CSS variables:

```css
/**
 * Root variables for theming.
 * Define global styles for typography, colors, and layout.
 */
:root {
  /* Typography */
  --font-family-serif: serif;
  --font-family-sans: sans-serif;
  --font-family-mono: monospace;
  --font-size-base: 18px;
  --line-height-base: 1.5;
  --line-height-list-item: 1.2;
  --font-weight-base: 400;
  --font-weight-heading: bold;

  /** Define the usages of the font families */
  --font-family-headings: var(--font-family-serif);
  --font-family-content: var(--font-family-serif);

  /* Block margins */
  --heading-margin-top: 1rem;
  --heading-margin-bottom: 0.5rem;
  --paragraph-margin-bottom: 0.8rem;

  /* Colors */
  --color-background-base: #f0f0f0;
  --color-page-background: white;

  --color-text-base: #222;
  --color-headings: black;
  --color-strong: var(--color-headings);
  --color-meta: darkgrey;
  --color-code-background: var(--color-background-base);
  --color-link: #14d1f1;

  /* Layout */
  --page-width: 80%;
  --page-max-width: 800px;
  --page-margin: 2rem;
  --page-padding: 3rem;

  /* CodeMirror Editor */
  --color-selection-background: yellow;
  --codemirror-active-line-background: #00000005;
}
```

List of available themes :

- default
- natgeo
- marko
- revisions
- fruity
- recipes
- country
- dracula

### Palettes

Surcharge the theme's default color with a palette.
Load a different theme by appending a parameter `?palette=` to the editor's URL.

Palettes are just a subset of the theme's variables : they contain only the color's definitions :

```css
/**
 * Default palette
 */
:root {
  /* Colors */
  --color-background-base: #f0f0f0;
  --color-page-background: white;

  --color-text-base: #222;
  --color-headings: black;
  --color-heading-h1: var(--color-headings);
  --color-heading-h2: var(--color-headings);
  --color-heading-h3: var(--color-headings);
  --color-heading-h4: var(--color-headings);
  --color-heading-h5: var(--color-headings);
  --color-heading-h6: var(--color-headings);

  --color-strong: var(--color-headings);
  --color-meta: darkgrey;
  --color-code-background: var(--color-background-base);
  --color-link: #14d1f1;

  /* CodeMirror Editor */
  --color-selection: yellow;
  --color-active-line: #00000005;
}
```
