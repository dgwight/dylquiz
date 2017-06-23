/**
 * Created by DylanWight on 6/20/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("TakeQuizQuestionCtrl", function ($rootScope, $routeParams, $location, QuizService,
                                                   QuestionService, RecordService, AnswerService) {
            const vm = this;
            vm.qid = $routeParams["qid"];
            vm.user = $rootScope.currentUser;
            vm.answerQuestion = answerQuestion;

            function init() {
                RecordService.findByQuiz(vm.qid, $rootScope.currentUser._id)
                    .then((records) => {
                        vm.record = records[0];
                        return advance(vm.record);
                    }).catch((error) => {
                        console.log(error);
                    });
            }

            init();

            function answerQuestion(recordId, answerId) {
                console.log("answerId", answerId);
                RecordService
                    .answerQuestion(recordId, answerId)
                    .then((record) => {
                        vm.record = record;
                        return advance(record);
                    }).catch((error) => {
                        console.log(error);
                    })
            }

            function advance(record) {
                console.log("advance");
                vm.record = record;
                RecordService
                    .getNextQuestion(record._id)
                    .then((question) => {
                        console.log(question);
                        vm.question = question;
                        return AnswerService.findByQuestionId(question._id)
                    }).then((answers) => {
                        console.log(answers);
                        vm.answers = answers;
                    }).catch((error) => {
                        if (error.status === 404)
                            $location.url("/record/" + vm.record._id);
                        else
                            console.log(error);
                });
            }
        });
})();