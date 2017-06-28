/**
 * Created by DylanWight on 6/28/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("WallCtrl", function ($rootScope, UserService) {
            const vm = this;
            vm.currentUser = $rootScope.currentUser;

            function init() {
                UserService.getWall(vm.currentUser._id).then((records) => {
                    console.log(records);
                    vm.records = records.filter((record) => record.published);
                }).catch((error) => {
                    console.log(error);
                });
            }

            init();

        });
})();