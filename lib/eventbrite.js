'use strict';
var request = require('request'),
    Q = require('q');

var rootUrl = "https://www.eventbriteapi.com/v3/events/search/?";

function EventBrite() {
}


function httpRequest(url) {
  var deferred = Q.defer();
  request(url, function(error, response, body){
    if (error) {
      deferred.reject(new Error(error));
    }
    else{
      deferred.resolve(body);
    }
  });
  return deferred.promise;
}

var sample =
{
    "pagination": {
        "object_count": 5547,
        "page_number": 1,
        "page_size": 50,
        "page_count": 111
    },
    "events": [
        {
            "resource_uri": "https://www.eventbriteapi.com/v3/events/5443379294/",
            "name": {
                "text": "Test event",
                "html": "Test event"
            },
            "description": {
                "text": "Testing this for further events.",
                "html": "<P>Testing this for further events.<\/P>"
            },
            "id": "5443379294",
            "url": "http://myeventtest333.eventbrite.com/?aff=ebapi",
            "logo_url": "http://ebmedia.eventbrite.com/s3-build/images/5075667/38054715288/1/logo.jpg",
            "start": {
                "timezone": "America/Los_Angeles",
                "local": "2014-08-28T19:00:00",
                "utc": "2014-08-29T02:00:00Z"
            },
            "end": {
                "timezone": "America/Los_Angeles",
                "local": "2014-08-28T22:00:00",
                "utc": "2014-08-29T05:00:00Z"
            },
            "created": "2013-02-05T11:12:05Z",
            "changed": "2014-03-01T10:37:05Z",
            "capacity": 100,
            "status": "live",
            "currency": null,
            "online_event": null,
            "organizer_id": "6161036463",
            "venue_id": "5761175",
            "category_id": null,
            "subcategory_id": null,
            "format_id": null,
            "organizer": {
                "description": {
                    "text": null,
                    "html": null
                },
                "resource_uri": "https://www.eventbriteapi.com/v3/organizers/6161036463/",
                "id": "6161036463",
                "name": null,
                "url": "http://www.eventbrite.com/o/6161036463"
            },
            "venue": {
                "id": "5761175",
                "address": {
                    "country_name": "United States",
                    "city": "New York",
                    "region": "NY",
                    "address_1": "122 W 14th St",
                    "country": "US"
                },
                "latitude": "40.7378857",
                "longitude": "-73.99816650000002",
                "name": null
            },
            "category": null,
            "subcategory": null,
            "format": null,
            "ticket_classes": [
                {
                    "resource_uri": "https://www.eventbriteapi.com/v3/events/5443379294/ticket_classes/23962997/",
                    "id": "23962997",
                    "event_id": "5443379294",
                    "name": "First ticket.",
                    "donation": false,
                    "free": true,
                    "minimum_quantity": 1,
                    "maximum_quantity": null
                }
            ]
      }
    ]
  }

  function getEvents(params) {
    var requestUrl = "https://www.eventbriteapi.com/v3/events/search/?location.within=59mi&location.latitude=40.736917&location.longitude=-74.006267&token=SUP55O77W7XYGI3SL7EI";
    return httpRequest(requestUrl)
      .then(function(events){ return events;}, function(err){console.log(err)});
    // return sample;
  };


  module.exports = {
    getEvents: getEvents
  };