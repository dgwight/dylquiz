/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("CreateQuizResultListCtrl", function ($routeParams, $location, QuizService, ResultService) {
            const vm = this;

            vm.qid = $routeParams["qid"];

            function init() {
                QuizService.findById(vm.qid)
                    .then(function (quiz) {
                        vm.quiz = quiz;
                    }).catch(function (error) {
                        console.log(error);
                    });

                ResultService.findByQuizId(vm.qid)
                    .then(function (results) {
                        vm.results = results;
                    }).catch(function (error) {
                        console.log(error);
                    });
            }

            init();
        });
})();
