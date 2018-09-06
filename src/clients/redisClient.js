let consoleUtil = require("../utils/consoleUtil");
let redis = require('redis');
let redisConfig;
if (process.env.REDIS_CONFIG){
    redisConfig = JSON.parse(process.env.REDIS_CONFIG);
}else{
    let pm2Env = require('../../run/pm2.config').apps[0].env;
    redisConfig = pm2Env.REDIS_CONFIG;
}
consoleUtil.info("redis config "+JSON.stringify(redisConfig));
let redisClient  = redis.createClient(redisConfig.port, redisConfig.host);
redisClient.auth(redisConfig.password);
redisClient.select(redisConfig.db);
redisClient.on("error", function(error) {
    console.error(error);
    throw error;
});
module.exports = redisClient;
consoleUtil.log(__filename);