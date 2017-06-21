/**
 * Created by DylanWight on 6/20/17.
 */
const mongoose = require("mongoose");
const CommonService = require('./CommonService');

function QuestionService () {
    const QuestionSchema = require("../schemas/questionSchema");
    const QuestionModel = mongoose.model("Question", QuestionSchema);
    const QuestionService = new CommonService(QuestionModel);
    QuestionService.findByQuizId = findByQuizId;
    return QuestionService;

    function findByQuizId(quizId) {
        return QuestionService.find({"_quiz": quizId});
    }
}

module.exports = QuestionService;