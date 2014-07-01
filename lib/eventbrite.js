'use strict';

var request = require('request');
var base = require('./base');
var api_key = require('../conf').EVENTBRITE
var rootUrl = "https://www.eventbrite.com/json/event_search?";

function EventBrite() {
}

EventBrite.getEvents = function(params) {
  var requestUrl = rootUrl + "within=" + params.radius + "&within_unit=M&latitude=" + params.lat + "&longitude=" + params.long + "&app_key=" + api_key;
  return base.httpRequest(requestUrl);
}

module.exports = EventBrite;
