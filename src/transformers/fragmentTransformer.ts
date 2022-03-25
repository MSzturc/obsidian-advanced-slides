import { AttributeTransformer, Properties } from '.';

export class FragmentTransformer implements AttributeTransformer {
	transform(element: Properties) {
		const value = element.getAttribute('frag');
		if (value != undefined) {
			element.addClass('fragment');
			element.deleteAttribute('frag');
			element.addAttribute('data-fragment-index', value);
		}
	}
}
