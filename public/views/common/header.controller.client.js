/**
 * Created by DylanWight on 6/7/17.
 */

(function () {
    angular
        .module("DylQuiz")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, algolia) {

        var client = algolia.Client('YourApplicationID', 'YourSearchOnlyAPIKey');
        var index = client.initIndex('YourIndex');

        $scope.getDatasets = function () {
            return {
                source: algolia.sources.hits(index, {hitsPerPage: 5}),
                displayKey: 'my_attribute',
                templates: {
                    suggestion: function (suggestion) {
                        return suggestion._highlightResult.my_attribute.value;
                    }
                }
            };
        };

        $scope.$on('autocomplete:selected', function (event, suggestion, dataset) {
            console.log(suggestion, dataset);
        });
    }
});