/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("CreateQuizResultNewCtrl", function ($routeParams, $location, QuizService, ResultService) {
            const vm = this;

            vm.qid = $routeParams["qid"];
            vm.createResult = createResult;

            function init() {
                QuizService.findById(vm.qid)
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
                    .then(function (result) {
                        $location.url("/createQuiz/" + vm.qid + "/result");
                    }).catch(function (error) {
                        console.log(error);
                    })
            }
        });
})();
