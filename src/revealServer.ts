import express from "express";
import { Server } from "http";



export class RevealServer {

	private _app: express.Application;
	private _port: number = 3000;
	private _server : Server;

	constructor() {
		this._app = express();
	}

	getUrl() {
		return `http://localhost:${this._port}`;
	}

	start() {

		this._app.get('/', (req, res) => {
			res.send('Hello my friends!');
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


