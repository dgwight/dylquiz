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

                    const algoliaId = "V5A9XWTQ4C";
                    const algoliaKey = "2deca3f7fbaccbd2657a2d06c6252c1b";

                    const client = algolia.Client(algoliaId, algoliaKey);
                    const quizzes = client.initIndex('quizzes');
                    const actors = client.initIndex('getstarted_actors');

                    UserService
                        .isLoggedIn()
                        .success((user) => {
                            $scope.loggedIn = user !== '0';
                        });

                    $scope.getDatasets = function () {
                        return {
                            debug: true, templates: {
                                dropdownMenu: '<div class="aa-dataset-player"></div>' +
                                '<div class="aa-dataset-team"></div>'
                            }
                        }, [{
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
                            source: algolia.sources.hits(actors, {hitsPerPage: 8}),
                            displayKey: 'my_attribute',
                            templates: {
                                header: '<div class="aa-suggestions-category">Actors</div>',
                                suggestion: function (suggestion) {
                                    return '<div><span>' + suggestion._highlightResult.name.value + '</span><</div>';
                                },
                                empty: '<div class="aa-empty">No matching users</div>'
                            }
                        }];
                    };

                    $scope.$on('autocomplete:selected', function (event, suggestion, dataset) {
                        console.log(suggestion.name, dataset);
                        $location.url("/takeQuiz/" + suggestion._id);
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

