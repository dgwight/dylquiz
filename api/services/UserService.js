/**
 * Created by DylanWight on 6/22/17.
 */
const mongoose = require("mongoose");
const CommonService = require('./CommonService');

function UserService () {
    const algoliasearch = require("algoliasearch");
    const client = algoliasearch(processs.env.ALGOLIA_APP_ID, processs.env.ALGOLIA__ADMIN_KEY);
    const index = client.initIndex("users");

    const UserSchema = require("../schemas/userSchema");
    const UserModel = mongoose.model("User", UserSchema);
    const UserService = new CommonService(UserModel);
    UserService.findByFacebookId = findByFacebookId;
    UserService.sendBuddyRequest = sendBuddyRequest;
    UserModel.create = create;
    UserModel.update = update;

    return UserService;

    function findByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function sendBuddyRequest(userId, requesterId) {
        return UserService.add(userId, requesterId, "buddy_requests");
    }

    function create(user) {
        return UserModel.create(user).then((user) => {
            const algoliaUser = {
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };
            index.addObjects([algoliaUser]);
        });
    }

    function update(user) {
        return UserModel.create(user).then((user) => {
            const algoliaUser = {
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };
            index.saveObject(algoliaUser, function(err, content) {
                console.log(err, content);
            });
        });
    }
}

module.exports = UserService;