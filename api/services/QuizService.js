/**
 * Created by DylanWight on 6/4/17.
 */
const mongoose = require("mongoose");
const CommonService = require('./CommonService');

function QuizService () {
    const QuizSchema = require("../schemas/quizSchema");
    const QuizModel = mongoose.model("Quiz", QuizSchema);

    const QuizService = new CommonService(QuizModel);
    return QuizService;
}

module.exports = QuizService;