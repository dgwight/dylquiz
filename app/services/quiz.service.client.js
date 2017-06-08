/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("DylQuiz")
        .factory("QuizService", function ($http, CommonService) {

            var api = Object.create(CommonService);
            api.setObjectName("createQuiz");

            return api;
        });
})();


