const { Server } = require('bernie-server');
const { config } = require('bernie-config');

const server = new Server(config);

server.start();
