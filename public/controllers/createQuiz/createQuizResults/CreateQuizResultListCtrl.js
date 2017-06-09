/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("CreateQuizResultListCtrl", function ($routeParams, $location, QuizService) {
            const vm = this;

            vm.qid = $routeParams["qid"];

            function init() {
                console.log("qid: ", vm.qid);
                QuizService.findById(vm.qid)
                    .then(function (quiz) {
                        vm.quiz = quiz;
                    }).catch(function (error) {
                        console.log(error);
                    });
            }

            init();
        });
})();
