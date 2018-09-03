let consoleUtil = require("../utils/consoleUtil");
let redis = require('redis');
let pm2Env = require('../../run/pm2.config').apps[0].env;

let redisConfig = process.env.REDIS_CONFIG || pm2Env.REDIS_CONFIG;
redisConfig = JSON.parse(JSON.stringify(redisConfig));
consoleUtil.info("redis config "+JSON.stringify(redisConfig));
let redisClient  = redis.createClient(redisConfig.port, redisConfig.host);
redisClient.auth(redisConfig.password);
//redisClient.auth(redisConfig.password);
redisClient.select(redisConfig.db);

// let redisClient  = redis.createClient(redisConfig);

redisClient.on("error", function(error) {
    console.error(error);
    throw error;
});
module.exports = redisClient;

consoleUtil.log(__filename);