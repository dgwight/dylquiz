/**
 * Created by DylanWight on 6/20/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("TakeQuizQuestionCtrl", function ($routeParams, $location, QuizService,
                                                   QuestionService, RecordService, AnswerService) {
            const vm = this;
            vm.qid = $routeParams["qid"];
            vm.answerQuestion = answerQuestion;

            function init() {
                RecordService.findByQuizId(vm.qid)
                    .then(function (records) {
                        vm.record = records[0];
                        return advance(vm.record);
                    }).catch((error) => {
                        console.log(error);
                    });
            }

            init();

            function answerQuestion(recordId, answerId) {
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
                vm.record = record;
                RecordService
                    .getNextQuestion(record._id)
                    .then((question) => {
                        vm.question = question;
                        return AnswerService
                            .findByQuestionId(question._id)
                            .then((answers) => {
                                vm.answers = answers;
                            })

                    }).catch((error) => {
                        if (error.status === 404)
                            $location.url("/takeQuiz/" + vm.qid + "/complete");
                        else
                            console.log(error);
                });
            }
        });
})();