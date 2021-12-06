import express from "express";
import { Server } from "http";
import path from 'path';
import { RevealRenderer } from "./revealRenderer";

export class RevealServer {

	private _app: express.Application;
	private _port: number = 3000;
	private _server: Server;
	private _baseDirectory: String;
	private _revealRenderer: RevealRenderer;

	constructor(vaultDir: String) {
		console.log(vaultDir);
		this._baseDirectory = vaultDir;
		this._app = express();
		this._revealRenderer = new RevealRenderer();
	}

	getUrl() {
		return `http://localhost:${this._port}`;
	}

	start() {

		this._app.get('/', (req, res) => {
			res.send('Hello my friends!');
		});

		this._app.get(/(\w+\.md)/, async (req, res) => {
			const filePath = path.join(this._baseDirectory.toString(), decodeURI(req.url));
			const markup = await this._revealRenderer.renderFile(filePath);
			res.send(markup);
		});


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


