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
            QuizService.find({})
                .then(function(quizzes) {
                    vm.quizzes = quizzes;
                }).catch(function(error) {
                    vm.alert = "Widget not found, please try again";
                });
        }
        init();
    }

    function NewQuizController($routeParams, $location, QuizService, YouAreService) {
        var vm = this;
        vm.createYouAre = createYouAre;
        vm.updateYouAre = updateYouAre;
        vm.deleteYouAre = deleteYouAre;
        vm.yid = $routeParams["yid"];
        vm.qid = $routeParams["qid"];
        vm.uid = "123";

        function init() {
            var youAre = YouAreService.findById(vm.yid);
            if (youAre) {
                vm.youAre = {
                    "_id": youAre._id,
                    "name": youAre.name,
                    "url": youAre.url,
                    "quizId": youAre.quizId,
                    "description": youAre.description
                };
            }

            // vm.quizzes = QuizService.;
            vm.youares = YouAreService.filterYouAreByQuizId(vm.qid);
        }
        init();

        function createYouAre(youAre) {
            YouAreService.createYouAre(vm.qid, youAre);
            $location.url("/register/" + vm.uid + "/createQuiz/" + vm.qid + "/youares/");
        }

        function updateYouAre(youAre) {
            YouAreService.update(vm.yid, youAre);
            $location.url("/register/" + vm.uid + "/createQuiz/" + vm.qid + "/youares/");
        }

        function deleteYouAre(youAre) {
            YouAreService.remove(youAre._id);
            $location.url("/register/" + vm.uid + "/createQuiz/" + vm.qid + "/youares/");
        }
    }

})();
