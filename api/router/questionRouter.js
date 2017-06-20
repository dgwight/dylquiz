/**
 * Created by DylanWight on 6/20/17.
 */
const CommonRouter = require('./commonRouter');

function QuestionRouter(app, Service) {
    this.prototype = new CommonRouter(app, Service, "question");
}

module.exports = QuestionRouter;