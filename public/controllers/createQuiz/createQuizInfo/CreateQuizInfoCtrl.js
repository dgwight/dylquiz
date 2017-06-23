/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("CreateQuizInfoCtrl", function ($routeParams, $location, QuizService) {
            const vm = this;
            vm.qid = $routeParams["qid"];
            vm.updateQuiz = updateQuiz;
            vm.deleteQuiz = deleteQuiz;

            function init() {
                QuizService.findById(vm.qid)
                    .then(function (quiz) {
                        vm.quiz = quiz;
                    }).catch(function (error) {
                    console.log(error);
                });
            }
            init();

            function updateQuiz(quiz) {
                QuizService
                    .update(vm.qid, quiz)
                    .then(function (quiz) {
                        $location.url("/createQuiz/" + quiz._id + "/result");
                    }).catch(function (error) {
                        console.log(error);
                    })
            }

            function deleteQuiz(quiz) {
                QuizService
                    .remove(vm.qid)
                    .then(function (quiz) {
                        $location.url("/createQuiz");
                    }).catch(function (error) {
                        console.log(error);
                    })
            }
        });
})();
