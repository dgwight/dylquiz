/**
 * Created by DylanWight on 6/26/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("AdminCtrl", function ($rootScope, $routeParams, QuizService, UserService) {
            const vm = this;
            vm.currentUser = $rootScope.currentUser;
            vm.uid = $routeParams.uid;
            vm.deleteQuiz = deleteQuiz;
            vm.deleteUser = deleteUser;

            function init() {
                console.log("init");

                UserService.find({}).then((users) => {
                    vm.users = users;
                });

                QuizService.find({}).then((quizzes) => {
                    vm.quizzes = quizzes;
                });
            }

            init();

            function deleteQuiz(quiz) {
                if (confirm('Are you sure you want to delete this quiz? ' + quiz.name)) {
                    QuizService
                        .remove(quiz._id).then((quiz) => {
                        return QuizService.find({});
                    }).then((quizzes) => {
                        vm.quizzes = quizzes;
                    });
                }
            }

            function deleteUser(user) {
                if (confirm('Are you sure you want to delete this user? ' + user.username)) {
                    UserService
                        .remove(user._id)
                        .then((user) => {
                            return UserService.find({});
                        }).then((users) => {
                            vm.users = users;
                        });
                }
            }
        });
})();