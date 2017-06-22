/**
 * Created by DylanWight on 6/22/17.
 */
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    dateCreated: {type: Date, default: Date.now}
});

module.exports = UserSchema;