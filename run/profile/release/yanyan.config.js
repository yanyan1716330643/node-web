let localIp = "192.168.11.253";//106.14.185.18

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
    host:localIp,
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