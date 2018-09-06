let consoleUtil = require('../utils/consoleUtil');
let wsConfig;
if (process.env.REDIS_CONFIG){
    wsConfig = JSON.parse(process.env.WS_CONFIG);
}else{
    let pm2Env = require('../../run/pm2.config').apps[0].env;
    wsConfig = pm2Env.WS_CONFIG;
}

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: wsConfig.port});
// 连接池
var clients = [];
wss.on('connection', function(ws) {
    consoleUtil.debug("ws connection");
    // 将该连接加入连接池
    clients.push(ws);
    ws.on('message', function(message) {
        consoleUtil.debug("ws message:"+message);
        // 广播消息
        clients.forEach(function(ws1){
            if(ws1 !== ws) {//发送给别人
                ws1.send(message);
            }else {//发送给自己
                ws1.send(message);
            }
        })
    });

    ws.on('close', function(message) {
        consoleUtil.debug("ws close:"+message);
        // 连接关闭时，将其移出连接池
        clients = clients.filter(function(ws1){
            return ws1 !== ws
        })
    });
});

module.exports = WebSocketServer;
consoleUtil.info("ws start port "+wsConfig.port);
consoleUtil.log(__filename);