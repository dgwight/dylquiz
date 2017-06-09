/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .factory("UserService", function (CommonService) {

            var api = Object.create(CommonService);
            api.findByUsername = findByUsername;
            api.findByCredentials = findByCredentials;

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
