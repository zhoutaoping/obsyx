import {
	Editor,
	EditorPosition,
	EditorSuggest,
	EditorSuggestContext,
	EditorSuggestTriggerInfo,
	TFile,
	setIcon,
} from "obsidian";
import { SlashItem } from "./types";
import { SLASH_ITEMS } from "./templates";

export class SlashSuggest extends EditorSuggest<SlashItem> {
	getSuggestions(context: EditorSuggestContext): SlashItem[] {
		const query = context.query.toLowerCase();
		if (!query) {
			return SLASH_ITEMS;
		}
		return SLASH_ITEMS.filter(
			(item) =>
				item.name.toLowerCase().includes(query) ||
				item.keywords.some((k) => k.includes(query)) ||
				item.category.includes(query)
		);
	}

	onTrigger(
		cursor: EditorPosition,
		editor: Editor,
		_file: TFile | null
	): EditorSuggestTriggerInfo | null {
		const line = editor.getLine(cursor.line);
		const beforeCursor = line.slice(0, cursor.ch);

		const match = beforeCursor.match(/(?:^|\s)\/([\w一-鿿]*)$/);
		if (!match) {
			return null;
		}

		const slashIndex = beforeCursor.lastIndexOf("/");
		return {
			start: { line: cursor.line, ch: slashIndex },
			end: cursor,
			query: match[1],
		};
	}

	renderSuggestion(item: SlashItem, el: HTMLElement): void {
		const container = el.createDiv({ cls: "obsyx-slash-item" });

		const iconEl = container.createDiv({ cls: "obsyx-slash-icon" });
		setIcon(iconEl, item.icon);

		const textEl = container.createDiv({ cls: "obsyx-slash-text" });
		textEl.createDiv({ cls: "obsyx-slash-name", text: item.name });
		textEl.createDiv({ cls: "obsyx-slash-desc", text: item.description });
	}

	selectSuggestion(item: SlashItem, _evt: MouseEvent | KeyboardEvent): void {
		const { context } = this;
		if (!context) return;

		const editor = context.editor;
		const start = context.start;
		const end = context.end;

		editor.replaceRange(item.template, start, end);

		if (item.cursorOffset !== undefined) {
			const inserted = item.template;
			const lines = inserted.split("\n");
			const lastLineLen = lines[lines.length - 1].length;

			let totalChars = inserted.length;
			let targetPos = totalChars + item.cursorOffset;

			let cursorLine = start.line;
			let cursorCh = start.ch;
			let count = 0;

			for (let i = 0; i < lines.length; i++) {
				const lineLen = lines[i].length;
				if (count + lineLen >= targetPos) {
					cursorLine = start.line + i;
					cursorCh =
						(i === 0 ? start.ch : 0) + (targetPos - count);
					break;
				}
				count += lineLen + 1; // +1 for \n
			}

			editor.setCursor({ line: cursorLine, ch: cursorCh });
		} else {
			const lines = item.template.split("\n");
			const lastLine = lines[lines.length - 1];
			editor.setCursor({
				line: start.line + lines.length - 1,
				ch:
					(lines.length === 1 ? start.ch : 0) +
					lastLine.length,
			});
		}
	}
}
