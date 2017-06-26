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
            UserService.sendBuddyRequest = sendBuddyRequest;
            UserService.getBuddyRequests = getBuddyRequests;
            UserService.getBuddies = getBuddies;
            UserService.acceptBuddyRequest = acceptBuddyRequest;
            UserService.removeBuddyRequest = removeBuddyRequest;
            UserService.removeBuddy = removeBuddy;

            return UserService;

            function sendBuddyRequest(userId) {
                return $http.post("/api/user/" + userId + "/send-buddy-request").then((response) => {
                    return response.data;
                });
            }

            function acceptBuddyRequest(userId) {
                return $http.post("/api/user/" + userId + "/accept-buddy-request").then((response) => {
                    return response.data;
                });
            }

            function removeBuddyRequest(userId) {
                return $http.post("/api/user/" + userId + "/remove-buddy-request").then((response) => {
                    return response.data;
                });
            }

            function removeBuddy(userId) {
                return $http.post("/api/user/" + userId + "/remove-buddy").then((response) => {
                    return response.data;
                });
            }

            function getBuddyRequests(userId) {
                return $http.get("/api/user/" + userId + "/get-buddy-requests").then((response) => {
                    return response.data;
                });
            }

            function getBuddies(userId) {
                return $http.get("/api/user/" + userId + "/get-buddies").then((response) => {
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