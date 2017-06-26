/**
 * Created by DylanWight on 6/26/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("SettingsCtrl", function ($rootScope, $location, UserService) {
            const vm = this;
            vm.updateUser = updateUser;

            function init() {
                vm.user = JSON.parse(JSON.stringify($rootScope.currentUser));
            }

            init();

            function updateUser(user) {
                UserService.update(user._id, user).then((user) => {
                        $location.url("/profile/");
                    }).catch((error) => {
                        vm.error = error;
                    });
            }
        });
})();