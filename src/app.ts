import doc from "../content/doc.md?raw";
import { MarkdownEditor } from "./editor/MarkdownEditor";
import { getPageParameters, type PageParameters } from "./lib/parameters";
import { applyTheme } from "./lib/theme-loader";
import { createToolbar } from "./toolbar/toggle-preview";

const { mode, theme } = getPageParameters() as PageParameters;

const createEditor = () => {
  try {
    const ed = new MarkdownEditor({ parentId: "page", doc, mode });
    createToolbar(ed);
  } catch (err) {
    console.error(err);
  }
};

if (theme !== "default") {
  applyTheme(theme);
}
createEditor();
