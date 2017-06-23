/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("LoginCtrl", function ($location, $rootScope, AuthService) {
            const vm = this;
            vm.login = login;

            function login(user) {
                console.log(user);
                if (!user || !user.username) {
                    vm.alert = "Username is required";
                    return;
                } else if (!user.password) {
                    vm.alert = "Password is required";
                    return;
                }

                AuthService
                    .login(user)
                    .then(function (response) {
                        $rootScope.currentAuth = response.data;
                        $location.url("/home/");
                    }).catch(function (error) {
                        vm.alert = "Username " + user.username + " not found, please try again";
                    });
            }
        });
})();