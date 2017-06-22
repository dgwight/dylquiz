/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("CreateQuizAnswerEditCtrl", function ($routeParams, $location,
                                                          AnswerService, QuestionService, ResultService) {
            const vm = this;

            vm.qid = $routeParams["qid"];
            vm.qnid = $routeParams["qnid"];
            vm.aid = $routeParams["aid"];
            vm.updateAnswer = updateAnswer;
            vm.removeAnswer = removeAnswer;
            vm.toggleSelection = toggleSelection;
            vm.isResultSelected = isResultSelected;
            vm.answer = {};
            vm.answer.results = [];

            function init() {
                AnswerService.findById(vm.aid)
                    .then(function (answer) {
                        vm.answer = answer;
                    }).catch(function (error) {
                        console.log(error);
                    });

                QuestionService.findById(vm.qnid)
                    .then(function (question) {
                        vm.question = question;
                    }).catch(function (error) {
                        console.log(error);
                    });

                ResultService.findByQuizId(vm.qid)
                    .then(function (quizResults) {
                        vm.quizResults = quizResults;
                    }).catch(function (error) {
                        console.log(error);
                    });
            }

            init();

            function updateAnswer(answer) {
                AnswerService
                    .update(answer._id, answer)
                    .then(function (answer) {
                        $location.url("/createQuiz/" + vm.qid + "/question/" + vm.qnid);
                    }).catch(function (error) {
                        console.log(error);
                    })
            }

            function removeAnswer(answer) {
                AnswerService
                    .remove(answer._id)
                    .then(function (answer) {
                        $location.url("/createQuiz/" + vm.qid + "/question/" + vm.qnid);
                    }).catch(function (error) {
                        console.log(error);
                    })
            }

            function toggleSelection(result) {
                if (isResultSelected(vm.answer, result))
                    vm.answer.results.splice(idx, 1);
                else
                    vm.answer.results.push(result);
            }

            function isResultSelected(answer, result) {
                return answer.results.map((r) => r._id).indexOf(result._id) > -1;
            }
        });
})();
