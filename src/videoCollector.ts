export class VideoCollector {
	private videos = new Set<string>();
	private isCollecting = false;

	private static instance: VideoCollector;
	private constructor() {}

	public static getInstance(): VideoCollector {
		if (!VideoCollector.instance) {
			VideoCollector.instance = new VideoCollector();
		}
		return VideoCollector.instance;
	}

	public reset() {
		this.videos.clear();
	}

	public addVideo(filePath: string) {
		this.videos.add(filePath);
	}

	public getAll(): string[] {
		return Array.of(...this.videos);
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
