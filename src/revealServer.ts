import express from "express";
import path from 'path';
import { Server } from "http";
import { RevealRenderer } from "./revealRenderer";
import { App } from "obsidian";

export class RevealServer {

	private _app: express.Application;
	private _port: number = 3000;
	private _server: Server;
	private _baseDirectory: string;
	private _pluginDirectory: string;
	private _revealRenderer: RevealRenderer;
	private _staticDir = express.static;

	constructor(app: App, vaultDir: String) {
		this._baseDirectory = vaultDir.toString();
		this._pluginDirectory = path.join(this._baseDirectory, '/.obsidian/plugins/obsidian-advanced-slides/');
		this._app = express();
		this._revealRenderer = new RevealRenderer(app, this._baseDirectory);
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
			const filePath = path.join(this._baseDirectory, decodeURI(req.url));
			const markup = await this._revealRenderer.renderFile(filePath);
			res.send(markup);
		});

		this._app.use(this._staticDir(this._baseDirectory));

		this._server = this._app.listen(this._port, () => {
			// tslint:disable-next-line:no-console
			console.log(`server started at http://localhost:${this._port}`);
		});
	}

	stop() {
		this._server.close();
		console.log(`server stopped`);
	}

}


