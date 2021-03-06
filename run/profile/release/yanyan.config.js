let localIp = "172.19.114.34";//内网ip
let ip = "106.14.185.18";//外网ip

let redisConfig = {
    host: localIp,
    port: 6379,
    db: 8,
    password: "test1234"
};

let mysqlConfig = {
    host:localIp,
    user:"root",
    password:"test1234",
    database:"test",
    port:3306
};

let wsConfig = {
    host:ip,
    port:8080
};

module.exports = {
    apps: [{
        name: 'node-web',
        script: './runWeb.js',
        watch: true,
        env: {
            IP:localIp,
            PORT: 80,
            REDIS_CONFIG: redisConfig,
            MYSQL_CONFIG:mysqlConfig,
            WS_CONFIG:wsConfig
        }
    }]
};
console.log(__filename);