export class CalloutProcessor {
	private regex = />\s\[!([^\]]+)\]-* *(.*)/;

	process(markdown: string) {

		const lineArray = markdown.split('\n');
		const outArray = [];

		let startIdx = -1;
		let add = true;
		for (let i = 0; i < lineArray.length; i++) {
			const line = lineArray[i];

			if (line.trim().startsWith('>') && startIdx == -1) {
				startIdx = i;
				add = false;
			} else if (!line.trim().startsWith('>') && startIdx > -1) {
				const content = this.transformBlock(lineArray, startIdx, i - 1);

				for (let index = 0; index < content.length; index++) {
					const contentLine = content[index];
					outArray.push(contentLine);
				}
				startIdx = -1;
				add = true;
			}

			if (add) {
				outArray.push(lineArray[i]);
			}
		}
		return outArray.join('\n');
	}

	transformBlock(lines: string[], start: number, end: number) {

		const result: string[] = [];

		if (this.regex.test(lines[start])) {
			const [, type, titleLine] = this.regex.exec(lines[start]);

			const icon = this.iconFrom(type);
			const title = this.titleFrom(type, titleLine);
			const color = this.colorFrom(type);

			result.push(`<div class="callout ${color}">`);
			result.push('<div class="callout-title">');
			result.push('<div class="callout-icon">');
			result.push('');
			result.push(icon);
			result.push('');
			result.push('</div>');
			result.push('<div class="callout-title-inner">');
			result.push('');
			result.push(title);
			result.push('');
			result.push('</div>');
			result.push('</div>');

			result.push('<div class="callout-content">');
			for (let i = start + 1; i <= end; i++) {
				result.push('');
				const line = lines[i].trim().substring(1).trim();
				result.push(line);

			}
			result.push('');
			result.push('</div>');
			result.push('</div>');

		} else {
			for (let i = start; i <= end; i++) {
				const line = lines[i];
				result.push(line);
			}
		}

		return result;
	}
	colorFrom(type: string) {
		const input = type.toLowerCase();

		switch (input) {

			case 'abstract':
			case 'summary':
			case 'tldr':
			case 'info':
				return 'callout-color1';
			case 'todo':
			case 'tip':
			case 'hint':
			case 'important':
				return 'callout-color2'
			case 'success':
			case 'check':
			case 'done':
				return 'callout-color3'
			case 'question':
			case 'help':
			case 'faq':
				return 'callout-color4'
			case 'warning':
			case 'caution':
			case 'attention':
				return 'callout-color5'
			case 'failure':
			case 'fail':
			case 'missing':
				return 'callout-color6'
			case 'danger':
			case 'error':
			case 'bug':
				return 'callout-color7'
			case 'example':
				return 'callout-color8'
			case 'quote':
			case 'cite':
				return 'callout-color9'
			default:
				return 'callout-color-default'
		}
	}
	titleFrom(icon: string, titleLine: string): string {
		if (titleLine) {
			return titleLine;
		} else {
			return icon[0].toUpperCase() + icon.substring(1).toLowerCase();
		}
	}

	iconFrom(type: string): string {
		const input = type.toLowerCase();

		switch (input) {

			case 'abstract':
			case 'summary':
			case 'tldr':
				return ':fas_clipboard-list:';
			case 'info':
				return ':fas_info-circle:'
			case 'todo':
				return ':fas_check-circle:'
			case 'tip':
			case 'hint':
			case 'important':
				return ':fas_fire-alt:'
			case 'success':
			case 'check':
			case 'done':
				return ':fas_check:'
			case 'question':
			case 'help':
			case 'faq':
				return ':fas_question-circle:'
			case 'warning':
			case 'caution':
			case 'attention':
				return ':fas_exclamation-triangle:'
			case 'failure':
			case 'fail':
			case 'missing':
				return ':fas_times:'
			case 'danger':
			case 'error':
				return ':fas_bolt:'
			case 'bug':
				return ':fas_bug:'
			case 'example':
				return ':fas_list:'
			case 'quote':
			case 'cite':
				return ':fas_quote-left:'
			default:
				return ':fas_pencil-alt:'
		}
	}
}
