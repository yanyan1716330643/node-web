let express = require('express');
let router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'node-web' });
});

module.exports = router;