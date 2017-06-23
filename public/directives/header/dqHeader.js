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
                controller: function($location, $scope, algolia, AuthService) {

                    const client = algolia.Client('V5A9XWTQ4C', '2deca3f7fbaccbd2657a2d06c6252c1b');
                    const index = client.initIndex('getstarted_actors');

                    AuthService
                        .isLoggedIn()
                        .success((user) => {
                            $scope.loggedIn = user !== '0';
                        });

                    $scope.getDatasets = function () {
                        return {
                            source: algolia.sources.hits(index, {hitsPerPage: 5}),
                            displayKey: 'my_attribute',
                            templates: {
                                suggestion: function (suggestion) {
                                    return suggestion._highlightResult.name.value;
                                }
                            }
                        };
                    };

                    $scope.$on('autocomplete:selected', function (event, suggestion, dataset) {
                        console.log(suggestion, dataset);
                    });

                    $scope.logout = function() {
                        AuthService.logout().then((auth) => {
                            console.log(auth);
                            $location.url("/login");
                        })
                    };
                }
            }
        })
})();

