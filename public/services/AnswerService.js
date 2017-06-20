/**
 * Created by DylanWight on 6/20/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .factory("AnswerService", function (CommonService) {

            const AnswerService = CommonService("answer");
            AnswerService.createAnswer = createAnswer;
            AnswerService.findByQuizId = findByQuizId;
            AnswerService.findByQuestionId = findByQuestionId;

            return AnswerService;

            function createAnswer(answer, questionId, quizId) {
                answer._quiz = quizId;
                answer._question = questionId;
                return AnswerService.create(answer);
            }

            function findByQuizId(quizId) {
                return AnswerService.find({"_quiz": quizId});
            }

            function findByQuestionId(questionId) {
                return AnswerService.find({"_question": questionId});
            }
        });
})();