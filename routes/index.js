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
    	var results = JSON.parse(data);
    	if (results.error){
    		res.render("error", {message: "Sorry, we couldn't find anything for you."});
    	}
    	else{
	      var events =  _.compact(_.pluck(results["events"], "event"));
	      res.render('events', { lat: req.query.lat, long: req.query.long, radius: req.query.radius, events: events });
    	}
  });
})

module.exports = router;
