import { App } from "obsidian";

export class InternalLinkProcessor {

	private app: App;

	constructor(app: App) {
		this.app = app;
	}

	private regex = /(?:^|[^!])\[\[(?:.*\|)?([^\]]*)\]\]/gm;

	process(markdown: string, options: any) {
		console.log(options);
		if(options.enableLinks){
			return markdown.replaceAll(this.regex,(sub, args) => {
				return `[${args}](obsidian://open?vault=${encodeURI(this.app.vault.getName())}&file=${encodeURI(args)})`;
			});
		} else {
			return markdown.replaceAll(this.regex,`$1`);
		}
	}
}


