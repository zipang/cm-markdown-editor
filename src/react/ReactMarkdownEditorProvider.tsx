import {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { MarkdownEditor } from "../editor";

interface MarkdownEditorContextProps {
  editor: MarkdownEditor | null;
  setEditor: (ed: MarkdownEditor) => void;
}

const MarkdownEditorContext = createContext<MarkdownEditorContextProps>({
  editor: null,
  setEditor: () => null,
});

export const useMarkdownEditor = () => useContext(MarkdownEditorContext);

export const MarkdownEditorProvider: FC<PropsWithChildren> = ({ children }) => {
  const [editor, setEditor] = useState<MarkdownEditor | null>(null);

  return (
    <MarkdownEditorContext.Provider value={{ editor, setEditor }}>
      {children}
    </MarkdownEditorContext.Provider>
  );
};
