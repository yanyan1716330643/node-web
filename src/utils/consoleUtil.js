let debug = require('debug')('demo:servers');
const chalk = require('chalk');

let consoleUtil = {
    log: function(data){
        //console.log("\tlog",data);
        console.log("log   >",chalk.rgb(0, 0, 255)(data));
    },
    info: function(data){
        console.info("info  >",chalk.green(data));
        //console.info("\t\tinfo",data);
    },
    error: function(data){
        console.error("error >",data);
    },
    debug: function (data) {
        console.debug("debug >",data);
        //console.debug("\t\t\tdebug",data);
        //console.debug(data);
        //console.debug("debug:");
        //debug(data);
    },
    logo:function () {
        console.log(
            "\n"   +
            "_____________________________________________\n" +
            "_____________________________________________\n" +
            "\n"   +
            "    █████╗ ██████╗ ██╗  ██╗\n" +
            "   ██╔══██╗██╔══██╗██║ ██╔╝\n" +
            "   ███████║██████╔╝█████╔╝ \n" +
            "   ██╔══██║██╔══██╗██╔═██╗ \n" +
            "   ██║  ██║██║  ██║██║  ██╗\n" +
            "   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝  ——version 2.0\n" +
            "_____________________________________________\n" +
            "_____________________________________________\n")
    }
};


module.exports = consoleUtil;
consoleUtil.log(__filename);
