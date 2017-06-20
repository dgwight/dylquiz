/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.html",
                controller: "HomeCtrl",
                controllerAs: "model"
            })
            .when("/home", {
                templateUrl: "views/home/home.html",
                controller: "HomeCtrl",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/login/login.html",
                controller: "LoginCtrl",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/register/register.html",
                controller: "RegisterCtrl",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.html",
                controller: "ProfileCtrl",
                controllerAs: "model"
            })
            .when("/createQuiz", {
                templateUrl: "views/createQuiz/createQuizStart.html",
                controller: "CreateQuizStartCtrl",
                controllerAs: "model"
            })
            .when("/createQuiz/:qid", {
                templateUrl: "views/createQuiz/createQuizInfo/createQuizInfo.html",
                controller: "CreateQuizInfoCtrl",
                controllerAs: "model"
            })
            .when("/createQuiz/:qid/result", {
                templateUrl: "views/createQuiz/createQuizResults/createQuizResultsList.html",
                controller: "CreateQuizResultListCtrl",
                controllerAs: "model"
            })
            .when("/createQuiz/:qid/result/new", {
                templateUrl: "views/createQuiz/createQuizResults/createQuizResultsNew.html",
                controller: "CreateQuizResultNewCtrl",
                controllerAs: "model"
            })
            .when("/createQuiz/:qid/result/:rid", {
                templateUrl: "views/createQuiz/createQuizResults/createQuizResultsEdit.html",
                controller: "CreateQuizResultEditCtrl",
                controllerAs: "model"
            })
            .when("/createQuiz/:qid/question", {
                templateUrl: "views/createQuiz/createQuizResults/createQuizResultsList.html",
                controller: "CreateQuizQuestionListCtrl",
                controllerAs: "model"
            })


            .when("/createQuiz/:qid/question/new", {
                templateUrl: "views/createQuiz/createQuizQuestions/createQuizQuestionsNew.html",
                controller: "NewQuestionCtrl",
                controllerAs: "model"
            })
            .when("/createQuiz/:qid/question/:qid", {
                templateUrl: "views/createQuiz/createQuizQuestions/createQuizQuestionsEdit.html",
                controller: "EditQuestionCtrl",
                controllerAs: "model"
            })
            .otherwise({
                templateUrl: "views/404/404.html",
                // controller: "LoginCtrl",
                // controllerAs: "model"
            })
    }
})();
