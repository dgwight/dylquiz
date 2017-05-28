/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("DylQuiz")
        .factory("YouAreService", YouAreService);

    function YouAreService() {

        var youares = [
            {"_id": "321", "name": "Ned Stark", "quizId": "123", "url": "https://68.media.tumblr.com/avatar_ae8d71bd8b7e_128.png",
                "description": "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. "},
            {"_id": "432", "name": "Daenerys Targaryen", "quizId": "123", "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ4ROHCcqaCoFyYlomONxLCDG6-Rqy_Xrte1JHNLWLVefixSQXeg",
                "description": "Lorem"},
            {"_id": "543", "name": "Joffrey Baratheon", "quizId": "123", "url": "https://a.wattpad.com/useravatar/carryonbella.128.909424.jpg", "description": "Lorem"}
        ];
        var api = {
            "listYouAres": listYouAres,
            "createQuiz": createQuiz,
            "findQuizByUserId": findQuizByUserId,
            "findQuizById": findQuizById,
            "updateQuiz": updateQuiz,
            "deleteQuiz": deleteQuiz,
        };
        return api;

        function listYouAres() {
            return youares;
        }

        function createQuiz(userId, quiz) {
            quiz._id = quiz._id ? quiz._id : new Date().getTime() + "";
            quiz.userId = userId;
            youares.push(quiz);
            return quiz;
        }

        function findQuizByUserId(websiteId) {
            var userQuizzes = [];
            for (var i = 0; i < youares.length; i++) {
                if (youares[i].websiteId === websiteId)
                    userQuizzes.push(youares[i]);
            }
            return userQuizzes;
        }

        function findQuizById(quizId) {
            for (var i = 0; i < youares.length; i++) {
                if (youares[i]._id === quizId)
                    return youares[i];
            }
            return null;
        }

        function updateQuiz(quizId, quiz) {
            for (var i = 0; i < youares.length; i++) {
                if (youares[i]._id === quizId) {
                    youares[i] = quiz;
                    return youares[i];
                }
            }
        }

        function deleteQuiz(quizId) {
            for (var i = 0; i < youares.length; i++) {
                if (youares[i]._id === quizId) {
                    youares.splice(i, 1);
                }
            }
        }
    }
})();
