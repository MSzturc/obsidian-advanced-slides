import express from "express";
import path from 'path';
import { Server } from "http";
import { RevealRenderer } from "./revealRenderer";
import { App, Notice } from "obsidian";

export class RevealServer {

	private _app: express.Application;
	private _port: number = 3000;
	private _server: Server;
	private _baseDirectory: string;
	private _pluginDirectory: string;
	private _revealRenderer: RevealRenderer;
	private _staticDir = express.static;
	private filePath: string;

	constructor(app: App, vaultDir: String, port: string) {
		var numPort = Number(port);
		this._port = isNaN(numPort) ? 3000 : numPort;
		this._baseDirectory = vaultDir.toString();
		this._pluginDirectory = path.join(this._baseDirectory, '/.obsidian/plugins/obsidian-advanced-slides/');
		this._app = express();
		this._revealRenderer = new RevealRenderer(app, this._baseDirectory);
		this.filePath = null;
	}

	getUrl() {
		return `http://localhost:${this._port}`;
	}

	start() {

		['plugin', 'dist', 'css'].forEach(dir => {
			// @ts-ignore:
			this._app.use('/' + dir, this._staticDir(path.join(this._pluginDirectory, dir)));
		});

		this._app.get(/(\w+\.md)/, async (req, res) => {
			this.filePath = path.join(this._baseDirectory, decodeURI(req.url));
			const markup = await this._revealRenderer.renderFile(this.filePath);
			res.send(markup);
		});

		this._app.get('/', async (req, res) => {
			if (this.filePath === null) {
				res.send("Open Presentation Preview in Obsidian first!");
			}

			const markup = await this._revealRenderer.renderFile(this.filePath);
			res.send(markup);
		});

		this._app.get('/localFileSlash/*', async (req, res) => {
			var filepath = req.originalUrl.replace('/localFileSlash','');
			res.download(filepath);
		});

		this._app.use(this._staticDir(this._baseDirectory));

		this._server = this._app.listen(this._port, () => {
			// tslint:disable-next-line:no-console
			console.log(`server started at http://localhost:${this._port}`);
		}).on('error', (err) => {
			new Notice(`Port ${this._port} already used!`);
		});



	}

	stop() {
		this._server.close();
		console.log(`server stopped`);
	}

}


