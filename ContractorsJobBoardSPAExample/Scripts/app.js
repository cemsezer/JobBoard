angular.module("JobBoard", ["ui.bootstrap", "ngRoute"])
    .config(function($routeProvider) {

        $routeProvider
            .when("/register", {
                templateUrl: "ng-views/register.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "ng-views/login.html",
                controller: "LoginController"
            });
    })
    .controller("RegisterController", function($scope, $http) {

        $scope.email = "";
        $scope.password = "";
        $scope.confirmPassword = "";

        $scope.ok = function() {
            $http.post("api/Account/Register",
                {
                    Email: $scope.email,
                    Password: $scope.password,
                    ConfirmPassword: $scope.confirmPassword
                }).
                then(function(response) {
                        alert("User Created");
                    },
                    function(response) {
                        alert("User Not Created");
                    });
        };

    })
    .controller("LoginController", function($scope, $http, $q) {
        $scope.email = "";
        $scope.password = "";
        $scope.ok = function() {
            var data = "grant_type=password&username=" + $scope.email + "&password=" + $scope.password;
            var deferred = $q.defer();
            $http.post("/token",
                data,
                {
                    headers: { 'Content-Type': "application/x-www-form-urlencoded" }
                }).success(function(response) {
                deferred.resolve(response);
            }).error(function(err, status) {
/*
                _logOut();
*/
                deferred.reject(err);
            });
            return deferred.promise;
        };
    });