/**
 * Extract the parameters from the page URL
 *
 * Example URL:
 *
 * `your-page.html?theme=dark&mode=preview&optionalParam=value`
 */

export interface PageParameters {
	theme: string;
	palette?: string;
	mode: "edit" | "preview";
}

export const DEFAULTS_PARAMS: PageParameters = {
	theme: "default",
	palette: "default",
	mode: "edit"
};

/**
 * Retrieves URL parameters and provides default values.
 *
 * @param {object} defaults - An object containing default parameter values.
 * @returns {object} An object containing the URL parameters,
 *                   merged with the default values.
 */
export function getPageParameters(defaults = {}) {
	const urlParams = new URLSearchParams(window.location.search);
	const params = { ...DEFAULTS_PARAMS, ...defaults } as PageParameters; // Create a copy of defaultParams

	for (const [key, value] of urlParams.entries()) {
		if (key === "theme" || key === "palette") {
			params[key] = value;
		}
	}

	console.log(`Loaded theme and palette`, params);
	return params;
}
