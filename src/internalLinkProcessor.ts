import { ObsidianUtils } from "./obsidianUtils";

export class InternalLinkProcessor {

	private utils: ObsidianUtils;

	constructor(utils: ObsidianUtils) {
		this.utils = utils;
	}

	private regex = /(?<=[^!]|^)\[\[(?:.*\|)?([^\]]*)\]\]/gm;

	process(markdown: string, options: any) {
		if(options.enableLinks){
			return markdown.replaceAll(this.regex,(sub, args) => {
				return `[${args}](obsidian://open?vault=${encodeURI(this.utils.getVaultName())}&file=${encodeURI(args)})`;
			});
		} else {
			return markdown.replaceAll(this.regex,`$1`);
		}
	}
}


