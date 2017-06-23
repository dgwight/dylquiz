/**
 * Created by DylanWight on 6/4/17.
 */
function CommonRouter(app, Service, routeName) {

    app.get('/api/' + routeName, find);
    app.get('/api/' + routeName + '/:id', findById);
    app.post('/api/' + routeName, create);
    app.put('/api/' + routeName + '/:id', update);
    app.delete('/api/' + routeName + '/:id', remove);

    const api = {
        "respond": respond
    };

    return api;

    function find(req, res) {
        console.log(req.url, req.query);
        Service.find(req.query).then((err, doc) => respond(err, doc, res));
    }

    function findById(req, res) {
        console.log(req.url, req.params);
        Service.findById(req.params.id).then((err, doc) => respond(err, doc, res));
    }

    function create(req, res) {
        var object = req.body;
        object._user = req.isAuthenticated() ? req.user._id : "";
        console.log(req.url, object);
        Service.create(req.body).then((err, doc) => respond(err, doc, res));
    }

    function update(req, res) {
        console.log(req.url, req.body);
        Service.update(req.params.id, req.body).then((err, doc) => respond(err, doc, res));
    }

    function remove(req, res) {
        console.log(req.url, req.body);
        Service.remove(req.params.id).then((err, doc) => respond(err, doc, res));
    }

    function respond(err, doc, res) {
        if (err)
            res.send(err);
        else if (doc)
            res.json(doc);
        else
            res.sendStatus(404);
    }
}

module.exports = CommonRouter;