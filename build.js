'use strict';

// Az angular fő-modul létrehozása.
var webapp = angular.module("webapp", []);; // Login kezelése.
webapp.factory('userFactory', ['$q', '$http', function ($q, $http) {
    return {
        checkLogin: function checkLogin(loginData) {
            var deferred = $q.defer();

            // Lekérjük a felhasználókat.
            this.getUsers().then(function (users) {
                // Megkeressük az adott felhasználót.
                var loggedIn = false;
                for (var k in users) {
                    if (users[k].email === loginData.email && users[k].pass === loginData.pass) {
                        loggedIn = true;
                    }
                }
                deferred.resolve(loggedIn);
            }, function (err) {
                console.error('Hiba a szerver kapcsolatban.');
                deferred.resolve(loggedIn);
            });

            return deferred.promise;
        },
        getUsers: function getUsers() {
            var deferred = $q.defer();
            $http.get('json/user.json').then(function (serverData) {
                deferred.resolve(serverData.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    };
}]);; // Body kontrollere.
webapp.controller("bodyController", ['$scope', '$http', 'userFactory', function ($scope, $http, userFactory) {

    $scope.isLoggedIn = false;

    $scope.name = "Jeffrey";

    $scope.users = [];

    // Bejelentkezés.
    $scope.doLogin = function () {
        if (!$scope.loginData) {
            alert('Kérjük töltse ki a mezőket!');
            return;
        }
        if (!$scope.loginData.email || !$scope.loginData.pass) {
            alert('Kérjük töltse ki a mezőket!');
            return;
        }

        userFactory.checkLogin($scope.loginData).then(function (loggedIn) {
            $scope.isLoggedIn = loggedIn;
        });
    };
}]);
