/**
 * Created by DylanWight on 6/4/17.
 */
const CommonRouter = require('./commonRouter');

function QuizRouter(app) {
    const QuizService = require("../services/QuizService")();
    this.prototype = new CommonRouter(app, QuizService, "quiz");
}

module.exports = QuizRouter;