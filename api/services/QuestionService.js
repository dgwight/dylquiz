/**
 * Created by DylanWight on 6/20/17.
 */
const mongoose = require("mongoose");
const CommonService = require('./CommonService');

function QuestionService () {
    const QuestionSchema = require("../schemas/questionSchema");
    const QuestionModel = mongoose.model("Question", QuestionSchema);

    const QuestionService = new CommonService(QuestionModel);
    return QuestionService;
}

module.exports = QuestionService;