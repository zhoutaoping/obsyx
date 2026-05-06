import { Plugin } from "obsidian";
import { SlashSuggest } from "./slash-suggest";

export default class ObsyxPlugin extends Plugin {
	async onload() {
		this.registerEditorSuggest(new SlashSuggest(this.app));
	}
}
