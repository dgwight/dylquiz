/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("RegisterCtrl", function ($location, $rootScope, UserService, RecordService) {
            const vm = this;
            vm.register = register;

            function register(user, passwordConfirm) {
                console.log(user, passwordConfirm);
                if (!user || !user.username) {
                    vm.alert = "Username required";
                    return;
                } else if (!user.password) {
                    vm.alert = "Password required";
                    return;
                } else if (user.password !== passwordConfirm) {
                    vm.alert = "Passwords do not match";
                    return;
                } else {
                    vm.alert = "";
                }

                UserService
                    .register(user)
                    .then(function(response) {
                        $rootScope.currentUser = response.data;
                        $location.url("/home/");
                        if ($rootScope.currentRecord) {
                            RecordService.update($rootScope.currentRecord._id, {_user: $rootScope.currentUser._id});
                        }
                    });
            }
        });
})();
