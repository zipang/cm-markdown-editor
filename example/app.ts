import { MarkdownEditor } from "@cme/editor";
import { applyTheme, applyPalette } from "@cme/utils";
import { getPageParameters, type PageParameters } from "./parameters";
import { createToolbar } from "./toolbar/toggle-preview";
import "katex/dist/katex.min.css";

const { mode, theme, palette } = getPageParameters() as PageParameters;
const baseUrl = document.location.href;

const createEditor = (content = "") => {
  try {
    applyTheme(theme, baseUrl);
    applyPalette(palette, baseUrl);
    const ed = new MarkdownEditor({ parentId: "page", doc: content, mode });
    createToolbar(ed);
  } catch (err) {
    console.error(err);
  }
};

fetch("/content/recipes/bread.md")
  .then((resp) => resp.text())
  .then(createEditor);
