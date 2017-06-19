/**
 * Created by DylanWight on 6/8/17.
 */
const mongoose = require("mongoose");
const CommonService = require('./CommonService');

function ResultService () {
    const ResultSchema = require("../schemas/resultSchema");
    const ResultModel = mongoose.model("Result", ResultSchema);
    const ResultService = new CommonService(ResultModel);
    return ResultService;
}

module.exports = ResultService;