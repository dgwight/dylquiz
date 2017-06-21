/**
 * Created by DylanWight on 6/20/17.
 */
const CommonRouter = require('./commonRouter');

function RecordRouter(app) {
    const RecordService = require("../services/RecordService")();
    const RecordRouter = new CommonRouter(app, RecordService, "record");
    app.get('/api/record/:rid/next-question', getNextQuestion);
    app.get('/api/record/:rid/result', getResult);
    app.post('/api/record/:rid/answer-question', answerQuestion);

    function getNextQuestion(req, res) {
        console.log(req.url, req.params);
        RecordService.getNextQuestion(req.params.rid)
            .then((err, doc) => RecordRouter.respond(err, doc, res));
    }

    function answerQuestion(req, res) {
        console.log(req.url, req.params, req.body);
        RecordService.answerQuestion(req.params.rid, req.body.answerId)
            .then((err, doc) => RecordRouter.respond(err, doc, res));
    }

    function getResult(req, res) {
        console.log(req.url, req.params, req.body);
        RecordService.getResult(req.params.rid, req.body.answerId)
            .then((err, doc) => RecordRouter.respond(err, doc, res));
    }


}

module.exports = RecordRouter;