/*
 AngularJS v1.5.6
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(C,d){'use strict';function w(s,h,f){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,e,b,g,y){function k(){n&&(f.cancel(n),n=null);l&&(l.$destroy(),l=null);m&&(n=f.leave(m),n.then(function(){n=null}),m=null)}function z(){var b=s.current&&s.current.locals;if(d.isDefined(b&&b.$template)){var b=a.$new(),g=s.current;m=y(b,function(b){f.enter(b,null,m||e).then(function(){!d.isDefined(u)||u&&!a.$eval(u)||h()});k()});l=g.scope=b;l.$emit("$viewContentLoaded");
l.$eval(r)}else k()}var l,m,n,u=b.autoscroll,r=b.onload||"";a.$on("$routeChangeSuccess",z);z()}}}function v(d,h,f){return{restrict:"ECA",priority:-400,link:function(a,e){var b=f.current,g=b.locals;e.html(g.$template);var y=d(e.contents());if(b.controller){g.$scope=a;var k=h(b.controller,g);b.controllerAs&&(a[b.controllerAs]=k);e.data("$ngControllerController",k);e.children().data("$ngControllerController",k)}a[b.resolveAs||"$resolve"]=g;y(a)}}}var r=d.module("ngRoute",["ng"]).provider("$route",function(){function s(a,
e){return d.extend(Object.create(a),e)}function h(a,d){var b=d.caseInsensitiveMatch,g={originalPath:a,regexp:a},f=g.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)(\*\?|[\?\*])?/g,function(a,d,b,e){a="?"===e||"*?"===e?"?":null;e="*"===e||"*?"===e?"*":null;f.push({name:b,optional:!!a});d=d||"";return""+(a?"":d)+"(?:"+(a?d:"")+(e&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");g.regexp=new RegExp("^"+a+"$",b?"i":"");return g}var f={};this.when=function(a,e){var b=
d.copy(e);d.isUndefined(b.reloadOnSearch)&&(b.reloadOnSearch=!0);d.isUndefined(b.caseInsensitiveMatch)&&(b.caseInsensitiveMatch=this.caseInsensitiveMatch);f[a]=d.extend(b,a&&h(a,b));if(a){var g="/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";f[g]=d.extend({redirectTo:a},h(g,b))}return this};this.caseInsensitiveMatch=!1;this.otherwise=function(a){"string"===typeof a&&(a={redirectTo:a});this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest",
"$sce",function(a,e,b,g,h,k,r){function l(q){var c=t.current;(A=(p=w())&&c&&p.$$route===c.$$route&&d.equals(p.pathParams,c.pathParams)&&!p.reloadOnSearch&&!x)||!c&&!p||a.$broadcast("$routeChangeStart",p,c).defaultPrevented&&q&&q.preventDefault()}function m(){var q=t.current,c=p;if(A)q.params=c.params,d.copy(q.params,b),a.$broadcast("$routeUpdate",q);else if(c||q)x=!1,(t.current=c)&&c.redirectTo&&(d.isString(c.redirectTo)?e.path(v(c.redirectTo,c.params)).search(c.params).replace():e.url(c.redirectTo(c.pathParams,
e.path(),e.search())).replace()),g.when(c).then(n).then(function(e){c==t.current&&(c&&(c.locals=e,d.copy(c.params,b)),a.$broadcast("$routeChangeSuccess",c,q))},function(d){c==t.current&&a.$broadcast("$routeChangeError",c,q,d)})}function n(a){if(a){var c=d.extend({},a.resolve);d.forEach(c,function(a,b){c[b]=d.isString(a)?h.get(a):h.invoke(a,null,null,b)});a=u(a);d.isDefined(a)&&(c.$template=a);return g.all(c)}}function u(a){var c,b;d.isDefined(c=a.template)?d.isFunction(c)&&(c=c(a.params)):d.isDefined(b=
a.templateUrl)&&(d.isFunction(b)&&(b=b(a.params)),d.isDefined(b)&&(a.loadedTemplateUrl=r.valueOf(b),c=k(b)));return c}function w(){var a,c;d.forEach(f,function(b,g){var f;if(f=!c){var h=e.path();f=b.keys;var l={};if(b.regexp)if(h=b.regexp.exec(h)){for(var k=1,n=h.length;k<n;++k){var m=f[k-1],p=h[k];m&&p&&(l[m.name]=p)}f=l}else f=null;else f=null;f=a=f}f&&(c=s(b,{params:d.extend({},e.search(),a),pathParams:a}),c.$$route=b)});return c||f[null]&&s(f[null],{params:{},pathParams:{}})}function v(a,b){var e=
[];d.forEach((a||"").split(":"),function(a,d){if(0===d)e.push(a);else{var f=a.match(/(\w+)(?:[?*])?(.*)/),g=f[1];e.push(b[g]);e.push(f[2]||"");delete b[g]}});return e.join("")}var x=!1,p,A,t={routes:f,reload:function(){x=!0;var b={defaultPrevented:!1,preventDefault:function(){this.defaultPrevented=!0;x=!1}};a.$evalAsync(function(){l(b);b.defaultPrevented||m()})},updateParams:function(a){if(this.current&&this.current.$$route)a=d.extend({},this.current.params,a),e.path(v(this.current.$$route.originalPath,
a)),e.search(a);else throw B("norout");}};a.$on("$locationChangeStart",l);a.$on("$locationChangeSuccess",m);return t}]}),B=d.$$minErr("ngRoute");r.provider("$routeParams",function(){this.$get=function(){return{}}});r.directive("ngView",w);r.directive("ngView",v);w.$inject=["$route","$anchorScroll","$animate"];v.$inject=["$compile","$controller","$route"]})(window,window.angular);
//# sourceMappingURL=angular-route.min.js.map
;// Az angular fő-modul létrehozása.
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
}]);;// Login kezelése.
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
}]);;// Body kontrollere.
webapp.controller( "bodyController", ['$scope', '$http', 'userFactory', '$rootScope',
    function($scope, $http, userFactory, $rootScope){
        
    $scope.isLoggedIn = true; 
    $scope.defaultConent = 'index';
    $scope.currentContentName = '';
        
    $scope.name = "Jeffrey";
        
    $scope.users = [];
        
    // Bejelentkezés.
    $scope.doLogin = function() {
        if ( !$scope.loginData ) {
            alert('Kérjük töltse ki a mezőket!');
            return;
        }
        if ( !$scope.loginData.email || !$scope.loginData.pass ) {
            alert('Kérjük töltse ki a mezőket!');
            return;
        }
        
        userFactory.checkLogin($scope.loginData)
            .then(function(loggedIn){
                $scope.isLoggedIn = loggedIn;
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
        
          
}]);;// Body kontrollere.
webapp.controller( "indexController", ['$scope', '$http', 'userFactory',
    function($scope, $http, userFactory){
        
    $scope.pageTitle = 'Alkalmazás kezelése';
        
          
}]);