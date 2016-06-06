// Login kezelése.
webapp.factory('userFactory', ['$q', '$http', function($q, $http){
    return {
        checkLogin: function(loginData) {
            var deferred = $q.defer();
            
            // Lekérjük a felhasználókat.
            this.getUsers().then(function(users) {
                // Megkeressük az adott felhasználót.
                var loggedIn = false;
                for( var k in users ) {
                    if ( users[k].email === loginData.email && users[k].pass === loginData.pass ) {
                        loggedIn = true;
                    }
                }
                deferred.resolve(loggedIn);
            }, function(err) {
                console.error('Hiba a szerver kapcsolatban.');
                deferred.resolve(loggedIn);
            });
            
            return deferred.promise;            
        },
        getUsers: function() {
            var deferred = $q.defer();
            $http.get( 'json/user.json' )
                .then( function(serverData) {
                    deferred.resolve(serverData.data);
                }, function(err){
                    deferred.reject(err);
                });
            return deferred.promise;
        }
    };
}]);