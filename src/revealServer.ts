import express from 'express';
import path from 'path';
import { Server } from 'http';
import { RevealRenderer } from './revealRenderer';
import { Notice } from 'obsidian';
import { ObsidianUtils } from './obsidianUtils';

export class RevealServer {
	private _app: express.Application;
	private _port = 3000;
	private _server: Server;
	//TODO: get rid of base & plugin dir
	private _baseDirectory: string;
	private _pluginDirectory: string;
	private _revealRenderer: RevealRenderer;
	private _staticDir = express.static;
	private filePath: string;

	constructor(utils: ObsidianUtils, port: string) {
		const numPort = Number(port);
		this._port = isNaN(numPort) ? 3000 : numPort;
		this._baseDirectory = utils.getVaultDirectory();
		this._pluginDirectory = utils.getPluginDirectory();
		this._app = express();
		this._revealRenderer = new RevealRenderer(utils);
		this.filePath = null;
	}

	getUrl(): URL {
		return new URL(`http://localhost:${this._port}`);
	}

	start() {
		['plugin', 'dist', 'css'].forEach(dir => {
			// @ts-ignore:
			this._app.use('/' + dir, this._staticDir(path.join(this._pluginDirectory, dir)));
		});

		this._app.get('/embed/*', async (req, res) => {
			const file = req.originalUrl.replace('/embed', '');
			const filePath = path.join(this._baseDirectory, decodeURI(file.split('?')[0]));
			const markup = await this._revealRenderer.renderFile(filePath, req.query);
			res.send(markup);
		});

		this._app.get(/(\w+\.md)/, async (req, res) => {
			this.filePath = path.join(this._baseDirectory, decodeURI(req.url.split('?')[0]));
			const markup = await this._revealRenderer.renderFile(this.filePath, req.query);
			res.send(markup);
		});

		this._app.get('/', async (req, res) => {
			if (this.filePath === null) {
				res.send('Open Presentation Preview in Obsidian first!');
			}
			const markup = await this._revealRenderer.renderFile(this.filePath, req.query);
			res.send(markup);
		});

		this._app.get('/localFileSlash/*', async (req, res) => {
			const filepath = req.originalUrl.replace('/localFileSlash', '');
			res.download(filepath);
		});

		this._app.use(this._staticDir(this._baseDirectory));

		this._server = this._app
			.listen(this._port, '127.0.0.1', () => {
				// tslint:disable-next-line:no-console
				console.log(`server started at http://localhost:${this._port}`);
			})
			.on('error', err => {
				new Notice(`Port ${this._port} already used!`);
			});
	}

	stop() {
		this._server.close();
		console.log(`server stopped`);
	}
}
