let express = require('express');
let router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'plantain',description:"plantain(车前草) — — powered by ark 2.0" });
});

module.exports = router;