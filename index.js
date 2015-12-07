'use strict';
const util = require('util');
var socket;

/**
 * [init description]
 * @param  {[type]} port [description]
 * @param  {[type]} host [description]
 * @return {[type]}      [description]
 */
function init(port, host) {
	host = host || '0.0.0.0';
	if (!port) {
		throw new Error('port is undefined');
	}
	if (socket) {
		throw new Error('zmq has been initialized!');
	}
	let zmq = require('zmq');
	socket = zmq.socket('pub');
	let url = util.format('tcp://%s:%s', host, port);
	socket.bindSync(url);
	console.info('zmq bind %s', url);

	return socket;
}


/**
 * [write description]
 * @param  {[type]} tag [description]
 * @param  {[type]} log [description]
 * @return {[type]}     [description]
 */
function write(tag, log) {
	if (socket) {
		socket.send([tag, log]);
	}
}


exports.init = init;
exports.write = write;