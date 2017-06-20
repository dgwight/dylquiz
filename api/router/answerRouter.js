/**
 * Created by DylanWight on 6/20/17.
 */
const CommonRouter = require('./commonRouter');

function AnswerRouter(app, Service) {
    this.prototype = new CommonRouter(app, Service, "answer");
}

module.exports = AnswerRouter;