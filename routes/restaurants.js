var express = require('express');
var router = express.Router();
var yelp_apikeys = require("../conf").YELP;


router.get('/', function(req, res){
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

module.exports = router
