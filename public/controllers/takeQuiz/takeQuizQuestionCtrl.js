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
                        return RecordService.getNextQuestion(vm.record);
                    }).then(function (question) {
                        vm.question = question;
                        return AnswerService.findByQuestionId(question._id)
                    }).then(function (answers) {
                        vm.answers = answers;
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

            function answerQuestion(recordId, questionId, answerId) {
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