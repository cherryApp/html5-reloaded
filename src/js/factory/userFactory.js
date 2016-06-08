// Login kezelése.
webapp.factory('userFactory', ['$q', '$http', '$rootScope', 
    function($q, $http, $rootScope){
    
    var factory = {
        sendResponse: function(defer, response) {
            if ( angular.isDefined(response.loggedIn) ) {
                if (response.loggedIn === false) {
                    $rootScope.$broadcast('noLogin');
                }
            }
            defer.resolve(response);
        },
        doLogin: function(loginData) {
            var deferred = $q.defer();
            
            $http.post('/dologin', loginData)
                .then(function(loginResponse){
                    factory.sendResponse(deferred, loginResponse.data);
                });
            
            return deferred.promise;            
        },
        checkLogin: function() {
            var deferred = $q.defer();
            
            $http.get('/checklogin')
                .then(function(loginResponse){
                    factory.sendResponse(deferred, loginResponse.data);
                });
            
            return deferred.promise;            
        },
        getUsers: function() {
            var deferred = $q.defer();
            $http.get( '/users' )
                .then( function(serverData) {
                    factory.sendResponse(deferred, serverData.data);
                }, function(err){
                    deferred.reject(err);
                });
            return deferred.promise;
        },
        modUser: function(user) {
            var deferred = $q.defer();
            $http.post( '/user', user )
                .then(function(res){
                    factory.sendResponse(deferred, res.data);
                });
            return deferred.promise;
        }
    };
        
    return factory;
}]);