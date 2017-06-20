/**
 * Created by DylanWight on 6/19/17.
 */
const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
    text: String,
    _quiz: String,
    dateCreated: {type: Date, default: Date.now}
});

module.exports = QuestionSchema;