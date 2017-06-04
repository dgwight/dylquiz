/**
 * Created by DylanWight on 5/31/17.
 */
var _ = require('lodash');
function CommonService(app, Model, objectName, objects) {

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
        Model.findById(id, function(err, object) {
            if (err)
                return null;
            return(object);
        });
    }

    function create(req, res) {
        console.log("create", objectName);
        console.log(req.body);

        Model.create(req.body, function(error, doc) {
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
        Model.findOne(_.omit(req.query, "findOne"), function(err, object) {
            if (err) {
                res.send(err);
            } else {
                res.json(object);
            }
        });
    }

    function findAllByParams(req, res) {
        console.log("findAllByParams", objectName, req.query);
        Model.find(req.query, function(err, objects) {
            if (err) {
                res.send(err);
            } else {
                res.json(objects);
            }
        });
    }

    function findById(req, res) {
        console.log("update", objectName, req.params);
        Model.findById(req.params.id, function(err, object) {
            if (err)
                res.send(err);
            res.json(object);
        });
    }

    function update(req, res) {
        console.log("update", objectName);
        console.log(req.body);
        var id = req.params.id;
        Model.findByIdAndUpdate(id, req.body, function(err, object) {
            if (err) {
                res.send(err);
            } else {
                res.json(object);
            }
        });
    }

    function remove(req, res) {
        console.log("delete", objectName, req.params.id);
        var id = req.params.id;
        Model.findByIdAndRemove(id, function(err, object) {
            if (err) {
                res.send(err);
            } else {
                res.json(object);
            }
        });
    }
}

module.exports = CommonService;