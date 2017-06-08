/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("DylQuiz")
        .factory("UserService", function (CommonService) {

            var api = Object.create(CommonService);
            api.findByUsername = findByUsername;
            api.findByCredentials = findByCredentials;
            api.setObjects([
                {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
                {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
                {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
            ]);

            return api;

            function findByUsername(username) {
                return api.filter(function (user) {
                    return user.username === username;
                }).first;
            }

            function findByCredentials(username) {
                return api.filter(function (user) {
                    return user.username === username && user.password === password;
                }).first;
            }
        });
})();
