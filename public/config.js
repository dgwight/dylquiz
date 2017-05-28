/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("DylQuiz")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/quiz/templates/home-page.view.client.html",
                controller: "HomePageController",
                controllerAs: "model"
            })
            .when("/home", {
                templateUrl: "views/quiz/templates/home-page.view.client.html",
                controller: "HomePageController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/quiz", {
                templateUrl: "views/quiz/templates/quiz-new.view.client.html",
                controller: "NewQuizController",
                controllerAs: "model"
            })
            .when("/user/:uid/quiz/new", {
                templateUrl: "views/quiz/templates/quiz-new.view.client.html",
                controller: "NewQuizController",
                controllerAs: "model"
            })
            .when("/user/:uid/quiz/:qid/youares", {
                templateUrl: "views/quiz/templates/nq-youares.view.client.html",
                controller: "NewQuizController",
                controllerAs: "model"
            })
            .otherwise({
                templateUrl: "views/quiz/templates/home-page.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
    }
})();
