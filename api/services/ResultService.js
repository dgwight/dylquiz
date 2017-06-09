/**
 * Created by DylanWight on 6/8/17.
 */
const CommonService = require('./CommonService');

function ResultService () {
    const ResultModel = require("../models/resultModel");
    this.prototype = new CommonService(ResultModel);
    return this.prototype;
}

module.exports = ResultService;