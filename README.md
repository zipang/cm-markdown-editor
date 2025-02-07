# MARKDOWN THEMABLE EDITOR

## Tech

- [CodeMirror with a few plugins](https://codemirror.net/docs/)
- [Rehype, Remark.. for the markdown to HTML conversion](https://unifiedjs.com/)
- [Vite](https://vite.dev/)

## Features

### (almost) WISIWYG edit mode

The theming (typograpĥic styles colors..) are applied during the edition _but_.. the **Markdown** syntax tags like (`#` ,`##`, etc..) are always visible during with some colored sugar to make them stand out.

![Rendering Screenshot](/public/rendering-screenshot.png)

### Markdown to HTML with advanced plugins

List of preloaded-plugins:

- GFM (Github Flavored Markdown)
- Line breaks (force line breaks with single newline `\n`)
- Support for inline and block `$\LaTeX$` expressions

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
  --font-weight-base: 400;

  /** Define the usages of the font families */
  --font-family-headings: var(--font-family-serif);
  --font-family-content: var(--font-family-serif);

  /* Margins - Headings */
  --heading-margin-top: 1rem;
  --heading-margin-bottom: 0.5rem;

  /* Margins - Headings */
  --paragraph-margin-bottom: 0.8rem;

  /* Typography - List Items */
  --list-item-line-height: 1.2;

  /* Colors */
  --color-background-base: #f0f0f0;
  --color-page-background: white;

  --color-text-base: #222;
  --color-heading: black;
  --color-strong: var(--color-heading);
  --color-meta: darkgrey;
  --color-code-background: var(--color-background-base);
  --color-link: #14d1f1;

  /* Layout */
  --page-width: 80%;
  --page-max-width: 800px;
  --page-margin: 2rem;
  --page-padding: 3rem;

  /* CodeMirror Editor */
  --codemirror-selection-background: yellow;
  --codemirror-active-line-background: #00000005;
}
```

List of themes :

- default
- revisions
- fruity
- eggplant
- dracula
