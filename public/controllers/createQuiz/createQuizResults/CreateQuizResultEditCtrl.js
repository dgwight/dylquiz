/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("CreateQuizResultsEditCtrl", function ($routeParams, $location, QuizService, ResultService) {
            const vm = this;

            vm.qid = $routeParams["qid"];
            vm.rid = $routeParams["rid"];
            vm.editResult = editResult;

            function init() {
                QuizService.findbyId(vm.qid)
                    .then(function (quiz) {
                        vm.quiz = quiz;
                    }).catch(function (error) {
                        console.log(error);
                    });
            }

            init();

            function editResult(result) {
                ResultService
                    .editResult(vm.rid, result)
                    .then(function (quiz) {
                        $location.url("/createQuiz/" + quiz._id + "/result");
                    }).catch(function (error) {
                        console.log(error);
                    })
            }
        });
})();
