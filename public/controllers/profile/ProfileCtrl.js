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
            vm.tappedFollowButton = tappedFollowButton;
            vm.isFollowing = isFollowing;
            vm.buddyButtonText = buddyButtonText;

            function init() {
                getUser().then((user) => {
                    vm.user = user;
                    RecordService.find({_user: user._id}).then((records) => {
                        vm.records = records.filter((record) => record.published);
                    });

                    loadFollowers(user);
                }).catch((error) => {
                    console.log(error);
                });
            }

            init();

            function isFollowing() {
                if (vm.user && vm.currentUser) {
                    console.log(vm.currentUser);
                    var i = vm.currentUser.following.indexOf(vm.user._id);
                    return i > -1;
                }
                return false;
            }

            function buddyButtonText() {
                if (vm.isFollowing()) {
                    return "Unfollow"
                } else {
                    return "Follow"
                }
            }

            function tappedFollowButton(userId) {
                if (vm.isFollowing()) {
                    UserService.unfollow(userId).then((user) => {
                        return UserService.findById(vm.currentUser._id);
                    }).then((currentUser) => {
                        vm.currentUser = currentUser;
                        console.log("currentUser", currentUser);
                    });
                } else {
                    UserService.follow(userId).then((user) => {
                        return UserService.findById(vm.currentUser._id);
                    }).then((currentUser) => {
                        vm.currentUser = currentUser;
                        console.log("currentUser", currentUser);
                    });
                }
            }

            function getUser() {
                if (vm.uid) {
                    return UserService.findById(vm.uid);
                } else {
                    return Promise.resolve(vm.currentUser);
                }
            }

            function loadFollowers(user) {
                UserService.getFollowing(user._id).then((following) => {
                    console.log("following", following);
                    vm.following = following;
                });
            }
        });
})();