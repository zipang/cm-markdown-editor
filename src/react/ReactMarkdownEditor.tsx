import { type FC, useLayoutEffect, useRef } from "react";
import { MarkdownEditor } from "../editor";
import { useMarkdownEditor } from "./ReactMarkdownEditorProvider";

export interface ReactMarkdownEditorProps {
  name?: string;
  content?: string;
  mode?: "edit" | "preview";
}

export const ReactMarkdownEditor: FC<ReactMarkdownEditorProps> = ({
  name = "editor",
  content = "",
  mode = "edit",
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { setEditor } = useMarkdownEditor();

  useLayoutEffect(() => {
    if (!textareaRef?.current) return;

    const textarea = textareaRef.current;
    if (!textarea.id)
      textarea.id = `editor-${Math.random().toString(36).slice(2)}`;

    const editor = new MarkdownEditor({
      parentId: textarea.id,
      doc: content,
      mode,
    });

    setEditor(editor);

    return () => {
      // Cleanup if needed
    };
  }, [content, mode]);

  return <textarea name={name} id={name} ref={textareaRef} />;
};
