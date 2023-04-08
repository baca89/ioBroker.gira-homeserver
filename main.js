"use strict";

/*
 * Created with @iobroker/create-adapter v2.3.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require("@iobroker/adapter-core");

// Load your modules here, e.g.:
const axios = require("axios").default;
const https = require("https");
const util = require("util");
const HomeserverTypes = require(__dirname + "/lib/homeserverTypes.js");

class GiraHomeserver extends utils.Adapter {

	/**
	 * @param {Partial<utils.AdapterOptions>} [options={}]
	 */
	constructor(options) {
		super({
			...options,
			name: "gira-homeserver",
		});

		this.girahomeserverclient = null;
		this.responseCOs = null;
		this.apiConnected = false;
		this.httpsAgent = new https.Agent({
			rejectUnauthorized: false
		});

		this.on("ready", this.onReady.bind(this));

		this.on("stateChange", this.onStateChange.bind(this));
		// this.on("objectChange", this.onObjectChange.bind(this));
		// this.on("message", this.onMessage.bind(this));

		this.on("unload", this.onUnload.bind(this));
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	async onReady() {
		// Checks the amdin-config:
		this.log.info("Adapter startet...");
		if(!this.config.serverIP){
			this.log.error(`Server IP is empty - please check instance configuration of ${this.namespace}`);
			return;
		}
		if (!this.config.username || !this.config.password) {
			this.log.error(`User name and/or user password empty - please check instance configuration of ${this.namespace}`);
			return;
		}

		this.log.info(`Instance ${this.namespace} starts with Server ${this.config.serverIP} on Port ${this.config.serverPort} with Username: ${this.config.username}`);

		await this.setApiConnection(false);

		this.girahomeserverclient = axios.create({
			baseURL: `https://${this.config.serverIP}:${this.config.serverPort}/endpoints/`,
			timeout: 2000,
			responseEncoding: "utf8",
			httpsAgent : this.httpsAgent,
			auth: {
				username: this.config.username,
				password: this.config.password
			}
		});

		//subscribe all States
		await this.subscribeStatesAsync("*");

		// The adapters config (in the instance object everything under the attribute "native") is accessible via
		// this.config:
		this.log.info("Server IP " + this.config.serverIP);
		this.log.info("Server Port: " + this.config.serverPort);
		this.log.info("Username: " + this.config.username);

		//Abfrage aller Verfügbaren Kommunikationsobjekte
		await this.girahomeserverclient.get("select",
			{params:{
				method: "get",
				key: "CO@*",
				meta: true}
			})
			.then((response) => {
				this.log.debug("Call of communication objects successfully");
				this.setApiConnection(true);
				// TODO function zum anlegen aller Kommunikationsobjekte
				const data = response.data.data.items;
				// TODO Abfrage der Statuscodes ob erfolgreich
				for (let i = 0; i < data.length; i++) {
					const element = data[i];
					this.log.debug(util.inspect(element.caption));
				}
			}).catch((error)=>{
				this.log.debug("Call mit Fehler ausgeführt");
				this.log.debug(util.inspect(error.response));
				this.log.error(error);
				return;
			});

		// this.response = await this.girahomeserverclient.get("call", {
		// 	params: {
		// 		key: "CO:*"
		// 	}


		// }).catch(err => {this.log.error(err);})
		// 	.finally(()=>{
		// 		this.log.debug(`Anfrage Statuscode: ${this.response.status}`);
		// 		this.log.debug(`Anfrage Statuscode: ${this.response.statusText}`);
		// 		this.log.debug(`${this.response.data}`);
		// 	});





		/*
		For every state in the system there has to be also an object of type state
		Here a simple template for a boolean variable named "testVariable"
		Because every adapter instance uses its own unique namespace variable names can't collide with other adapters variables
		*/

		await this.setObjectNotExistsAsync("testVariable", {
			type: "state",
			common: {
				name: "testVariable",
				type: "boolean",
				role: "indicator",
				read: true,
				write: true,
			},
			native: {},
		});

		// In order to get state updates, you need to subscribe to them. The following line adds a subscription for our variable we have created above.

		this.subscribeStates("testVariable");
		// You can also add a subscription for multiple states. The following line watches all states starting with "lights."
		// this.subscribeStates("lights.*");
		// Or, if you really must, you can also watch all states. Don't do this if you don't need to. Otherwise this will cause a lot of unnecessary load on the system:
		// this.subscribeStates("*");

		/*
			setState examples
			you will notice that each setState will cause the stateChange event to fire (because of above subscribeStates cmd)
		*/
		// the variable testVariable is set to true as command (ack=false)

		await this.setStateAsync("testVariable", true);

		// same thing, but the value is flagged "ack"
		// ack should be always set to true if the value is received from or acknowledged from the target system

		await this.setStateAsync("testVariable", { val: true, ack: true });

		// same thing, but the state is deleted after 30s (getState will return null afterwards)

		await this.setStateAsync("testVariable", { val: true, ack: true, expire: 30 });

		// examples for the checkPassword/checkGroup functions

		let result = await this.checkPasswordAsync("admin", "iobroker");

		this.log.info("check user admin pw iobroker: " + result);


		result = await this.checkGroupAsync("admin", "admin");

		this.log.info("check group user admin group admin: " + result);

	}

	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 * @param {() => void} callback
	 */

	onUnload(callback) {
		try {
			// Here you must clear all timeouts or intervals that may still be active
			// clearTimeout(timeout1);
			// clearTimeout(timeout2);
			// ...
			// clearInterval(interval1);


			callback();
		} catch (e) {

			callback();
		}
	}

	// If you need to react to object changes, uncomment the following block and the corresponding line in the constructor.
	// You also need to subscribe to the objects with `this.subscribeObjects`, similar to `this.subscribeStates`.
	// /**
	//  * Is called if a subscribed object changes
	//  * @param {string} id
	//  * @param {ioBroker.Object | null | undefined} obj
	//  */
	// onObjectChange(id, obj) {
	// 	if (obj) {
	// 		// The object was changed
	// 		this.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
	// 	} else {
	// 		// The object was deleted
	// 		this.log.info(`object ${id} deleted`);
	// 	}
	// }

	/**
	 * Is called if a subscribed state changes
	 * @param {string} id
	 * @param {ioBroker.State | null | undefined} state
	 */

	onStateChange(id, state) {

		if (state) {
			// The state was changed

			this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
		} else {
			// The state was deleted

			this.log.info(`state ${id} deleted`);
		}
	}

	// If you need to accept messages in your adapter, uncomment the following block and the corresponding line in the constructor.
	// /**
	//  * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
	//  * Using this method requires "common.messagebox" property to be set to true in io-package.json
	//  * @param {ioBroker.Message} obj
	//  */
	// onMessage(obj) {
	// 	if (typeof obj === "object" && obj.message) {
	// 		if (obj.command === "send") {
	// 			// e.g. send email or pushover or whatever
	// 			this.log.info("send command");

	// 			// Send response in callback if required
	// 			if (obj.callback) this.sendTo(obj.from, obj.command, "Message received", obj.callback);
	// 		}
	// 	}
	// }
	async addDatapoint(data){
		if(data.meta.grpadr){
			await this.setObjectNotExistsAsync(data.caption, {
				type: "state",
				common: {
					name: data.caption,
					type: HomeserverTypes.getTypeOfGiraDatapoint(data.meta.format),
					role: "indicator",
					read: true,
					write: true,
				},
				native: {},
			});
		}
	}

	async setApiConnection(status){

		this.apiConnected = status;

		await this.setStateChangedAsync(`info.connection`,{val : status, ack : true});
	}


}

if (require.main !== module) {
	// Export the constructor in compact mode
	/**
	 * @param {Partial<utils.AdapterOptions>} [options={}]
	 */
	module.exports = (options) => new GiraHomeserver(options);
} else {
	// otherwise start the instance directly
	new GiraHomeserver();
}