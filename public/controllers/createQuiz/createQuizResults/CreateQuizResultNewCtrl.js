/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("CreateQuizResultsNewCtrl", function ($routeParams, $location, QuizService, ResultService) {
            const vm = this;

            vm.qid = $routeParams["qid"];
            vm.createResult = createResult;

            function init() {
                QuizService.findbyId(vm.qid)
                    .then(function (quiz) {
                        vm.quiz = quiz;
                    }).catch(function (error) {
                        console.log(error);
                    });
            }

            init();

            function createResult(result) {
                ResultService
                    .createResult(result, vm.qid)
                    .then(function (quiz) {
                        $location.url("/createQuiz/" + quiz._id + "/result");
                    }).catch(function (error) {
                        console.log(error);
                    })
            }
        });
})();
