/**
 * Created by DylanWight on 6/20/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .factory("RecordService", function ($http, CommonService) {

            const RecordService = CommonService("record");
            RecordService.createRecord = createRecord;
            RecordService.findByQuizId = findByQuizId;
            RecordService.createForQuiz = createForQuiz;
            RecordService.getNextQuestion = getNextQuestion;

            return RecordService;

            function createRecord(result, quizId) {
                result._quiz = quizId;
                return RecordService.create(result);
            }

            function findByQuizId(quizId) {
                return RecordService.find({"_quiz": quizId});
            }

            function createForQuiz(quiz) {
                var record = {};
                record._quiz = quiz._id
                return RecordService.create(record);
            }

            function getNextQuestion(record) {
                const url = "/api/record/" + record._id + "/next-question";
                console.log(url);
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
        });
})();