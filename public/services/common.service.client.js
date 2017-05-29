/**
 * Created by DylanWight on 5/29/17.
 */
/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("DylQuiz")
        .factory("CommonService", CommonService);

    function CommonService() {

        var objects = [];

        var api = {
            "setObjects": setObjects,
            "listAll": listAll,
            "create": create,
            "filter": filter,
            "findById": findById,
            "update": update,
            "remove": remove
        };
        return api;

        function setObjects(newObjects) {
            objects = newObjects;
        }

        function listAll() {
            console.log("listAll", objects.length);
            return objects;
        }

        function create(object) {
            object._id = object._id ? object._id : new Date().getTime() + "";
            objects.push(object);
            return object;
        }

        function filter(filterer) {
           var filteredObjects = [];
            for (var i = 0; i < objects.length; i++) {
                if (filterer(objects[i]))
                    filteredObjects.push(objects[i]);
            }
            return filteredObjects;
        }

        function findById(id) {
            for (var i = 0; i < objects.length; i++) {
                if (objects[i]._id === id)
                    return objects[i];
            }
            return null;
        }

        function update(id, object) {
            for (var i = 0; i < objects.length; i++) {
                if (objects[i]._id === id) {
                    objects[i] = object;
                    return objects[i];
                }
            }
        }

        function remove(id) {
            for (var i = 0; i < objects.length; i++) {
                if (objects[i]._id === id) {
                    objects.splice(i, 1);
                }
            }
        }
    }
})();
