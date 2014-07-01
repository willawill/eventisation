var express = require('express');
var eventBrite = require('../lib/eventbrite');
var router = express.Router();
var _ = require("underscore");
var locus = require("locus");
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Hello World' });
});

router.get('/events', function(req, res){
  var params = {lat: req.query.lat, long: req.query.long, radius: req.query.radius};
  eventBrite.getEvents(params)
    .done(function(data) {
      var events =  _.compact(_.pluck(JSON.parse(data)["events"], "event"));
      res.render('events', { lat: req.query.lat, long: req.query.long, radius: req.query.radius, events: events });
  });
})

module.exports = router;
