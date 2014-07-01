var Q = require('q');
var request = require('request');

Base = {
  httpRequest : function(url) {
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
}
module.exports = Base;
