// Module imports
const http = require('http');
const morgan = require('morgan');
const config = require('./utils/config');
// App import
const app = require('./smsServer');

const server = http.createServer(app);
server.listen(config.SERVER_PORT, () => {
  console.log(`Server running on port ${config.SERVER_PORT}`);
});
