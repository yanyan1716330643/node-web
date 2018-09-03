let consoleUtil = require("../utils/consoleUtil");
let mysql = require('mysql');
let pm2Env = require('../../run/pm2.config').apps[0].env;
let mysqlConfig = process.env.MYSQL_CONFIG || pm2Env.MYSQL_CONFIG;
consoleUtil.info("mysql config "+JSON.stringify(mysqlConfig))
// let connection = mysql.createConnection({
//     host     : mysqlConfig.host,
//     user     : mysqlConfig.user,
//     password : mysqlConfig.password,
//     database : mysqlConfig.database,
//     port:mysqlConfig.port
// });
let connection = mysql.createConnection(mysqlConfig);


connection.connect(function(err) {
    if (err) {
        consoleUtil.error('mysql error connecting: ' + err.stack);
        return;
    }

    consoleUtil.info('mysql '+mysqlConfig.host+':'+mysqlConfig.port+' connected as connection threadId ' + connection.threadId);
});



//connection.connect();

// connection.query('SELECT * FROM `yanyan_uniubi_face_0_0`', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });
//
// connection.end();
let mysqlClient = {
    query:connection.query,
    end:connection.end,
    connect:connection.connect
}

module.exports = mysqlClient;

consoleUtil.log(__filename);