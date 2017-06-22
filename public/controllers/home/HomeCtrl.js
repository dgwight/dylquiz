/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("HomeCtrl", function (QuizService) {
            const vm = this;

            function init() {
                QuizService.find({})
                    .then(function (quizzes) {
                        vm.quizzes = quizzes;
                        vm.publishedQuizzes = quizzes.filter((quiz) => quiz.published);
                    }).catch(function (error) {
                        vm.alert = "Widget not found, please try again";
                    });
            }

            init();
        });
})();