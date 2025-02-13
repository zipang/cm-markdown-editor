import {
  EditorSelection,
  StateCommand,
  Text,
  Transaction,
} from "@codemirror/state";
import type { EditorView, KeyBinding } from "@codemirror/view";

/**
 * Target the italic style on the current editor selection
 * @param target
 * @returns
 */
export const toggleItalicSelection: StateCommand = ({ state, dispatch }) => {
  const changes = state.changeByRange((range) => {
    const isItalicBefore = state.sliceDoc(range.from - 1, range.from) === "_";
    const isItalicAfter = state.sliceDoc(range.to, range.to + 1) === "_";
    const changes = [];

    changes.push(
      isItalicBefore
        ? {
            from: range.from - 1,
            to: range.from,
            insert: Text.of([""]),
          }
        : {
            from: range.from,
            insert: Text.of(["_"]),
          }
    );

    changes.push(
      isItalicAfter
        ? {
            from: range.to,
            to: range.to + 1,
            insert: Text.of([""]),
          }
        : {
            from: range.to,
            insert: Text.of(["_"]),
          }
    );

    const extendBefore = isItalicBefore ? -1 : 1;
    const extendAfter = isItalicAfter ? -1 : 1;

    return {
      changes,
      range: EditorSelection.range(
        range.from + extendBefore,
        range.to + extendAfter
      ),
    };
  });

  dispatch(
    state.update(changes, {
      scrollIntoView: true,
      annotations: Transaction.userEvent.of("input"),
    })
  );

  return true;
};

/**
 * Target the italic style on the current editor selection
 * @param target
 * @returns
 */
export const toggleBoldSelection: StateCommand = ({ state, dispatch }) => {
  const changes = state.changeByRange((range) => {
    const isBoldBefore = state.sliceDoc(range.from - 2, range.from) === "**";
    const isBoldAfter = state.sliceDoc(range.to, range.to + 2) === "**";
    const changes = [];

    changes.push(
      isBoldBefore
        ? {
            from: range.from - 2,
            to: range.from,
            insert: Text.of([""]),
          }
        : {
            from: range.from,
            insert: Text.of(["**"]),
          }
    );

    changes.push(
      isBoldAfter
        ? {
            from: range.to,
            to: range.to + 2,
            insert: Text.of([""]),
          }
        : {
            from: range.to,
            insert: Text.of(["**"]),
          }
    );

    const extendBefore = isBoldBefore ? -2 : 2;
    const extendAfter = isBoldAfter ? -2 : 2;

    return {
      changes,
      range: EditorSelection.range(
        range.from + extendBefore,
        range.to + extendAfter
      ),
    };
  });

  dispatch(
    state.update(changes, {
      scrollIntoView: true,
      annotations: Transaction.userEvent.of("input"),
    })
  );

  return true;
};

export const markdownKeyMaps: ReadonlyArray<KeyBinding> = [
  { key: "Ctrl-i", run: toggleItalicSelection },
  { key: "Ctrl-b", run: toggleBoldSelection },
];
