/**
 * Created by DylanWight on 6/22/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .factory("UserService", function ($http, CommonService) {

            const UserService = CommonService("user");
            UserService.findByUsername = findByUsername;
            UserService.findByCredentials = findByCredentials;
            UserService.login = login;
            UserService.logout = logout;
            UserService.register = register;
            UserService.isLoggedIn = isLoggedIn;
            UserService.follow = follow;
            UserService.unfollow = unfollow;
            UserService.getWall = getWall;
            UserService.getFollowing = getFollowing;

            return UserService;

            function follow(userId) {
                return $http.post("/api/user/" + userId + "/follow").then((response) => {
                    return response.data;
                });
            }

            function unfollow(userId) {
                return $http.post("/api/user/" + userId + "/unfollow").then((response) => {
                    return response.data;
                });
            }

            function getWall(userId) {
                return $http.get("/api/user/" + userId + "/get-wall").then((response) => {
                    return response.data;
                });
            }

            function getFollowing(userId) {
                return $http.get("/api/user/" + userId + "/get-following").then((response) => {
                    return response.data;
                });
            }

            function findByUsername(username) {
                return UserService.find({"username": username});
            }

            function findByCredentials(username, password) {
                return UserService.find({"username": username, "password": password});
            }

            function login(user) {
                return $http.post("/api/login", user).then((response) => {
                    return response.data;
                });
            }

            function logout() {
                return $http.post("/api/logout").then((response) => {
                    return response.data;
                });
            }

            function register(user) {
                return $http.post("/api/register", user).then((response) => {
                    return response.data;
                });
            }

            function isLoggedIn() {
                return $http.get("/api/loggedin").then((response) => {
                    return response.data;
                });
            }

            function sentBuddyRequest(userId, requestee) {

            }
        });
})();