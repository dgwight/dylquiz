/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("DylQuiz")
        .controller("HomePageController", HomePageController)
        .controller("NewQuizController", NewQuizController);

    function HomePageController(QuizService) {
        var vm = this;

        function init() {
            vm.quizzes = QuizService.listQuizzes();
        }
        init();
    }

    function NewQuizController(QuizService, YouAreService) {
        var vm = this;

        function init() {
            vm.quizzes = QuizService.listQuizzes();
            vm.youares = YouAreService.listYouAres();
        }
        init();
    }

})();
