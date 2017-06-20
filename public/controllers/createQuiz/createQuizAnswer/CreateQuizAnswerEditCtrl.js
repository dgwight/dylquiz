/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("CreateQuizAnswerEditCtrl", function ($routeParams, $location, AnswerService, ResultService) {
            const vm = this;

            vm.qid = $routeParams["qid"];
            vm.qnid = $routeParams["qnid"];
            vm.aid = $routeParams["aid"];
            vm.updateAnswer = updateAnswer;
            vm.removeAnswer = removeAnswer;

            function init() {
                AnswerService.findById(vm.aid)
                    .then(function (answer) {
                        vm.answer = answer;
                    }).catch(function (error) {
                        console.log(error);
                    });

                ResultService.findByQuizId(vm.qid)
                    .then(function (results) {
                        vm.results = results;
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
        });
})();
