#!/usr/bin/env node

/**
 *
 */
let pm2Env = require('./pm2.config').apps[0].env;
let consoleUtil = require('../src/utils/consoleUtil');
let config = require('../src/appConfig');
//let mysqlClient = require('../src/clients/mysqlClient');
//let redisClient = require('../src/clients/redisClient');
let wsServer = require('../src/servers/wsServer');

/**
 * Module dependencies.
 */

var app = require('../src/app');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || pm2Env.PORT);
app.set('port', port);

/**
 * Create HTTP servers.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP servers "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP servers "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    consoleUtil.info('Listening on ' + bind);
}

consoleUtil.log(__filename);
consoleUtil.logo();
