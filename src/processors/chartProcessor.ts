import { Options } from "src/options";

export class ChartProcessor {

	private typeRegex = /type:\s(\w*)/;
	private labelRegex = /labels:\s(.*)/;
	private datasetRegex = /title:\s(.*)\s*data:\s(.*)/g

	process(markdown: string, options: Options) {
		return this.transformChart(markdown, options);
	}

	transformChart(markdown: string, options: Options): string {
		const startIdx = markdown.indexOf('```chart');

		if (startIdx < 0) {
			return markdown;
		} else {
			const endIdx = markdown.indexOf('```', startIdx + 11);
			if (endIdx < 0) {
				return markdown;
			}

			const before = markdown.substring(0, startIdx);
			const after = markdown.substring(endIdx + 3);
			const chartMarkup = markdown.substring(startIdx + 8, endIdx);

			let result = "";

			if (this.typeRegex.test(chartMarkup)) {
				const [, type] = this.typeRegex.exec(chartMarkup);

				result = result + `<canvas style="height:${options.height}px" data-chart="${type}" >\n<!--\n{\n "data": {\n`

				if (this.labelRegex.test(chartMarkup)) {
					const [, labels] = this.labelRegex.exec(chartMarkup);

					result = result + `  "labels": ${transform(labels)},\n  "datasets":[\n`;

					this.datasetRegex.lastIndex = 0;

					let m;
					while ((m = this.datasetRegex.exec(chartMarkup)) !== null) {
						if (m.index === this.datasetRegex.lastIndex) {
							this.datasetRegex.lastIndex++;
						}
						const [, title, data] = m;

						result = result + `   {\n    "data":${data},\n    "label":"${title}"\n   },\n`;

					}

					result = result.substring(0, result.length - 2) + `\n  ]\n }\n}\n-->\n</canvas>`;
					result = before.trimEnd() + '\n' + result + '\n' + after.trimStart();
					return this.transformChart(result, options);

				}
			}
			return markdown;

		}
	}
}
function transform(labels: string): string {
	return "[" + labels.substring(1, labels.length - 1)
		.split(',')
		.map((label) => {
			let value = label.trim();
			if (value.startsWith("'") || value.startsWith('"')) {
				value = value.substring(1);
			}
			if (value.endsWith("'") || value.endsWith('"')) {
				value = value.substring(0, value.length - 1);
			}
			return `"${value.trim()}"`;
		})
		.join(",") + "]";
}

