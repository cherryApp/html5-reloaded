// Body kontrollere.
webapp.controller( "bodyController", ['$scope', '$http', 'userFactory', '$rootScope',
    function($scope, $http, userFactory, $rootScope){
        
    $scope.isLoggedIn = false; 
    $scope.defaultConent = 'index';
    $scope.currentContentName = '';
        
    $scope.name = "Jeffrey";
        
    $scope.users = [];
        
    userFactory.checkLogin()
        .then(function(res){
            $scope.isLoggedIn = res.loggedIn;
            $scope.currentUser = res.user;
        });
        
    // Bejelentkezés.
    $scope.doLogin = function(loginData) {
        if ( !loginData ) {
            alert('Kérjük töltse ki a mezőket!');
            return;
        }
        if ( !loginData.email || !loginData.pass ) {
            alert('Kérjük töltse ki a mezőket!');
            return;
        }
        
        userFactory.doLogin(loginData)
            .then(function(serverData){
                $scope.isLoggedIn = serverData.loggedIn;
            });
    };
    
    // Fájlok beszúrás.
    $scope.getTemplate = function(name) {
        return 'template/'+name+'.html';
    };
        
    // Tartalom váltó.
    $scope.getContent = function(name) {
        if (angular.isUndefined(name)) {
            name = $scope.defaultConent;
        }
        $scope.currentContentName = name;
        $scope.currentContent = $scope.getTemplate('content/'+name);
    };
        
    // $scope.getContent();
        
    // Oldalváltás figyelése.
    $rootScope.$on('$routeChangeSuccess', function(oldRoute, newRoute) {
        if ( angular.isUndefined(newRoute.$$route) ) {
            $scope.currentContentName = $scope.defaultConent;
        } else {
            $scope.currentContentName = newRoute.$$route.originalPath.replace('/','');
        }
    });
        
          
}]);