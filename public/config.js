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
                controllerAs: "model",
                resolve: { loggedin: autoLogin }
            })
            .when("/register", {
                templateUrl: "views/register/register.html",
                controller: "RegisterCtrl",
                controllerAs: "model",
                resolve: { loggedin: autoLogin }
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.html",
                controller: "ProfileCtrl",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/user/:uid", {
                templateUrl: "views/user/user.html",
                controller: "ProfileCtrl",
                controllerAs: "model",
            })
            .when("/createQuiz", {
                templateUrl: "views/createQuiz/createQuizStart.html",
                controller: "CreateQuizStartCtrl",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/createQuiz/:qid", {
                templateUrl: "views/createQuiz/createQuizInfo/createQuizInfo.html",
                controller: "CreateQuizInfoCtrl",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/createQuiz/:qid/result", {
                templateUrl: "views/createQuiz/createQuizResult/createQuizResultList.html",
                controller: "CreateQuizResultListCtrl",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/createQuiz/:qid/result/new", {
                templateUrl: "views/createQuiz/createQuizResult/createQuizResultNew.html",
                controller: "CreateQuizResultNewCtrl",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/createQuiz/:qid/result/:rid", {
                templateUrl: "views/createQuiz/createQuizResult/createQuizResultEdit.html",
                controller: "CreateQuizResultEditCtrl",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/createQuiz/:qid/question", {
                templateUrl: "views/createQuiz/createQuizQuestion/createQuizQuestionList.html",
                controller: "CreateQuizQuestionListCtrl",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/createQuiz/:qid/question/new", {
                templateUrl: "views/createQuiz/createQuizQuestion/createQuizQuestionNew.html",
                controller: "CreateQuizQuestionNewCtrl",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/createQuiz/:qid/question/:qnid", {
                templateUrl: "views/createQuiz/createQuizQuestion/createQuizQuestionEdit.html",
                controller: "CreateQuizQuestionEditCtrl",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }

            })
            .when("/createQuiz/:qid/question/:qnid/answer/new", {
                templateUrl: "views/createQuiz/createQuizAnswer/createQuizAnswerNew.html",
                controller: "CreateQuizAnswerNewCtrl",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/createQuiz/:qid/question/:qnid/answer/:aid", {
                templateUrl: "views/createQuiz/createQuizAnswer/createQuizAnswerEdit.html",
                controller: "CreateQuizAnswerEditCtrl",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/createQuiz/:qid/complete", {
                templateUrl: "views/createQuiz/createQuizComplete.html",
                controller: "CreateQuizCompleteCtrl",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/takeQuiz/:qid", {
                templateUrl: "views/takeQuiz/takeQuizStart.html",
                controller: "TakeQuizStartCtrl",
                controllerAs: "model"
            })
            .when("/takeQuiz/:qid/question", {
                templateUrl: "views/takeQuiz/takeQuizQuestion.html",
                controller: "TakeQuizQuestionCtrl",
                controllerAs: "model"
            })
            .when("/record/:rid", {
                templateUrl: "views/record/record.html",
                controller: "RecordCtrl",
                controllerAs: "model"
            })
            .otherwise({
                templateUrl: "views/404/404.html",
                // controller: "LoginCtrl",
                // controllerAs: "model"
            });
    }

    function checkLoggedin($q, $location, $rootScope, UserService) {
        var deferred = $q.defer();
        UserService
            .isLoggedIn()
            .then((user) => {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url('/register');
                }
            });
        return deferred.promise;
    }

    function autoLogin($q, $location, $rootScope, UserService) {
        var deferred = $q.defer();
        UserService
            .isLoggedIn()
            .then((user) => {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    $location.url('/home/');
                    deferred.resolve();
                } else {
                    deferred.resolve();
                }
            });
        return deferred.promise;
    }
})();
