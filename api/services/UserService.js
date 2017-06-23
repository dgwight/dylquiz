/**
 * Created by DylanWight on 6/22/17.
 */
const mongoose = require("mongoose");
const CommonService = require('./CommonService');

function UserService () {
    const UserSchema = require("../schemas/userSchema");
    const UserModel = mongoose.model("User", UserSchema);
    const UserService = new CommonService(UserModel);
    UserService.findByFacebookId = findByFacebookId;

    return UserService;

    function findByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }
}

module.exports = UserService;