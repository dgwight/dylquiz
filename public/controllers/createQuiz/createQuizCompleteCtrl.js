/**
 * Created by DylanWight on 6/20/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("CreateQuizCompleteCtrl", function ($routeParams, $location, QuizService) {
            const vm = this;
            vm.qid = $routeParams["qid"];
            vm.publishQuiz = publishQuiz;

            function publishQuiz() {
                QuizService
                    .update(vm.qid, {published: true})
                    .then(function (quiz) {
                        $location.url("/home/");
                    }).catch(function (error) {
                        console.log(error);
                    })
            }
        });
})();