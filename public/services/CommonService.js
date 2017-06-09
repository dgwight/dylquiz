/**
 * Created by DylanWight on 5/31/17.
 */
(function ($http) {

    angular
        .module("dylQuizApp")
        .factory("CommonService", function ($http) {

            // return {
            //     createFor: function (objectName) {
            //         return new CommonService(objectName);
            //     }
            // };

            return CommonService;

            function CommonService(objectName) {

                var api = {
                    "name": name,
                    "create": create,
                    "findById": findById,
                    "find": find,
                    "update": update,
                    "remove": remove
                };

                return api;

                function create(object) {
                    var url = "/api/" + objectName + "/";
                    return $http.post(url, object)
                        .then(function (response) {
                            console.log(response);
                            return response.data;
                        });
                }

                function findById(id) {
                    var url = "/api/" + objectName + "/" + id;

                    console.log(url);

                    return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });
                }

                function find(params) {
                    var url = "/api/" + objectName;
                    if (params) {
                        url = url + "?" + Object.keys(params).map(function (key) {
                                return key + "=" + params[key];
                            }).join('&');
                    }

                    console.log(url);

                    return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });
                }

                function update(id, object) {
                    var url = "/api/" + objectName + "/" + id;
                    return $http.put(url, object)
                        .then(function (response) {
                            return response.data;
                        });
                }

                function remove(id) {
                    var url = "/api/" + objectName + "/" + id;
                    return $http.delete(url)
                        .then(function (response) {
                            return response.data;
                        });
                }
            }
        });
})();
