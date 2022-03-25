import { Options } from './options';

export class YamlStore {
	private static instance: YamlStore;
	private constructor() {}

	public static getInstance(): YamlStore {
		if (!YamlStore.instance) {
			YamlStore.instance = new YamlStore();
		}
		return YamlStore.instance;
	}

	options: Options;
}
