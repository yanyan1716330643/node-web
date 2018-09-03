var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/chat', function(req, res, next) {
    res.render('chat', { title: 'Express' });
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('hi', { title: 'Express' });
});


module.exports = router;