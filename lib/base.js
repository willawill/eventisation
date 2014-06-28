var Q = require('q');

function Base(){};

Base.prototype.httpRequest = function(url) {
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

module.exports = Base;
