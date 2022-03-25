import { BackgroundImageTransformer } from './backgroundImageTransformer';
import { BackgroundTransformer } from './backgroundTransformer';
import { BorderTransformer } from './borderTransformer';
import { ClassMappingTransformer } from './classMappingTransformer';
import { ClassTransformer } from './classTransformer';
import { FragmentTransformer } from './fragmentTransformer';
import { GridTransformer } from './gridTransformer';
import { PaddingTransformer } from './paddingTransformer';
import { RotateTransformer } from './rotateTransformer';
import { StyleMappingTransformer } from './styleMappingTransformer';
import { StyleTransformer } from './styleTransformer';

export interface AttributeTransformer {
	transform(element: Properties): void;
}

export class Properties {
	private transformer: AttributeTransformers;

	private style: Map<string, string>;
	private class: Set<string>;
	private attributes: Map<string, string>;

	public addClass(name: string): Properties {
		this.class.add(name);
		return this;
	}

	public deleteClass(name: string): Properties {
		this.class.delete(name);
		return this;
	}

	public hasClass(name: string): boolean {
		return this.class.has(name);
	}

	public addStyle(key: string, value: string): Properties {
		this.style.set(key, value);
		return this;
	}

	public deleteStyle(key: string): Properties {
		this.style.delete(key);
		return this;
	}

	public hasStyle(name: string): boolean {
		return this.style.has(name);
	}

	public addAttribute(key: string, value: string, update = true): Properties {
		this.attributes.set(key, value);
		if (update) {
			this.transformer.transform(this);
		}
		return this;
	}

	public deleteAttribute(key: string): Properties {
		this.attributes.delete(key);
		return this;
	}

	public hasAttribute(name: string): boolean {
		return this.attributes.has(name);
	}

	public getAttribute(name: string): string {
		return this.attributes.get(name);
	}

	constructor(attributes: Map<string, string>) {
		this.style = new Map<string, string>();
		this.class = new Set<string>();
		this.attributes = attributes;

		this.transformer = new AttributeTransformers();
		this.transformer.transform(this);
	}

	public getClasses(): string {
		return Array.from(this.class).join(' ');
	}

	public getStyles(): string {
		const result = Array<string>();

		for (const [key, value] of this.style) {
			result.push(`${key}: ${value}`);
		}

		return result.join('; ');
	}

	public getAttributes(): string {
		const result = Array<string>();

		for (const [key, value] of this.attributes) {
			if (key == 'onTarget') {
				continue;
			}
			result.push(`${key}="${value}"`);
		}

		return result.join(' ');
	}
}

class AttributeTransformers {
	private allTransformers: Array<AttributeTransformer> = new Array<AttributeTransformer>();

	constructor() {
		this.allTransformers.push(new ClassTransformer());
		this.allTransformers.push(new StyleTransformer());
		this.allTransformers.push(new BackgroundTransformer());
		this.allTransformers.push(new PaddingTransformer());
		this.allTransformers.push(new ClassMappingTransformer('animate'));
		this.allTransformers.push(new FragmentTransformer());
		this.allTransformers.push(new StyleMappingTransformer('opacity', 'opacity'));
		this.allTransformers.push(new BorderTransformer());
		this.allTransformers.push(new StyleMappingTransformer('filter', 'filter'));
		this.allTransformers.push(new RotateTransformer());
		this.allTransformers.push(new GridTransformer());
		this.allTransformers.push(new BackgroundImageTransformer());
	}

	transform(element: Properties) {
		for (let x = 0; x < this.allTransformers.length; x++) {
			const transformer = this.allTransformers[x];
			transformer.transform(element);
		}
	}
}
