angular.module("JobBoard", ["ui.bootstrap"])
    .controller("RegisterController", function($scope, $http, $modal) {

        $scope.email = "";
        $scope.password = "";
        $scope.confirmPassword = "";

        $scope.open = function(size) {

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: "register.html",
                controller: "ModalInstanceCtrl",
                size: size
            });
        };
    })
    .controller("LoginController", function($scope, $modal) {

        $scope.email = "";
        $scope.password = "";

        $scope.open = function() {
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: "login.html",
                controller: "ModalInstanceCtrl2"
            });
        };
    })
    .controller("ModalInstanceCtrl", function($scope, $http, $modalInstance) {

        $scope.ok = function() {
            $http.post("api/Account/Register",
                {
                    Email: $scope.email,
                    Password: $scope.password,
                    ConfirmPassword: $scope.confirmPassword
                }).
                then(function(response) {
                        alert("User Created");
                        $modalInstance.close();
                    },
                    function(response) {
                        alert("User Not Created");
                    });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss("cancel");
        };
    })
    .controller("ModalInstanceCtrl2", function($scope, $http, $modalInstance) {

        $scope.ok = function() {
            $http.post("Token",
                {
                    Email: $scope.email,
                    Password: $scope.password
                }).
                then(function(response) {
                        alert("User Logged in");
                        $modalInstance.close();
                    },
                    function(response) {
                        alert("User Not Logged in");
                    });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss("cancel");
        };
    });