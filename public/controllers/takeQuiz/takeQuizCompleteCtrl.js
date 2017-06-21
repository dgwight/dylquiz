/**
 * Created by DylanWight on 6/20/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("TakeQuizCompleteCtrl", function ($routeParams, $location, QuizService,
                                                      QuestionService, RecordService) {
            const vm = this;
            vm.qid = $routeParams["qid"];

            function init() {
                QuizService.findById(vm.qid)
                    .then(function (quiz) {
                        vm.quiz = quiz;
                    }).catch(function (error) {
                        console.log(error);
                    });

                RecordService.findByQuizId(vm.qid)
                    .then(function (records) {
                        vm.record = records[0];
                        return RecordService.getResult(vm.record);
                    }).then((result) => {
                        vm.result = result;
                    }).catch((error) => {
                        console.log(error);
                    });
            }

            init();
        });
})();