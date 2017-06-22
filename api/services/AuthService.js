/**
 * Created by DylanWight on 6/22/17.
 */
const mongoose = require("mongoose");
const CommonService = require('./CommonService');

function AuthService () {
    const AuthSchema = require("../schemas/authSchema");
    const AuthModel = mongoose.model("Auth", AuthSchema);
    const AuthService = new CommonService(AuthModel);
    return AuthService;
}

module.exports = AuthService;