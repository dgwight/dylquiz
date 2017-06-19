/**
 * Created by DylanWight on 6/4/17.
 */
const mongoose = require("mongoose");

const QuizSchema = mongoose.Schema({
    name: String,
    imageUrl: String,
    description: String,
    dateCreated: {type: Date, default: Date.now}
});

module.exports = QuizSchema;