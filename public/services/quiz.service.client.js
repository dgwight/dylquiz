/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("DylQuiz")
        .factory("QuizService", function (CommonService) {

            var api = Object.create(CommonService);
            api.findByUserId = findByUserId;
            api.setObjects([
                {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
                {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
                {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
            ]);

            return api;

            function findByUserId(userId) {
                return api.filter(function (quiz) {
                    return quiz.userId === userId;
                });
            }
        })
})();

