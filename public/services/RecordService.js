/**
 * Created by DylanWight on 6/20/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .factory("RecordService", function ($http, CommonService) {

            const RecordService = CommonService("record");
            RecordService.createForQuiz = createForQuiz;
            RecordService.getNextQuestion = getNextQuestion;
            RecordService.answerQuestion = answerQuestion;
            RecordService.findByQuiz = findByQuiz;

            return RecordService;

            function createForQuiz(quiz) {
                var record = {};
                record._quiz = quiz;
                return RecordService.create(record);
            }

            function getNextQuestion(recordId) {
                const url = "/api/record/" + recordId + "/next-question";
                console.log(url);
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function answerQuestion(recordId, answerId) {
                const url = "/api/record/" + recordId + "/answer-question";
                console.log(url);
                return $http.post(url, {answerId: answerId})
                    .then(function (response) {
                        return response.data;
                    });
            }

            function findByQuiz(quizId, userId) {
                return RecordService.find({"_quiz._id": quizId, "_user": userId});
            }
        });
})();