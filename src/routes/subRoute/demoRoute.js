let wsConfig;
if (process.env.REDIS_CONFIG){
    wsConfig = JSON.parse(process.env.WS_CONFIG);
}else{
    let pm2Env = require('../../../run/pm2.config').apps[0].env;
    wsConfig = pm2Env.WS_CONFIG;
}
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/user', function(req, res, next) {
    res.send(JSON.stringify(req.body));
});

/* GET home page. */
router.get('/serverTime', function(req, res, next) {
    res.send(new Date());
});

/* GET home page. */
router.put('/phone', function(req, res, next) {
    res.send(JSON.stringify({result:"put in"}));
});

/* GET home page. */
router.delete('/phone', function(req, res, next) {
    res.send(JSON.stringify({result:"delete out"}));
});








/* GET home page. */
router.get('/canvas/draw', function(req, res, next) {
    res.render('demo/canvas/draw', { title: 'canvas draw',wsIp:wsConfig.host,wsPort:wsConfig.port});
});

/* GET home page. */
router.get('/canvas/show', function(req, res, next) {
    res.render('demo/canvas/show', { title: 'canvas draw',wsIp:wsConfig.host,wsPort:wsConfig.port});
});


module.exports = router;