/**
 * Created by DylanWight on 6/19/17.
 */
const mongoose = require("mongoose");
const ResultSchema = require("./resultSchema");

const AnswerSchema = mongoose.Schema({
    text: String,
    weight: {type: Number, default: 1},
    _question: String,
    _quiz: String,
    results: [ResultSchema],
    dateCreated: {type: Date, default: Date.now}
});

module.exports = AnswerSchema;