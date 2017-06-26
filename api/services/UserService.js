/**
 * Created by DylanWight on 6/22/17.
 */
const mongoose = require("mongoose");
const CommonService = require('./CommonService');

function UserService () {
    const algoliasearch = require("algoliasearch");
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
    const index = client.initIndex("users");

    const UserSchema = require("../schemas/userSchema");
    const UserModel = mongoose.model("User", UserSchema);
    const UserService = new CommonService(UserModel);
    UserService.findByFacebookId = findByFacebookId;
    UserService.sendBuddyRequest = sendBuddyRequest;
    UserService.removeBuddyRequest = removeBuddyRequest;
    UserService.removeBuddy = removeBuddy;
    UserService.acceptBuddyRequest = acceptBuddyRequest;
    UserService.getBuddyRequests = getBuddyRequests;
    UserService.getBuddies = getBuddies;
    UserService.create = create;
    UserService.update = update;
    UserService.remove = remove;

    return UserService;

    function findByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function sendBuddyRequest(userId, requesterId) {
        return UserService.add(userId, requesterId, "buddy_requests");
    }

    function acceptBuddyRequest(userId, requesterId) {
        console.log("acceptBuddyRequest", userId, requesterId);
        return UserService.removeFrom(userId, requesterId, "buddy_requests").then((user) => {
            return UserService.add(requesterId, userId, "buddies");
        }).then((user) => {
            return UserService.add(userId, requesterId, "buddies");
        });
    }

    function removeBuddyRequest(userId, requesterId) {
        console.log("removeBuddyRequest", userId, requesterId);
        return UserService.removeFrom(userId, requesterId, "buddy_requests");
    }

    function removeBuddy(userId, buddyId) {
        console.log("removeBuddy", userId, buddyId);
        return UserService.removeFrom(buddyId, userId, "buddies").then(() => {
            return UserService.removeFrom(userId, buddyId, "buddies");
        });
    }

    function getBuddyRequests(userId) {
        return UserModel.findById(userId).then((user) => {
            return UserModel.find({
                '_id': { $in: user.buddy_requests }
            });
        });
    }

    function getBuddies(userId) {
        return UserModel.findById(userId).then((user) => {
            return UserModel.find({
                '_id': { $in: user.buddies }
            });
        });
    }

    function create(user) {
        console.log("createUser");
        return UserModel.create(user).then((user) => {
            this.user = user;
            const algoliaUser = {
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };
            return index.addObject(algoliaUser);
        }).then((content, err) => {
            console.log(content);
            return UserModel.findByIdAndUpdate(user._id, {algolia_id: content.objectID}, {upsert: true});
        });
    }

    function update(userId, user) {
        console.log("updateUser");
        return UserModel.findByIdAndUpdate(userId, user, {upsert: true, new: true})
            .then((user) => {
                const algoliaUser = {
                    _id: user._id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    objectID: user.algolia_id
                };
                index.saveObject(algoliaUser);
                return user;
            });
    }

    function remove(userId) {
        console.log("removeUser");

        return UserModel.findByIdAndRemove(userId)
            .then((user) => {
                if (!user)
                    return null;
                index.deleteObject(user.algolia_id);
                return user;
            });
    }
}

module.exports = UserService;