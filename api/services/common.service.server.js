/**
 * Created by DylanWight on 5/31/17.
 */
var _ = require('lodash');
function CommonService(app, model, objectName, objects) {

    app.get('/api/' + objectName, findByParams);
    app.post('/api/' + objectName, create);
    app.get('/api/' + objectName + '/:id', findById);
    app.put('/api/' + objectName + '/:id', update);
    app.delete('/api/' + objectName + '/:id', remove);

    var api = {
        "getById": getById,
        "objects": objects,
        "create": create,
        "findByParams": findByParams,
        "findOneByParams": findOneByParams,
        "findAllByParams": findAllByParams,
        "findById": findById,
        "update": update,
        "remove": remove
    };
    return api;

    function getById(id) {
        for (var i = 0; i < objects.length; i++) {
            if (objects[i]._id === id) {
                return objects[i];
            }
        }
    }

    function create(req, res) {
        console.log("create", objectName);
        console.log(req.body);
        var newObject = req.body;

        // var frodo = new model(newObject);
        // res.json(frodo.toJSON());

        model.create(newObject, function(error, doc) {
            console.log(error);
            console.log(doc);
            res.json(doc);
        });
    }

    function findByParams(req, res) {
        console.log(req.query, "findByParams");
        if (req.query.findOne) {
            findOneByParams(req, res);
        } else {
            findAllByParams(req, res);
        }
    }

    function findOneByParams(req, res) {
        console.log("findOneByParams", objectName, req.query);
        model.findOne(_.omit(req.query,"findOne"), function(err, object) {
            if (err) {
                res.send(err);
            } else {
                res.json(object);
            }
        });
    }

    function findAllByParams(req, res) {
        console.log("findAllByParams", objectName, req.query);
        model.find(req.query, function(err, objects) {
            if (err) {
                res.send(err);
            } else {
                res.json(objects);
            }
        });
    }

    function findById(req, res) {
        console.log("update", objectName, req.params);
        model.findById(req.params.id, function(err, post) {
            if (err)
                res.send(err);
            res.json(post);
        });
    }

    function update(req, res) {
        console.log("update", objectName);
        console.log(req.body);

        var id = req.params.id;
        var newUser = req.body;
        newUser._id = id;

        for (var i = 0; i < objects.length; i++) {
            if (objects[i]._id === id) {
                objects[i] = newUser;
                res.json(objects[i]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function remove(req, res) {
        console.log("delete", objectName, req.params.id);
        var id = req.params.id;

        for (var i = 0; i < objects.length; i++) {
            if (objects[i]._id === id) {
                var deletedUser = objects.splice(i, 1)[0];
                res.json(deletedUser);
                return;
            }
        }
        res.sendStatus(404);
    }
}

module.exports = CommonService;