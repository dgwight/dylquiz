/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("CreateQuizResultEditCtrl", function ($routeParams, $location, ResultService) {
            const vm = this;

            vm.qid = $routeParams["qid"];
            vm.rid = $routeParams["rid"];
            vm.updateResult = updateResult;
            vm.removeResult = removeResult;

            function init() {
                ResultService.findById(vm.rid)
                    .then(function (result) {
                        vm.result = result;
                    }).catch(function (error) {
                        console.log(error);
                    });
            }

            init();

            function updateResult(result) {
                ResultService
                    .update(result._id, result)
                    .then(function (result) {
                        $location.url("/createQuiz/" + vm.qid + "/result");
                    }).catch(function (error) {
                        console.log(error);
                    })
            }

            function removeResult(result) {
                if (confirm('Are you sure you want to delete this result?')) {
                    ResultService
                        .remove(result._id)
                        .then(function (result) {
                            $location.url("/createQuiz/" + vm.qid + "/result");
                        }).catch(function (error) {
                            console.log(error);
                        })
                }
            }
        });
})();
