import { Options } from "src/options";

type ChartObject = {
	data: DataObject
	options: any
}

type DataEntry = {
	data: number[],
	label: string,
	backgroundColor?: string
}

type DataObject = {
	labels: string[],
	datasets: DataEntry[]
}

export class ChartProcessor {

	private typeRegex = /type:\s(\w*)/;
	private labelRegex = /labels:\s(.*)/;
	private datasetRegex = /title:\s(.*)\s*data:\s(.*)/g
	private spanGapsRegex = /(spanGaps):\s(.*)/;
	private tensionRegex = /(tension):\s(.*)/;
	private beginAtZeroRegex = /(beginAtZero):\s(.*)/;
	private legendRegex = /(legend):\s(.*)/;
	private legendPositionRegex = /(legendPosition):\s(.*)/;
	private stackedRegex = /(stacked):\s(.*)/;

	private colorMap = ["#4285f4", "#ea4335", "#fbbc05", "#34a853", "#673ab7", "#cccccc", "#777777"]

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

			if (this.typeRegex.test(chartMarkup)) {
				const [, type] = this.typeRegex.exec(chartMarkup);

				const chart: ChartObject = {
					data: {
						datasets: [],
						labels: []
					},
					options: { elements: {} }
				};

				if (this.labelRegex.test(chartMarkup)) {
					const [, labels] = this.labelRegex.exec(chartMarkup);
					chart.data.labels = parseLabels(labels);

					this.datasetRegex.lastIndex = 0;

					let i = 0;

					let m;
					while ((m = this.datasetRegex.exec(chartMarkup)) !== null) {
						if (m.index === this.datasetRegex.lastIndex) {
							this.datasetRegex.lastIndex++;
						}
						const [, title, data] = m;

						chart.data.datasets.push({ data: JSON.parse(data), label: title, backgroundColor: this.colorMap[i] })
						i++;
					}

					chart.options.elements[type] = {}

					if (this.spanGapsRegex.test(chartMarkup)) {
						const [, key, value] = this.spanGapsRegex.exec(chartMarkup);
						chart.options.elements[type][key] = JSON.parse(value);
					}
					if (this.tensionRegex.test(chartMarkup)) {
						const [, key, value] = this.tensionRegex.exec(chartMarkup);
						chart.options.elements[type][key] = JSON.parse(value);
					}
					if (this.beginAtZeroRegex.test(chartMarkup)) {
						const [, key, value] = this.beginAtZeroRegex.exec(chartMarkup);

						if (!chart.options.scales) {
							chart.options.scales = {}
						}

						if (!chart.options.scales.y) {
							chart.options.scales.y = {}
						}

						chart.options.scales.y[key] = JSON.parse(value);

					}
					if (this.legendRegex.test(chartMarkup)) {
						const [, , value] = this.legendRegex.exec(chartMarkup);

						if (!chart.options.plugins) {
							chart.options.plugins = {}
						}

						if (!chart.options.plugins.legend) {
							chart.options.plugins.legend = {}
						}

						chart.options.plugins.legend.display = JSON.parse(value);
					}

					if (this.legendPositionRegex.test(chartMarkup)) {
						const [, , value] = this.legendPositionRegex.exec(chartMarkup);

						if (!chart.options.plugins) {
							chart.options.plugins = {}
						}

						if (!chart.options.plugins.legend) {
							chart.options.plugins.legend = {}
						}

						chart.options.plugins.legend.position = value;
					}
					if (this.stackedRegex.test(chartMarkup)) {
						const [, key, value] = this.stackedRegex.exec(chartMarkup);

						if (!chart.options.scales) {
							chart.options.scales = {}
						}

						if (!chart.options.scales.y) {
							chart.options.scales.y = {}
						}
						if (!chart.options.scales.x) {
							chart.options.scales.x = {}
						}

						chart.options.scales.x[key] = JSON.parse(value);
						chart.options.scales.y[key] = JSON.parse(value);

					}


					const canvas = `<canvas style="max-height:${options.height}px" data-chart="${type}" >\n<!--\n${JSON.stringify(chart)}-->\n</canvas>`

					const result = before.trimEnd() + '\n' + canvas + '\n' + after.trimStart();
					return this.transformChart(result, options);

				}
			}
			return markdown;

		}
	}
}
function parseLabels(labels: string): string[] {
	return labels.substring(1, labels.length - 1)
		.split(',')
		.map((label) => {
			let value = label.trim();
			if (value.startsWith("'") || value.startsWith('"')) {
				value = value.substring(1);
			}
			if (value.endsWith("'") || value.endsWith('"')) {
				value = value.substring(0, value.length - 1);
			}
			return `${value.trim()}`;
		});
}

