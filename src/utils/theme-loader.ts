// @see https://vite.dev/guide/env-and-mode.html#built-in-constants
const BASE_URL = import.meta.env.BASE_URL;

import { resolve } from "path";

/**
 * Dynamically loads a CSS theme file into the DOM.
 *
 * @param {string} theme - The name of the CSS theme file to load.
 */
export function applyTheme(theme = "default") {
  // Check if a theme link element already exists
  let themeLink = document.getElementById("theme-loader") as HTMLLinkElement;

  // If not, create one
  if (!themeLink) {
    themeLink = document.createElement("link");
    themeLink.id = "theme-loader";
    themeLink.rel = "stylesheet";
    document.head.appendChild(themeLink);
  }

  const themeUrl = resolve(BASE_URL, `style/themes/${theme}.css`);
  // Set the href attribute to the new theme URL
  themeLink.href = themeUrl;

  // Optional: Add an event listener to handle load errors
  themeLink.addEventListener("error", () => {
    console.error("Failed to load theme:", themeUrl);
  });
}
/**
 * Dynamically loads a CSS palette file into the DOM.
 *
 * @param {string} palette - The name of the CSS theme file to load.
 */
export function applyPalette(palette = "default") {
  // Check if a theme link element already exists
  let paletteLink = document.getElementById(
    "palette-loader"
  ) as HTMLLinkElement;

  // If not, create one
  if (!paletteLink) {
    paletteLink = document.createElement("link");
    paletteLink.id = "palette-loader";
    paletteLink.rel = "stylesheet";
    document.head.appendChild(paletteLink);
  }

  const paletteUrl = resolve(BASE_URL, `style/palettes/${palette}.css`);
  // Set the href attribute to the new theme URL
  paletteLink.href = paletteUrl;

  // Optional: Add an event listener to handle load errors
  paletteLink.addEventListener("error", () => {
    console.error("Failed to load palette:", paletteUrl);
  });
}

/**
 * Example usage:
 *
 * To load a theme, call the loadTheme function with the name of the theme file.
 * For example:
 *
 * loadTheme('dracula');
 * loadTheme('default');
 */
