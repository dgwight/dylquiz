/**
 * Created by DylanWight on 6/20/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("CreateQuizStartCtrl", function ($routeParams, $location, QuizService) {
            const vm = this;
            vm.createQuiz = createQuiz;

            function init() {
                QuizService.find({})
                    .then(function (quizzes) {
                        vm.quizzes = quizzes;
                        vm.inprogressQuizzes = quizzes.filter((quiz) => !quiz.published);
                    }).catch(function (error) {
                    vm.alert = "Widget not found, please try again";
                });
            }

            init();

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
