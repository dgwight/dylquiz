/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("CreateQuizInfoCtrl", function ($routeParams, $location, QuizService) {
            const vm = this;
            vm.createQuiz = createQuiz;

            function createQuiz(quiz) {
                QuizService
                    .create(quiz)
                    .then(function (quiz) {
                        $location.url("/createQuiz/" + quiz._id + "/result");
                    }).catch(function (error) {
                        console.log(error);
                    })
            }
        });
})();
