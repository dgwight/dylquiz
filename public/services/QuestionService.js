/**
 * Created by DylanWight on 6/20/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .factory("QuestionService", function ($http, CommonService) {

            const QuestionService = CommonService("question");
            QuestionService.createQuestion = createQuestion;
            QuestionService.findByQuizId = findByQuizId;
            QuestionService.getNextQuestion = getNextQuestion;

            return QuestionService;

            function createQuestion(question, quizId) {
                question._quiz = quizId;
                return QuestionService.create(question);
            }

            function findByQuizId(quizId) {
                return QuestionService.find({"_quiz": quizId});
            }

            function getNextQuestion(record) {
                const url = "/api/nextQuestion/" + record._id;
                console.log(url);
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
        });
})();