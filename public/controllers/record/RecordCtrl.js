/**
 * Created by DylanWight on 6/20/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("RecordCtrl", function ($rootScope, $routeParams, $location, RecordService) {
            const vm = this;
            vm.rid = $routeParams["rid"];

            function init() {
                RecordService.findById(vm.rid)
                    .then((record) => {
                        vm.record = record;
                    }).catch((error) => {
                        console.log(error);
                    });
            }

            init();
        });
})();