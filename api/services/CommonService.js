/**
 * Created by DylanWight on 5/31/17.
 */
function CommonService(Model) {

    const api = {
        "model": Model,
        "find": find,
        "findById": findById,
        "create": create,
        "update": update,
        "remove": remove,
        "add": add
    };
    return api;

    function create(object) {
        console.log("create", Model.modelName, object);
        return Model.create(object);
    }

    function find(query) {
        console.log("findByParams", Model.modelName, query);
        return Model.find(query);
    }

    function findById(id) {
        console.log("findById", Model.modelName, id);
        return Model.findById(id);
    }

    function update(id, object) {
        console.log("update", Model.modelName, id, object);
        return Model.findByIdAndUpdate(id, object, {new: true});
    }

    function remove(id) {
        console.log("remove", Model.modelName, id);
        return Model.findByIdAndRemove(id);
    }

    function add(id, object, fieldName) {
        console.log("add", Model.modelName, id, object, fieldName);
        return Model.findById(id).then((model) => {
            if (model[fieldName].indexOf(object) === -1) {
                var push = {};
                push[fieldName] = object;
                return Model.findByIdAndUpdate(id, {$push: push}, {safe: true, upsert: true});
            }
        });
    }
}

module.exports = CommonService;