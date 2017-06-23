/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("ProfileCtrl", function ($rootScope, $routeParams, RecordService, UserService) {
            const vm = this;
            vm.currentUser = $rootScope.currentUser;
            vm.uid = $routeParams.uid;
            vm.sendBuddyRequest = sendBuddyRequest;

            function init() {
                getUser().then((user) => {
                    vm.user = user;
                    return RecordService.find({_user: user._id});
                }).then((records) => {
                    vm.records = records;
                }).catch((error) => {
                    console.log(error);
                });
            }

            init();

            function sendBuddyRequest(user) {
                UserService.sendBuddyRequest(user._id)
            }

            function getUser() {
                if (vm.uid) {
                    return UserService.findById(vm.uid);
                } else {
                    return Promise.resolve(vm.currentUser);
                }
            }
        });
})();