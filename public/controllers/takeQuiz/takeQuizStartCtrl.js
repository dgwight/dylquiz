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
                console.log(vm.user, $rootScope.currentUser);
                RecordService.findByQuiz(vm.qid, $rootScope.currentUser._id)
                    .then((records) => {
                        if (records.length > 0) {
                            console.log("had record", records);
                            return records[0];
                        } else {
                            console.log("create record");
                            return createRecord(quiz);
                        }
                    }).then((record) => {
                        console.log(record);
                        $location.url("/takeQuiz/" + vm.qid + "/question/");
                    }).catch(function (error) {
                        console.log(error);
                    })
            }

            function createRecord(quiz) {
                return RecordService.createForQuiz(quiz)
                    .then(function (record) {
                        return record;
                    })
            }
        });
})();