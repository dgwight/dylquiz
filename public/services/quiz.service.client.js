/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("DylQuiz")
        .factory("QuizService", QuizService);

    function QuizService() {

        var quizzes = [
            {"_id": "321", "name": "Post 1", "userId": "123", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "userId": "123", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "userId": "123", "description": "Lorem"}
        ];
        var api = {
            "listQuizzes": listQuizzes,
            "createQuiz": createQuiz,
            "findQuizByUserId": findQuizByUserId,
            "findQuizById": findQuizById,
            "updateQuiz": updateQuiz,
            "deleteQuiz": deleteQuiz,
        };
        return api;

        function listQuizzes() {
            return quizzes;
        }

        function createQuiz(userId, quiz) {
            quiz._id = quiz._id ? quiz._id : new Date().getTime() + "";
            quiz.userId = userId;
            quizzes.push(quiz);
            return quiz;
        }

        function findQuizByUserId(websiteId) {
            var userQuizzes = [];
            for (var i = 0; i < quizzes.length; i++) {
                if (quizzes[i].websiteId === websiteId)
                    userQuizzes.push(quizzes[i]);
            }
            return userQuizzes;
        }

        function findQuizById(quizId) {
            for (var i = 0; i < quizzes.length; i++) {
                if (quizzes[i]._id === quizId)
                    return quizzes[i];
            }
            return null;
        }

        function updateQuiz(quizId, quiz) {
            for (var i = 0; i < quizzes.length; i++) {
                if (quizzes[i]._id === quizId) {
                    quizzes[i] = quiz;
                    return quizzes[i];
                }
            }
        }

        function deleteQuiz(quizId) {
            for (var i = 0; i < quizzes.length; i++) {
                if (quizzes[i]._id === quizId) {
                    quizzes.splice(i, 1);
                }
            }
        }
    }
})();
