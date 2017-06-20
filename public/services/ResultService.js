/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .factory("ResultService", function (CommonService) {

            const ResultService = CommonService("result");
            ResultService.createResult = createResult;
            ResultService.findByQuizId = findByQuizId;

            return ResultService;

            function createResult(result, quizId) {
                result._quiz = quizId;
                return ResultService.create(result);
            }

            function findByQuizId(quizId) {
                return ResultService.find({"_quiz": quizId});
            }
        });
})();