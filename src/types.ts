export interface SlashItem {
	id: string;
	name: string;
	description: string;
	icon: string;
	category: string;
	keywords: string[];
	template: string;
	cursorOffset?: number;
}
