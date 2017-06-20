/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("CreateQuizQuestionEditCtrl", function ($routeParams, $location, QuestionService, AnswerService) {
            const vm = this;

            vm.qid = $routeParams["qid"];
            vm.qnid = $routeParams["qnid"];
            vm.updateQuestion = updateQuestion;
            vm.removeQuestion = removeQuestion;
            vm.addAnswer = addAnswer;

            function init() {
                QuestionService.findById(vm.qnid)
                    .then(function (question) {
                        vm.question = question;
                    }).catch(function (error) {
                        console.log(error);
                    });

                AnswerService.findByQuestionId(vm.qnid)
                    .then(function (answers) {
                        vm.answers = answers;
                    }).catch(function (error) {
                        console.log(error);
                    });
            }

            init();

            function updateQuestion(question) {
                QuestionService
                    .update(question._id, question)
                    .then(function (question) {
                        $location.url("/createQuiz/" + vm.qid + "/question");
                    }).catch(function (error) {
                        console.log(error);
                    })
            }

            function removeQuestion(question) {
                QuestionService
                    .remove(question._id)
                    .then(function (question) {
                        $location.url("/createQuiz/" + vm.qid + "/question");
                    }).catch(function (error) {
                        console.log(error);
                    })
            }

            function addAnswer(question) {
                QuestionService
                    .update(question._id, question)
                    .then(function (question) {
                        $location.url("/createQuiz/" + vm.qid + "/question/" + vm.qnid + "/answer/new");
                    }).catch(function (error) {
                        console.log(error);
                    })
            }
        });
})();
