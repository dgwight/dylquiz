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
                templateUrl: "controllers/createQuiz/templates/home.html",
                controller: "HomePageController",
                controllerAs: "model"
            })
            .when("/home", {
                templateUrl: "controllers/createQuiz/templates/home.html",
                controller: "HomePageController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "controllers/register/templates/login.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "controllers/register/templates/register.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/register/:uid", {
                templateUrl: "controllers/register/templates/profile.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/register/:uid/createQuiz", {
                templateUrl: "controllers/createQuiz/templates/createQuiz-new.view.client.html",
                controller: "NewQuizController",
                controllerAs: "model"
            })
            .when("/register/:uid/createQuiz/new", {
                templateUrl: "controllers/createQuiz/templates/createQuiz-new.view.client.html",
                controller: "NewQuizController",
                controllerAs: "model"
            })
            .when("/register/:uid/createQuiz/:qid/question", {
                templateUrl: "controllers/createQuiz/templates/createQuizResultsList.html",
                controller: "NewQuizController",
                controllerAs: "model"
            })
            .when("/register/:uid/createQuiz/:qid/question/new", {
                templateUrl: "controllers/createQuiz/templates/createQuizResultsNew.html",
                controller: "NewQuizController",
                controllerAs: "model"
            })
            .when("/register/:uid/createQuiz/:qid/question/:yid", {
                templateUrl: "controllers/createQuiz/templates/createQuizResultsEdit.html",
                controller: "NewQuizController",
                controllerAs: "model"
            })
            .otherwise({
                templateUrl: "controllers/createQuiz/templates/home.html",
                controller: "LoginController",
                controllerAs: "model"
            })
    }
})();
