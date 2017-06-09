/**
 * Created by DylanWight on 6/4/17.
 */
var CommonService = require('./CommonService');

function QuizService () {
    const QuizModel = require("../models/quizModel");
    this.prototype = new CommonService(QuizModel);
    return this.prototype;
}

module.exports = QuizService;