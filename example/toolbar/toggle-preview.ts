import { type MarkdownEditor } from "@cme/editor";

export const createToolbar = (editor: MarkdownEditor, toolbarId = "floating-toolbar") => {
	const toolbar = document.createElement("aside");
	toolbar.id = toolbarId;
	toolbar.style.position = "fixed";

	const toolbarButton = document.createElement("button");
	toolbarButton.style.backgroundColor = "white";
	toolbarButton.style.padding = "0.5rem 2rem";
	toolbarButton.style.fontWeight = "bold";
	toolbarButton.style.width = "20ch";
	toolbarButton.id = "toggle-preview";
	toolbarButton.addEventListener("click", () => {
		toolbarButton.innerText = editor.mode;
		editor.togglePreview();
	});
	toolbarButton.innerText = editor.mode === "preview" ? "edit" : "preview";

	toolbar.append(toolbarButton);

	document.body.append(toolbar);
};
