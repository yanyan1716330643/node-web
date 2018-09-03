var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var route = require('./routes/route');//路由
let commonMiddleware = require('./middleware/common');
var app = express();

// view engine setup
app.set('views', path.join(__dirname+"/web", 'views'));
app.set('view engine', 'ejs');


//app.use(require('express-status-monitor')());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname+"/web", 'static')));



//使用自定义路由
app.use(route);
app.use(commonMiddleware.request404);
app.use(commonMiddleware.requestErr);


module.exports = app;


