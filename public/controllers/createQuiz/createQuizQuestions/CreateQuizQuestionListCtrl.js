/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("CreateQuizQuestionListCtrl", function ($routeParams, $location, QuizService, QuestionService) {
            const vm = this;
            vm.qid = $routeParams["qid"];

            function init() {
                QuizService.findById(vm.qid)
                    .then(function (quiz) {
                        vm.quiz = quiz;
                    }).catch(function (error) {
                        console.log(error);
                    });

                // QuestionService.findByQuizId(vm.qid)
                //     .then(function (results) {
                //         vm.questions = results;
                //     }).catch(function (error) {
                //         console.log(error);
                //     });
            }

            init();
        });
})();
