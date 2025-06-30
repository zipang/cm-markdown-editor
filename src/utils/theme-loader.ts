/**
 * Dynamically loads a CSS theme file into the DOM.
 *
 * @param {string} theme - The name of the CSS theme file to load.
 * @param {string} baseUrl - The base location of the `style/` dir
 */
export function applyTheme(theme = "default", baseUrl = "") {
	// Check if a theme link element already exists
	let themeLink = document.getElementById("theme-loader") as HTMLLinkElement;

	// If not, create one
	if (!themeLink) {
		themeLink = document.createElement("link");
		themeLink.id = "theme-loader";
		themeLink.rel = "stylesheet";
		document.head.appendChild(themeLink);
	}

	const themeUrl = new URL(
		`style/themes/${theme}.css`,
		baseUrl || window.location.href
	);
	// Set the href attribute to the new theme URL
	themeLink.href = themeUrl.toString();

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
export function applyPalette(palette = "default", baseUrl = "") {
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

	const paletteUrl = new URL(
		`style/palettes/${palette}.css`,
		baseUrl || window.location.href
	);
	// Set the href attribute to the new theme URL
	paletteLink.href = paletteUrl.toString();

	// Optional: Add an event listener to handle load errors
	paletteLink.addEventListener("error", () => {
		console.error("Failed to load palette:", paletteUrl);
	});
}
