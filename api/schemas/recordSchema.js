/**
 * Created by DylanWight on 6/20/17.
 */
const mongoose = require("mongoose");
const ResultSchema = require("./resultSchema");
const QuizSchema = require("./quizSchema");

const RecordSchema = mongoose.Schema({
    questions: [String],
    answers: [String],
    scores: {},
    _quiz: QuizSchema,
    _user: String,
    _result: ResultSchema,
    published: {type: Boolean, default: false},
    dateCreated: {type: Date, default: Date.now}
});

module.exports = RecordSchema;