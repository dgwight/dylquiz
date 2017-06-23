/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("ProfileCtrl", function ($rootScope, RecordService) {
            const vm = this;
            vm.user = $rootScope.currentUser;

            function init() {
                RecordService.find({_user: vm.user._id})
                    .then((records) => {
                        vm.records = records;
                    }).catch((error) => {
                        console.log(error);
                    });
            }

            init();

        });
})();