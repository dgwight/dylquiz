/**
 * Created by DylanWight on 6/20/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("CreateQuizStartCtrl", function ($routeParams, $location, QuizService) {
            const vm = this;
            vm.createQuiz = createQuiz;

            function createQuiz(quiz) {
                QuizService
                    .create(quiz)
                    .then(function (quiz) {
                        $location.url("/createQuiz/" + quiz._id);
                    }).catch(function (error) {
                        console.log(error);
                    })
            }
        });
})();
