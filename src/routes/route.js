let consoleUtil = require("../utils/consoleUtil");
let express = require('express');
let route = express.Router();
let tryRoute = require('./subRoute/tryRoute');
let defaultRoute = require('./subRoute/defaultRoute');






//测试路由
route.use("/test",tryRoute);
//user路由
//route.use("/user",userRoute);
//默认路由(未定义统一url)
route.use(defaultRoute);


module.exports = route;
consoleUtil.log(__filename);

