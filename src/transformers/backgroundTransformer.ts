import Color from "color";
import { AttributeTransformer, Properties } from ".";

export class BackgroundTransformer implements  AttributeTransformer {
  
	transform(element: Properties) {
		const bg = element.getAttribute('bg');

		if(bg != undefined){
			const color = Color(bg);

			if(color.isLight()){
				element.addClass('has-light-background');
				element.deleteClass('has-dark-background');
			} else {
				element.addClass('has-dark-background');
				element.deleteClass('has-light-background');
			}

			element.addStyle('background-color', bg);

			element.deleteAttribute('bg');

		}
	}
}
