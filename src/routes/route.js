let consoleUtil = require("../utils/consoleUtil");
let express = require('express');
let route = express.Router();

let defaultRoute = require('./subRoute/defaultRoute');
let demoRoute = require('./subRoute/demoRoute');




//demo路由
route.use("/demo",demoRoute);
//user路由
//route.use("/user",userRoute);
//默认路由(未定义统一url)
route.use(defaultRoute);


module.exports = route;
consoleUtil.log(__filename);

