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
                templateUrl: "views/createQuiz/createQuizResult/createQuizResultList.html",
                controller: "CreateQuizResultListCtrl",
                controllerAs: "model"
            })
            .when("/createQuiz/:qid/result/new", {
                templateUrl: "views/createQuiz/createQuizResult/createQuizResultNew.html",
                controller: "CreateQuizResultNewCtrl",
                controllerAs: "model"
            })
            .when("/createQuiz/:qid/result/:rid", {
                templateUrl: "views/createQuiz/createQuizResult/createQuizResultEdit.html",
                controller: "CreateQuizResultEditCtrl",
                controllerAs: "model"
            })
            .when("/createQuiz/:qid/question", {
                templateUrl: "views/createQuiz/createQuizQuestion/createQuizQuestionList.html",
                controller: "CreateQuizQuestionListCtrl",
                controllerAs: "model"
            })
            .when("/createQuiz/:qid/question/new", {
                templateUrl: "views/createQuiz/createQuizQuestion/createQuizQuestionNew.html",
                controller: "CreateQuizQuestionNewCtrl",
                controllerAs: "model"
            })
            .when("/createQuiz/:qid/question/:qnid", {
                templateUrl: "views/createQuiz/createQuizQuestion/createQuizQuestionEdit.html",
                controller: "CreateQuizQuestionEditCtrl",
                controllerAs: "model"
            })
            .when("/createQuiz/:qid/question/:qnid/answer/new", {
                templateUrl: "views/createQuiz/createQuizAnswer/createQuizAnswerNew.html",
                controller: "CreateQuizAnswerNewCtrl",
                controllerAs: "model"
            })
            .when("/createQuiz/:qid/question/:qnid/answer/:aid", {
                templateUrl: "views/createQuiz/createQuizAnswer/createQuizAnswerEdit.html",
                controller: "CreateQuizAnswerEditCtrl",
                controllerAs: "model"
            })
            .otherwise({
                templateUrl: "views/404/404.html",
                // controller: "LoginCtrl",
                // controllerAs: "model"
            })
    }
})();
