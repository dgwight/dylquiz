/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("DylQuiz")
        .controller("HomePageController", HomePageController)
        .controller("NewQuizController", NewQuizController);

    function HomePageController(QuizService, algolia, $scope) {
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


        var client = algolia.Client('V5A9XWTQ4C', '2deca3f7fbaccbd2657a2d06c6252c1b');
        var index = client.initIndex('getstarted_actors');

        $scope.getDatasets = function () {
            return {
                source: algolia.sources.hits(index, {hitsPerPage: 5}),
                displayKey: 'my_attribute',
                templates: {
                    suggestion: function (suggestion) {
                        return suggestion._highlightResult.name.value;
                    }
                }
            };
        };

        $scope.$on('autocomplete:selected', function (event, suggestion, dataset) {
            console.log(suggestion, dataset);
        });
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
            $location.url("/user/" + vm.uid + "/quiz/" + vm.qid + "/youares/");
        }

        function updateYouAre(youAre) {
            YouAreService.update(vm.yid, youAre);
            $location.url("/user/" + vm.uid + "/quiz/" + vm.qid + "/youares/");
        }

        function deleteYouAre(youAre) {
            YouAreService.remove(youAre._id);
            $location.url("/user/" + vm.uid + "/quiz/" + vm.qid + "/youares/");
        }
    }

})();
