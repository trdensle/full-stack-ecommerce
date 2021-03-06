var User = require('./../models/user');
var Q = require('q');

module.exports = {
	updateOrCreate: function(user){
		var deferred = Q.defer();
		User.findOne({ googleId: user.id }, function(err, results){
			if(err) return deferred.reject(err);
			if(results){
				User.update({ _id: results._id }, {
					name: user.displayName,
					plusLink: user._json.link,
					picture: user._json.picture,
					gender: user._json.gender
				}, function(err, results){
					if(err){
						return deferred.reject(err);
					} else {
						deferred.resolve(results);
					}
				})
			} else {
				User.create({
					googleId: user.id,
					name: user.displayName,
					plusLink: user._json.link,
					picture: user._json.picture,
					gender: user._json.gender
				}, function(err, results){
					if(err){
						return deferred.reject(err);
					} else {
						deferred.resolve(results);
					}
				})
			}
		})
		return deferred.promise;
	},
	getUser: function(id){
		var deferred = Q.defer();
		User.findOne({ googleId: id }, function(err, results){
			if(err){
				deferred.reject(err);
			} else {
				deferred.resolve(results);
			}
		})
		return deferred.promise;
	}
}