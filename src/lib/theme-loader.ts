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
    themeLink.id = "theme-link";
    themeLink.rel = "stylesheet";
    document.head.appendChild(themeLink);
  }

  const themeUrl = `themes/${theme}.css`;
  // Set the href attribute to the new theme URL
  themeLink.href = themeUrl;

  // Optional: Add an event listener to handle load errors
  themeLink.addEventListener("error", () => {
    console.error("Failed to load theme:", themeUrl);
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
