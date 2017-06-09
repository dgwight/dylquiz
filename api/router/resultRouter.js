/**
 * Created by DylanWight on 6/4/17.
 */
const CommonRouter = require('./commonRouter');

function ResultRouter (app, Service) {
    this.prototype = new CommonRouter(app, Service, "result");
}

module.exports = ResultRouter;