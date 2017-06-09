/**
 * Created by DylanWight on 6/4/17.
 */
const CommonRouter = require('./commonRouter');

function QuizRouter (app, Service) {
    this.prototype = new CommonRouter(app, Service, "quiz");
}

module.exports = QuizRouter;