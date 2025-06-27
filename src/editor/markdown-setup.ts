import type { Extension } from "@codemirror/state";
import {
	indentOnInput,
	HighlightStyle,
	syntaxHighlighting
} from "@codemirror/language";
import {
	EditorView,
	drawSelection,
	dropCursor,
	highlightActiveLine,
	keymap,
	type KeyBinding
} from "@codemirror/view";
import {
	standardKeymap,
	indentWithTab,
	history,
	historyKeymap,
	moveLineUp,
	moveLineDown,
	copyLineUp,
	copyLineDown
} from "@codemirror/commands";

import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { tags as t } from "@lezer/highlight";
import { markdownKeyMaps } from "./markdown-keymaps";

/**
 * Extract a few bindings from the defaultKeymap
 */
const extendedKeymaps: readonly KeyBinding[] = [
	{ key: "Alt-ArrowUp", run: moveLineUp },
	{ key: "Ctrl-Shift-ArrowUp", run: moveLineUp },
	{ key: "Shift-Alt-ArrowUp", run: copyLineUp },
	{ key: "Alt-ArrowDown", run: moveLineDown },
	{ key: "Ctrl-Shift-ArrowDown", run: moveLineDown },
	{ key: "Shift-Alt-ArrowDown", run: copyLineDown }
];

/**
 * Replace the basicsetup provided by code mirror to suppress all code-relative extensions
 */
export const basicWritingSetup: Extension[] = [
	history(),
	highlightActiveLine(),
	drawSelection(),
	dropCursor(),
	indentOnInput(),
	EditorView.lineWrapping,
	keymap.of([
		...standardKeymap,
		...historyKeymap,
		indentWithTab,
		...extendedKeymaps
	])
];

/**
 * Position classes to style all the markdown nodes in edit mode like their HTML equivalents
 */
export const markdownHighlights: Extension = syntaxHighlighting(
	HighlightStyle.define([
		{
			tag: t.heading1,
			class: "cm-heading-h1"
		},
		{
			tag: t.heading2,
			class: "cm-heading-h2"
		},
		{
			tag: t.heading3,
			class: "cm-heading-h3"
		},
		{
			tag: t.heading4,
			class: "cm-heading-h4"
		},
		{
			tag: t.link,
			class: "cm-link"
		},
		{
			tag: t.emphasis,
			class: "cm-italic"
		},
		{
			tag: t.strong,
			class: "cm-strong"
		},
		{
			tag: t.monospace,
			class: "cm-mono"
		},
		{
			tag: t.content,
			class: "cm-p"
		},
		{
			tag: t.meta,
			class: "cm-meta"
		}
	]),
	{ fallback: false }
);

export const defaultMarkdownSetup: Extension[] = [
	basicWritingSetup,
	markdown({
		base: markdownLanguage,
		codeLanguages: [],
		completeHTMLTags: false,
		addKeymap: true
	}),
	keymap.of([...markdownKeyMaps]),
	markdownHighlights
];

export interface EditorViewConfig {
	parentId: string;
	doc?: string;
	extensions?: Extension[];
}

/**
 * Create a new CodeMirror editor on the provided DOM element
 * Can accept additional extensions that will be appended to the default ones
 * @param editorViewConfig
 * @returns CodeMirror instance of the EditorView
 */
export const createEditorView = ({
	parentId,
	doc = "",
	extensions = []
}: EditorViewConfig) => {
	const parent = document?.getElementById(parentId);

	if (!parent) {
		throw new Error(
			`Element with provided id #${parentId} doesn't exist in the DOM.`
		);
	}
	const editorExtensions = extensions.length
		? [...defaultMarkdownSetup, ...extensions]
		: defaultMarkdownSetup;

	console.log(
		`Creating new CodeMirror instance inside #${parentId} with ${extensions.length} custom extensions`
	);

	return new EditorView({
		doc,
		parent,
		extensions: editorExtensions
	});
};
