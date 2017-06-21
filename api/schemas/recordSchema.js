/**
 * Created by DylanWight on 6/20/17.
 */
const mongoose = require("mongoose");

const RecordSchema = mongoose.Schema({
    questions: [String],
    answers: [String],
    _quiz: String,
    _user: String,
    dateCreated: {type: Date, default: Date.now}
});

module.exports = RecordSchema;