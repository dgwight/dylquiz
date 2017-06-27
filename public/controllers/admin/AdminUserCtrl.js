/**
 * Created by DylanWight on 6/26/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("AdminUserCtrl", function ($routeParams, $location, UserService) {
            const vm = this;
            vm.uid = $routeParams["uid"];
            vm.updateUser = updateUser;
            vm.createUser = createUser;
            vm.back = back;

            function init() {
                if (vm.uid) {
                    UserService.findById(vm.uid).then((user) => {
                        vm.user = JSON.parse(JSON.stringify(user));
                    })
                }
            }

            init();

            function updateUser(user) {
                UserService.update(user._id, user).then((user) => {
                    $location.url("/admin/");
                }).catch((error) => {
                    vm.error = error;
                });
            }

            function createUser(user) {
                UserService.create(user).then((user) => {
                    $location.url("/admin/");
                }).catch((error) => {
                    vm.error = error;
                });
            }

            function back() {
                $location.url("/admin/");
            }
        });
})();