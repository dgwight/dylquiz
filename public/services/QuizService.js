/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .factory("QuizService", function ($http, CommonService) {

            const api = Object.create(CommonService);
            api.setObjectName("quiz");

            return api;
        });
})();


