let consoleUtil = require('./utils/consoleUtil');
let pm2Env = require('../run/pm2.config').apps[0].env;
let env = process.env.PORT || pm2Env;

let appConfig = {};
module.exports = appConfig;
consoleUtil.log(__filename);