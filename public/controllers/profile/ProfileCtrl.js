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
            vm.removeBuddyRequest = removeBuddyRequest;
            vm.acceptBuddyRequest = acceptBuddyRequest;
            vm.removeBuddy = removeBuddy;
            vm.isBuddyRequestSent = isBuddyRequestSent;
            vm.isBuddy = isBuddy;
            vm.buddyButtonText = buddyButtonText;

            function init() {
                getUser().then((user) => {
                    vm.user = user;
                    RecordService.find({_user: user._id}).then((records) => {
                        vm.records = records.filter((record) => record.published);
                    });

                    loadBuddies(user);
                }).catch((error) => {
                    console.log(error);
                });
            }

            init();

            function isBuddyRequestSent() {
                if (vm.user && vm.currentUser) {
                    var i = vm.user.buddyRequests.indexOf(vm.currentUser._id);
                    console.log(i);
                    return i > -1;
                }
                return false;
            }

            function isBuddy() {
                if (vm.user && vm.currentUser) {
                    var i = vm.buddies.indexOf(vm.currentUser._id);
                    console.log(i);
                    return i > -1;
                }
                return false;
            }

            function buddyButtonText() {
                if (vm.isBuddy()) {
                    return "Buddies"
                } else if (vm.isBuddyRequestSent()) {
                    return "Buddy Request Sent"
                } else {
                    return "Add Buddy"
                }
            }

            function sendBuddyRequest(userId) {
                UserService.sendBuddyRequest(userId).then((user) => {
                    loadBuddies(user);
                });
            }

            function acceptBuddyRequest(userId) {
                UserService.acceptBuddyRequest(userId).then((user) => {
                    loadBuddies(user);
                });
            }

            function removeBuddyRequest(userId) {
                UserService.removeBuddyRequest(userId).then((user) => {
                    loadBuddies(user);
                });
            }

            function removeBuddy(userId) {
                UserService.removeBuddy(userId).then((user) => {
                    loadBuddies(user);
                });
            }

            function getUser() {
                if (vm.uid) {
                    return UserService.findById(vm.uid);
                } else {
                    return Promise.resolve(vm.currentUser);
                }
            }

            function loadBuddies(user) {
                UserService.getBuddyRequests(user._id).then((buddyRequests) => {
                    console.log("buddyRequests", buddyRequests);
                    vm.buddyRequests = buddyRequests;
                });

                UserService.getBuddies(vm.user._id).then((buddies) => {
                    console.log("buddies", buddies);
                    vm.buddies = buddies;
                });
            }
        });
})();