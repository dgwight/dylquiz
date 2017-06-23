/**
 * Created by DylanWight on 6/4/17.
 */
const CommonRouter = require('./commonRouter');

function QuizRouter(app) {
    const QuizService = require("../services/QuizService")();
    const QuizRouter = new CommonRouter(app, QuizService, "quiz");

    app.put('/api/quiz/:qid/publish', publish);

    function publish(req, res) {
        console.log(req.url, req.params);
        QuizService.publish(req.params.qid).then((err, doc) => QuizRouter.respond(err, doc, res));
    }
}

module.exports = QuizRouter;