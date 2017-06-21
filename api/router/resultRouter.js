/**
 * Created by DylanWight on 6/4/17.
 */
const CommonRouter = require('./commonRouter');

function ResultRouter(app) {
    const ResultService = require("../services/ResultService")();
    this.prototype = new CommonRouter(app, ResultService, "result");
}

module.exports = ResultRouter;