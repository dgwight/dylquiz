/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("CreateQuizAnswerNewCtrl", function ($routeParams, $location, AnswerService, ResultService) {
            const vm = this;

            vm.qid = $routeParams["qid"];
            vm.qnid = $routeParams["qnid"];
            vm.createAnswer = createAnswer;
            vm.toggleSelection = toggleSelection;
            vm.answer = {};
            vm.answer.results = [];

            function init() {
                ResultService.findByQuizId(vm.qid)
                    .then(function (quizResults) {
                        vm.quizResults = quizResults;
                    }).catch(function (error) {
                        console.log(error);
                    });

                console.log(vm.qnid);
            }

            init();

            function createAnswer(answer) {
                AnswerService
                    .createAnswer(answer, vm.qnid, vm.qid)
                    .then(function (answer) {
                        $location.url("/createQuiz/" + vm.qid + "/question/" + vm.qnid);
                    }).catch(function (error) {
                        console.log(error);
                    })
            }

            function toggleSelection(resultId) {
                console.log("toggleSelection", resultId);
                const idx = vm.answer.results.indexOf(resultId);

                // Is currently selected
                if (idx > -1) {
                    vm.answer.results.splice(idx, 1);
                }

                // Is newly selected
                else {
                    vm.answer.results.push(resultId);
                }
            }
        });
})();
