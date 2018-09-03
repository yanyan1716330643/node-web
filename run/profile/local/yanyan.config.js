let localIp = "192.168.11.253";

let redisConfig = {
    host: localIp,
    port: 5701,
    db: 8,
    password: "test1234"
};

let mysqlConfig = {
    host:localIp,
    user:"root",
    password:"test1234",
    database:"test",
    port:5700
};

let wsConfig = {
    host:localIp
};


module.exports = {
    apps: [{
        name: 'node-web',
        script: './runWeb.js',
        watch: true,
        env: {
            IP:localIp,
            PORT: 3000,
            REDIS_CONFIG: redisConfig,
            MYSQL_CONFIG:mysqlConfig
        }
    }]
};
console.log(__filename);