/**
 * Created by DylanWight on 6/20/17.
 */
const CommonRouter = require('./commonRouter');

function RecordRouter(app, Service) {
    this.prototype = new CommonRouter(app, Service, "record");
}

module.exports = RecordRouter;