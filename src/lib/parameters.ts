/**
 * Extract the parameters from the page URL
 *
 * Example URL:
 *
 * `your-page.html?theme=dark&mode=preview&optionalParam=value`
 */

import { type EditorMode } from "../editor/MarkdownEditor";

export interface PageParameters extends EditorMode {
  theme: "default" | "dracula" | "fruity";
  palette?: "default" | "fruity" | "natgeo";
}
export const DEFAULTS_PARAMS: PageParameters = {
  theme: "default",
  palette: "default",
  mode: "edit",
};

/**
 * Retrieves URL parameters and provides default values.
 *
 * @param {object} defaults - An object containing default parameter values.
 * @returns {object} An object containing the URL parameters,
 *                   merged with the default values.
 */
export function getPageParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const params = { ...DEFAULTS_PARAMS }; // Create a copy of defaultParams

  for (const [key, value] of urlParams.entries()) {
    params[key] = value;
  }

  return params;
}
