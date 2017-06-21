/**
 * Created by DylanWight on 6/20/17.
 */
const CommonRouter = require('./commonRouter');

function RecordRouter(app) {
    const RecordService = require("../services/RecordService")();
    this.prototype = new CommonRouter(app, RecordService, "record");
}

module.exports = RecordRouter;