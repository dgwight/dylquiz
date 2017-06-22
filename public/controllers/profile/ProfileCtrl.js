/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("ProfileCtrl", function ($routeParams, UserService) {
            const vm = this;
            vm.update = update;

            vm.uid = $routeParams["uid"];
            function init() {
                // const user = UserService.findById(vm.uid);
                // vm.user = JSON.parse(JSON.stringify(user));
            }

            init();

            function update(user) {
                // UserService.updateUser(user._id, user);
            }
        });
})();