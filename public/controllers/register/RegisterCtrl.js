/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("RegisterCtrl", function ($location, UserService) {
            const vm = this;
            vm.register = register;

            function register(user) {
                if (user.password !== user.passwordConfirm) {
                    vm.alert = "Passwords do not match";
                    return;
                }
                if (UserService.findUserByUsername(user.username)) {
                    vm.alert = "Username is taken";
                    return;
                }
                user = UserService.createUser(user);
                if (user) {
                    $location.url("/register/" + user._id);
                } else {
                    vm.alert = "Unable to register";
                }
            }
        });
})();
