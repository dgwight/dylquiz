/**
 * Created by DylanWight on 6/20/17.
 */
const CommonRouter = require('./commonRouter');

function QuestionRouter(app) {
    const QuestionService = require("../services/QuestionService")();
    const QuestionRouter = new CommonRouter(app, QuestionService, "question");
}

module.exports = QuestionRouter;