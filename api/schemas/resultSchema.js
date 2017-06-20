/**
 * Created by DylanWight on 6/4/17.
 */
const mongoose = require("mongoose");

const ResultSchema = mongoose.Schema({
    name: String,
    imageUrl: String,
    description: String,
    _quiz: String,
    dateCreated: {type: Date, default: Date.now}
});

module.exports = ResultSchema;