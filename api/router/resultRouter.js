/**
 * Created by DylanWight on 6/4/17.
 */
const CommonRouter = require('./commonRouter');

function ResultRouter(app) {
    const ResultService = require("../services/ResultService")();
    const ResultRouter = new CommonRouter(app, ResultService, "result");
}

module.exports = ResultRouter;