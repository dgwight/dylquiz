/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .factory("ResultService", function (CommonService) {

            const api = Object.create(CommonService);
            api.createResult = createResult;
            api.filterByQuizId = filterByQuizId;

            return api;

            function createResult(result, quizId) {
                result.quizId = quizId;
                return api.create(result);
            }

            function filterByQuizId(quizId) {
                return api.find({"quizId": quizId});
            }
        });
})();