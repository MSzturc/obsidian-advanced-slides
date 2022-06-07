import Color from 'color';
import { AttributeTransformer, Properties } from '.';

export class BackgroundTransformer implements AttributeTransformer {
	transform(element: Properties) {
		const bg = element.getAttribute('bg');
		const target = element.getAttribute('onTarget');

		if (bg != undefined) {
			const color = this.readColor(bg);

			if (color) {
				if (color.isLight()) {
					element.addClass('has-light-background');
					element.deleteClass('has-dark-background');
				} else {
					element.addClass('has-dark-background');
					element.deleteClass('has-light-background');
				}

				element.deleteAttribute('bg');
				if (target && target == 'slide') {
					element.deleteAttribute('data-background-image');
					element.deleteAttribute('data-background-color');
					element.addAttribute('data-background-color', bg);
				} else {
					element.addStyle('background-color', bg);
				}
			} else {
				element.deleteAttribute('bg');
				if (target && target == 'slide') {
					element.deleteAttribute('data-background-color');
					element.deleteAttribute('data-background-image');
					element.addAttribute('data-background-image', bg);
				}
			}
		}
	}

	readColor(bg: string) {
		try {
			return Color(bg);
		} catch (_) {
			return null;
		}
	}
}
