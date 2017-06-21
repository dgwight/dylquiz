/**
 * Created by DylanWight on 6/20/17.
 */
const mongoose = require("mongoose");
const CommonService = require('./CommonService');
const QuizService = require('./QuizService')();
const QuestionService = require('./QuestionService')();

function RecordService () {
    const RecordSchema = require("../schemas/recordSchema");
    const RecordModel = mongoose.model("Record", RecordSchema);
    const RecordService = new CommonService(RecordModel);
    RecordService.getNextQuestion = getNextQuestion;

    return RecordService;

    function getNextQuestion(id) {
        console.log("getNextQuestion", id);
        return RecordService.findById(id).then((record) => {
            this.record = record;
            return QuizService.findById(record._quiz);
        }).then((quiz) => {
            return QuestionService.findByQuizId(quiz._id);
        }).then((questions) => {
            const unansweredQuestions = questions.filter((question) => {
                return this.record.questions.indexOf(question._id) === -1;
            });
            return unansweredQuestions[0];
        })
    }
}

module.exports = RecordService;