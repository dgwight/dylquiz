/**
 * Created by DylanWight on 6/20/17.
 */
const CommonRouter = require('./commonRouter');

function QuestionRouter(app) {
    const QuestionService = require("../services/QuestionService")();
    const QuestionRouter = new CommonRouter(app, QuestionService, "question");
    app.get('/api/nextQuestion/:rid' , nextQuestion);

    function nextQuestion(req, res) {
        console.log(req.url, req.params);
        console.log(QuestionService);
        QuestionService.getNextQuestion(req.params.rid)
            .then((err, doc) => QuestionRouter.respond(err, doc, res));
    }
}

module.exports = QuestionRouter;