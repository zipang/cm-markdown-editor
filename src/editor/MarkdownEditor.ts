import { EditorView } from "@codemirror/view";
import { Processor, unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";
// @ts-expect-error : missing types
import rehypeFigure from "rehype-figure";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import { createEditorView, type EditorViewConfig } from "./markdown-setup";

export interface EditorMode {
  mode: "edit" | "preview";
}
export interface MarkdownEditorConfig extends EditorViewConfig, EditorMode {}

export class MarkdownEditor {
  private editorView: EditorView;
  private markdownProcessor: Processor;
  private _mode: "edit" | "preview";

  // @ts-expect-error : if the elements cannot be created an exception is thrown
  private editElt: HTMLElement;
  // @ts-expect-error : if the elements cannot be created an exception is thrown
  private previewElt: HTMLElement;

  constructor(config: MarkdownEditorConfig) {
    this._mode = config.mode || "preview";
    this.loadKatexScript();
    this.initializeContainers(config.parentId);
    this.editorView = createEditorView({
      ...config,
      parentId: config.parentId + "-editor",
    });
    // @ts-expect-error
    this.markdownProcessor = unified()
      .use(remarkParse) // Parse markdown content
      .use(remarkGfm) // Add GitHub Flavored Markdown support
      .use(remarkBreaks)
      .use(remarkMath) // Parse math expressions
      .use(remarkRehype) // Convert to HTML AST
      .use(rehypeKatex)
      .use(rehypeSlug)
      .use(rehypeExternalLinks, { target: "_blank" })
      .use(rehypeFigure, { className: "image" })
      .use(rehypeStringify); // Serialize to HTML string();
    this.updateView();
  }

  get mode() {
    return this._mode;
  }

  private async loadKatexScript() {
    const katex = await import("katex");
    globalThis.katex = katex;
    console.log("Imported katex in the global context");
  }

  private initializeContainers(parentId: string) {
    const parentElt = document.getElementById(parentId);
    if (!parentElt) {
      throw new Error(`Element with id ${parentId} not found`);
    }

    // Create edit container
    this.editElt = document.createElement("div");
    this.editElt.id = `${parentId}-editor`;
    this.editElt.style.height = "100%";

    // Create preview container
    this.previewElt = document.createElement("div");
    this.previewElt.id = `${parentId}-preview`;
    this.previewElt.style.height = "100%";
    this.previewElt.style.overflow = "auto";

    // Clear parent and add both containers
    parentElt.innerHTML = "";
    parentElt.append(this.editElt, this.previewElt);
  }

  private updateView() {
    if (this._mode === "edit") {
      this.previewElt.style.display = "none";
      this.editElt.style.display = "block";
      this.editorView.focus();
    } else {
      this.editElt.style.display = "none";
      this.previewElt.style.display = "block";
      this.previewElt.innerHTML = this.html();
    }
  }

  /**
   * Get the rendered HTML of the current markdown content
   */
  html(): string {
    const content = this.editorView.state.doc.toString();
    try {
      return this.markdownProcessor.processSync(content).toString();
    } catch (error) {
      console.error(
        "[MarkdownEditor.html()] Error processing markdown:",
        error
      );
      return `<code>${(error as Error).message}</code>`;
    }
  }

  /**
   * Current editor's content as a string
   */
  text(): string {
    return this.editorView.state.doc.toString();
  }

  /**
   * Get the underlying CodeMirror editor instance
   */
  editor(): EditorView {
    return this.editorView;
  }

  /**
   * Toggle between `edit` and `preview` modes
   * @returns the new mode after toggle
   */
  togglePreview() {
    this._mode = this._mode === "edit" ? "preview" : "edit";
    this.updateView();
    return this._mode;
  }
}
