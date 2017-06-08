/**
 * Created by DylanWight on 6/4/17.
 */
var CommonRouter = require('./common.router.server');

function QuizRouter (app, Service) {
    this.prototype = new CommonRouter(app, Service, "createQuiz");
}

module.exports = QuizRouter;