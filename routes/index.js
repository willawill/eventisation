var express = require('express');
var eventBrite = require('../lib/eventbrite');
var router = express.Router();
var _ = require("underscore");
var yelp_apikeys = require("../conf").YELP;
var locus = require("locus");
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
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
});

router.get('/restaurants', function(req, res){
	var yelp = require("yelp").createClient({
		consumer_key: yelp_apikeys.consumer_key,
		consumer_secret: yelp_apikeys.consumer_secret,
		token: yelp_apikeys.token,
		token_secret: yelp_apikeys.token_secret
	});

// See http://www.yelp.com/developers/documentation/v2/search_api
  var params = req.query.lat + "," + req.query.long;

	yelp.search({category_filter: "restaurants", ll: params }, function(error, data) {
    console.log(data)
		res.render('yelp', { restaurants: data.businesses })
	});
})
module.exports = router;
