/**
 * Module dependencies.
 */

import app from './app.js';
// import debug  from 'debug' ('server-scripts:server');
import debug from 'debug';
import http from 'http';
import dotenv from 'dotenv'

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
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
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('监听端口：', bind);
}

async function preParse() {
  const dotenvPath = path.resolve(__dirname, '../.env');
  if (pathExists(dotenvPath)) {
    dotenv.config({ path: dotenvPath });
    return true;
  } else {
    console.log(
      'env 配置文件未填写，请在 https://portal.qiniu.com/user/key 将 Access/Secret Key 复制到项目 .env 文件下后再进行重试'
    );
    await copy(`${fromPath}/.env`, `../.env`);
    return false;
  }
}