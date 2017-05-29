/**
 * Created by DylanWight on 5/29/17.
 */
(function () {
    angular
        .module("DylQuiz")
        .factory("CommonService", function () {

        var objects = [];

        return {
            "setObjects": setObjects,
            "listAll": listAll,
            "create": create,
            "filter": filter,
            "findById": findById,
            "update": update,
            "remove": remove
        };

        function setObjects(newObjects) {
            objects = newObjects;
        }

        function listAll() {
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
            console.log("update", object);
            console.log("update", objects.length);

            for (var i = 0; i < objects.length; i++) {
                if (objects[i]._id === id) {
                    objects[i] = object;
                    console.log("update", objects.length);
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
    });
})();
