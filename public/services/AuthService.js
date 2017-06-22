/**
 * Created by DylanWight on 6/22/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .factory("AuthService", function ($http, CommonService) {

            const AuthService = CommonService("auth");
            AuthService.findByUsername = findByUsername;
            AuthService.findByCredentials = findByCredentials;
            AuthService.login = login;
            AuthService.logout = logout;
            AuthService.register = register;

            return AuthService;

            function findByUsername(username) {
                return AuthService.find({"username": username});
            }

            function findByCredentials(username, password) {
                return AuthService.find({"username": username, "password": password});
            }

            function login(user) {
                return $http.post("/api/login", user);
            }

            function logout() {
                return $http.post("/api/logout");
            }

            function register(user) {
                return $http.post("/api/register", user);
            }
        });
})();