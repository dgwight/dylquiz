/**
 * Created by DylanWight on 6/22/17.
 */
const CommonRouter = require('./commonRouter');

function UserRouter(app) {
    const UserService = require("../services/UserService")();
    const UserRouter = new CommonRouter(app, UserService, "user");
}

module.exports = UserRouter;