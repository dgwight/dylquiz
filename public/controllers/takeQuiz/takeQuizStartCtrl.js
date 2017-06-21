/**
 * Created by DylanWight on 6/20/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("TakeQuizStartCtrl", function ($routeParams, $location, QuizService, QuestionService, RecordService) {
            const vm = this;
            vm.qid = $routeParams["qid"];
            vm.startQuiz = startQuiz;

            function init() {
                QuizService.findById(vm.qid)
                    .then(function (quiz) {
                        vm.quiz = quiz;
                    }).catch(function (error) {
                        console.log(error);
                    });

                QuestionService.findByQuizId(vm.qid)
                    .then(function (results) {
                        vm.questions = results;
                    }).catch(function (error) {
                        console.log(error);
                    });
            }

            init();

            function startQuiz(quiz) {
                RecordService
                    .createForQuiz(quiz)
                    .then(function (record) {
                        $location.url("/takeQuiz/" + vm.qid + "/question/" + vm.questions[0]._id);
                    }).catch(function (error) {
                        console.log(error);
                    })
            }
        });
})();