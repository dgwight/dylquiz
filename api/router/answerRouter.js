/**
 * Created by DylanWight on 6/20/17.
 */
const CommonRouter = require('./commonRouter');

function AnswerRouter(app) {
    const AnswerService = require("../services/AnswerService")();
    this.prototype = new CommonRouter(app, AnswerService, "answer");
}

module.exports = AnswerRouter;