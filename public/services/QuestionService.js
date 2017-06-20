/**
 * Created by DylanWight on 6/20/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .factory("QuestionService", function (CommonService) {

            const QuestionService = CommonService("question");
            QuestionService.createQuestion = createQuestion;
            QuestionService.findByQuizId = findByQuizId;

            return QuestionService;

            function createQuestion(question, quizId) {
                question.quizId = quizId;
                return QuestionService.create(question);
            }

            function findByQuizId(quizId) {
                return QuestionService.find({"_quiz": quizId});
            }
        });
})();