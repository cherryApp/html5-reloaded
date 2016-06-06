// Az angular fő-modul létrehozása.
var webapp = angular.module( "webapp", ['ngRoute'] );

webapp.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/index', {
    templateUrl: 'template/content/index.html',
    controller: 'indexController'
  })
  .when('/users', {
    templateUrl: 'template/content/users.html'
  })
  .when('/settings', {
    templateUrl: 'template/content/settings.html'
  })
  .otherwise({
      redirectTo: '/index'
  });
}]);