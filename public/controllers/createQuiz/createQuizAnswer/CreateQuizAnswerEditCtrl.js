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
            vm.resultIndex = resultIndex;
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
                const idx = resultIndex(vm.answer, result);
                if (idx > -1)
                    vm.answer.results.splice(idx, 1);
                else
                    vm.answer.results.push(result);
            }

            function resultIndex(answer, result) {
                return answer.results.map((r) => r._id).indexOf(result._id);
            }
        });
})();
