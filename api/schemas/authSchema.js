/**
 * Created by DylanWight on 6/22/17.
 */
const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    facebook: {
        id:    String,
        token: String
    },
    _user: String,
    dateCreated: {type: Date, default: Date.now}
});

module.exports = AuthSchema;