export class ImageCollector {
	private images = new Set<string>();
	private isCollecting = false;

	private static instance: ImageCollector;
	private constructor() {}

	public static getInstance(): ImageCollector {
		if (!ImageCollector.instance) {
			ImageCollector.instance = new ImageCollector();
		}
		return ImageCollector.instance;
	}

	public reset() {
		this.images.clear();
	}

	public addImage(filePath: string) {
		this.images.add(filePath);
	}

	public getAll(): string[] {
		return Array.of(...this.images);
	}

	public enable() {
		this.isCollecting = true;
	}

	public disable() {
		this.isCollecting = false;
	}

	public shouldCollect(): boolean {
		return this.isCollecting;
	}
}
