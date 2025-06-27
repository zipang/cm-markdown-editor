import {
	EditorSelection,
	Text,
	Transaction,
	type StateCommand
} from "@codemirror/state";
import type { KeyBinding } from "@codemirror/view";

/**
 * Target the marker style on the current editor selection
 * @param marker The string used to delimite a marked section
 * @returns {StateCommand} the function to run an a keybinding
 */
export const toggleSelection: (marker: string) => StateCommand =
	(marker) =>
	({ state, dispatch }) => {
		const mLength = marker.length;

		const selection = state.selection.main;
		if (selection.empty) {
			// Don't do anything
			return false;
		}

		const changes = state.changeByRange((range) => {
			const isMarkerBefore =
				state.sliceDoc(range.from - mLength, range.from) === marker;
			const isMarkerAfter =
				state.sliceDoc(range.to, range.to + mLength) === marker;
			const changes = [];

			changes.push(
				isMarkerBefore
					? {
							from: range.from - mLength,
							to: range.from,
							insert: Text.of([""])
						}
					: {
							from: range.from,
							insert: Text.of([marker])
						}
			);

			changes.push(
				isMarkerAfter
					? {
							from: range.to,
							to: range.to + mLength,
							insert: Text.of([""])
						}
					: {
							from: range.to,
							insert: Text.of([marker])
						}
			);

			const extendBefore = isMarkerBefore ? -1 * mLength : mLength;
			const extendAfter = isMarkerAfter ? -1 * mLength : mLength;

			return {
				changes,
				range: EditorSelection.range(
					range.from + extendBefore,
					range.to + extendAfter
				)
			};
		});

		dispatch(
			state.update(changes, {
				scrollIntoView: true,
				annotations: Transaction.userEvent.of("input")
			})
		);

		return true;
	};

/**
 * Toggle the italic style on the current editor selection
 */
export const toggleItalicSelection: StateCommand = toggleSelection("_");

/**
 * Toggle the italic style on the current editor selection
 */
export const toggleBoldSelection: StateCommand = toggleSelection("**");

/**
 * Toggle the inline code style on the current editor selection
 */
export const toggleCodeSelection: StateCommand = toggleSelection("\u0060");

export const markdownKeyMaps: ReadonlyArray<KeyBinding> = [
	// Note: `Mod` refers to `Ctrl` on Linux and Windows and `Cmd` on Mac keyboards
	{ key: "Mod-i", run: toggleItalicSelection },
	{ key: "Mod-b", run: toggleBoldSelection },
	// prettier-ignore
	{ key: "`", run: toggleCodeSelection }
];
