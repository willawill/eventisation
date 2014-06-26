var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Hello World' });
});

router.get('/events', function(req, res){
  res.render('events', { lat: req.query.lat, long: req.query.long });
})

module.exports = router;
