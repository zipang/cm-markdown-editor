# MARKDOWN THEMABLE EDITOR

_A distraction free Markdown editor based on CodeMirror_

## Technical stack

- [Bun](https://bun.sh/) is used as the Typescript runtime, bundler, and dev server !
- [CodeMirror (with a few plugins)](https://codemirror.net/docs/) is the underlying editor.
- [Rehype, Remark..](https://unifiedjs.com/) for parsing of markdown and HTML conversion.

## Demo

Open the page at https://zipang.github.io/cm-markdown-editor : the editor is preloaded with the content of this _README_.
When clicking on the **PREVIEW** button you can toggle between the preview and edit modes.
By appending some parameters like `theme` and `palette` to the URL you can change the default theme and palette.

Eg.: https://zipang.github.io/cm-markdown-editor?theme=marko&palette=natgeo

## Features

### (almost) WISIWYG edit mode

The theming (typographic styles, colors..) are automatically applied _during_ the edition _but_.. the **Markdown** syntax tags like (`#`, `##`, etc..) are _always_ visible with some colored sugar to make them stand out.

![Preview screenshot](/preview-screenshot.png)

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
- clean
- dracula
- eggplant
- fashion
- fruity
- marko
- natgeo
- readable
- recipes
- revisions
- science
- starwars

### Palettes

Surcharge the theme's default color with a palette.
Load a different palette by appending a parameter `?palette=` to the editor's URL.

Palettes are just a subset of all the theme's variables. They contain only the colors definitions and how to apply them to specific content:

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
