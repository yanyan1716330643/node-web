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


module.exports = router;