/**
 * Created by DylanWight on 6/4/17.
 */
var CommonService = require('./common.service.server');

function QuizService () {
    var QuizModel = require("../models/quiz.model.server");
    this.prototype = new CommonService(QuizModel);
    return this.prototype;
}

module.exports = QuizService;