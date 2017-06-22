/**
 * Created by DylanWight on 6/22/17.
 */
const mongoose = require("mongoose");
const CommonService = require('./CommonService');

function AuthService () {
    const AuthSchema = require("../schemas/authSchema");
    const AuthModel = mongoose.model("Auth", AuthSchema);
    const AuthService = new CommonService(AuthModel);
    AuthService.findByFacebookId = findByFacebookId;

    return AuthService;


    function findByFacebookId(facebookId) {
        return Model.findOne({'facebook.id': facebookId});
    }
}

module.exports = AuthService;