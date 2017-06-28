/**
 * Created by DylanWight on 6/8/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .directive('dqHeader', function () {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: "directives/header/dqHeader.html",
                controller: function($location, $scope, algolia, UserService) {

                    const algoliaId = "RZG1CU6ZG0"; // "V5A9XWTQ4C";
                    const algoliaKey = "cc7fb86002824e9939b0046b128bfd0a"; //"2deca3f7fbaccbd2657a2d06c6252c1b";

                    const client = algolia.Client(algoliaId, algoliaKey);
                    const quizzes = client.initIndex('quizzes');
                    const users = client.initIndex('users');

                    UserService
                        .isLoggedIn()
                        .then((user) => {
                            $scope.loggedIn = user !== '0';
                            $scope.isAdmin = $scope.loggedIn && user.admin;
                        });

                    $scope.getDatasets = function () {
                        return [{
                            source: algolia.sources.hits(quizzes, {hitsPerPage: 3}),
                            displayKey: 'my_attribute',
                            templates: {
                                header: '<div class="aa-suggestions-category">Quizzes</div>',
                                suggestion: function (suggestion) {
                                    return '<img src="' + suggestion.imageUrl + '">' + '<div><span>' +
                                        suggestion._highlightResult.name.value + '</span><span>' +
                                        suggestion._highlightResult.description.value + '</span></div>';
                                },
                                empty: '<div class="aa-empty">No matching quizzes</div>'
                            }
                        }, {
                            source: algolia.sources.hits(users, {hitsPerPage: 8}),
                            displayKey: 'my_attribute',
                            templates: {
                                header: '<div class="aa-suggestions-category">Users</div>',
                                suggestion: function (suggestion) {
                                    return '<div><span>' + suggestion._highlightResult.username.value + '</span></div>';
                                },
                                empty: '<div class="aa-empty">No matching users</div>',
                                footer: '<div class="autocomplete-footer"> <div class="autocomplete-footer-branding pull-right align-bottom">powered by <img width="64px" class="algolia-logo" src="https://www.algolia.com/assets/algolia128x40.png" alt="Algolia"/></div></div>'
                            }
                    }];
                    };

                    $scope.$on('autocomplete:selected', function (event, suggestion, dataset, more) {
                        console.log(suggestion);
                        if (suggestion.username) {
                            $location.url("/user/" + suggestion._id);
                        } else {
                            $location.url("/takeQuiz/" + suggestion._id);
                        }
                    });

                    $scope.logout = function () {
                        UserService.logout().then((auth) => {
                            console.log(auth);
                            $location.url("/login");
                        })
                    };
                }
            }
        })
})();

