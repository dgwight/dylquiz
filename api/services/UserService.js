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
    UserService.follow = follow;
    UserService.unfollow = unfollow;
    UserService.getWall = getWall;
    UserService.create = create;
    UserService.update = update;
    UserService.remove = remove;

    return UserService;

    function findByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function follow(userId, followId) {
        return UserService.add(userId, followId, "following");
    }

    function unfollow(userId, followId) {
        console.log("unfollow", userId, followId);
        return UserService.removeFrom(userId, followId, "following");
    }

    function getWall(userId) {
        console.log("getWall", userId);
        return UserModel.findById(userId).then((user) => {
            return RecordService.model.find({
                '_user': { $in: user.following }
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