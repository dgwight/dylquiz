/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .factory("QuizService", function (CommonService) {

            const QuizService = CommonService("quiz");
            return QuizService;
        });
})();
