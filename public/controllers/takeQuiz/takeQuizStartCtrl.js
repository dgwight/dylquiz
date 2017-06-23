/**
 * Created by DylanWight on 6/20/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("TakeQuizStartCtrl", function ($rootScope, $routeParams, $location,
                                                   QuizService, QuestionService, RecordService) {
            const vm = this;
            vm.user = $rootScope.currentUser;
            vm.qid = $routeParams["qid"];
            vm.startQuiz = startQuiz;

            function init() {
                QuizService.findById(vm.qid)
                    .then(function (quiz) {
                        vm.quiz = quiz;
                    }).catch(function (error) {
                        console.log(error);
                    });
            }

            init();

            function startQuiz(quiz) {
                getRecord(quiz).then((record) => {
                        console.log(record);
                        $location.url("/takeQuiz/" + vm.qid + "/question/");
                    }).catch(function (error) {
                        console.log(error);
                    })
            }

            function getRecord(quiz) {
                if (!vm.user) {
                    return createRecord(quiz);
                }

                return RecordService.findByQuiz(vm.qid, vm.user._id)
                    .then((records) => {
                        if (records.length > 0) {
                            $rootScope.currentRecord = records[0];
                            return records[0];
                        } else {
                            return createRecord(quiz);
                        }
                    })
            }

            function createRecord(quiz) {
                return RecordService.createForQuiz(quiz)
                    .then(function (record) {
                        $rootScope.currentRecord = record;
                        return record;
                    })
            }
        });
})();