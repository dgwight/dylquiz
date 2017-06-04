/**
 * Created by DylanWight on 6/4/17.
 */
var mongoose = require("mongoose");

var QuizSchema = mongoose.Schema({
    name: String,
    title: String,
    dateCreated: {type: Date, default: Date.now}
});

var QuizModel = mongoose.model("QuizModel", QuizSchema);

module.exports = QuizModel;