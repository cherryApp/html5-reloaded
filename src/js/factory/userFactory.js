// Login kezelése.
webapp.factory('userFactory', ['$q', '$http', function($q, $http){
    return {
        doLogin: function(loginData) {
            var deferred = $q.defer();
            
            $http.post('/dologin', loginData)
                .then(function(loginResponse){
                    deferred.resolve(loginResponse.data);
                });
            
            return deferred.promise;            
        },
        checkLogin: function() {
            var deferred = $q.defer();
            
            $http.get('/checklogin')
                .then(function(loginResponse){
                    deferred.resolve(loginResponse.data);
                });
            
            return deferred.promise;            
        },
        getUsers: function() {
            var deferred = $q.defer();
            $http.get( '/users' )
                .then( function(serverData) {
                    deferred.resolve(serverData.data);
                }, function(err){
                    deferred.reject(err);
                });
            return deferred.promise;
        }
    };
}]);