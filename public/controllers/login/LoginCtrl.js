/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("LoginCtrl", function ($location, UserService) {
            const vm = this;
            vm.login = login;

            function login(user) {
                user = UserService.findUserByCredentials(user.username, user.password);
                if (user) {
                    $location.url("/register/" + user._id);
                } else {
                    vm.alert = "Unable to login";
                }
            }
        });
})();