var express = require('express');
var eventBrite = require('../lib/eventbrite');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Hello World' });
});

router.get('/events', function(req, res){
  var results = eventBrite.getEvents();
  res.render('events', { lat: req.query.lat, long: req.query.long, events: results.events });
})

module.exports = router;
