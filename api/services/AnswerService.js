/**
 * Created by DylanWight on 6/20/17.
 */
const mongoose = require("mongoose");
const CommonService = require('./CommonService');

function AnswerService () {
    const AnswerSchema = require("../schemas/answerSchema");
    const AnswerModel = mongoose.model("Answer", AnswerSchema);

    const AnswerService = new CommonService(AnswerModel);
    return AnswerService;
}

module.exports = AnswerService;