/**
 * Created by DylanWight on 6/20/17.
 */
const mongoose = require("mongoose");
const CommonService = require('./CommonService');
const QuizService = require('./QuizService')();
const QuestionService = require('./QuestionService')();
const AnswerService = require('./AnswerService')();
const ResultService = require('./ResultService')();


function RecordService () {
    const RecordSchema = require("../schemas/recordSchema");
    const RecordModel = mongoose.model("Record", RecordSchema);
    const RecordService = new CommonService(RecordModel);
    RecordService.getNextQuestion = getNextQuestion;
    RecordService.answerQuestion = answerQuestion;
    RecordService.getResult = getResult;

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

    function answerQuestion(id, answerId) {
        console.log("answerQuestion", answerId);
        return AnswerService.findById(answerId).then((answer) => {
            this.answer = answer;
            return RecordService.add(id, answer._question, "questions");
        }).then((record) => {
            return RecordService.add(id, this.answer._id, "answers");
        }).then((record) => {
            if (!record) return;
            var update = {};
            update['$inc'] = {};
            for (var i = 0; i < this.answer.results.length; i++) {
                update['$inc']["scores." + this.answer.results[i]] = this.answer.weight;
            }
            return RecordService.model.findByIdAndUpdate(id, update, {strict: false, upsert: true, new: true});
        })
    }

    function getResult(id) {
        return RecordService.findById(id).then((record) => {
            var highestScore = 0;
            var highestResult;
            for (result in record.scores) {
                if (highestScore <= record.scores[result]) {
                    highestScore = record.scores[result];
                    highestResult = result;
                }
             }
            return ResultService.findById(highestResult);
        })
    }
}

module.exports = RecordService;