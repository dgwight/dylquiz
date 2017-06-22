/**
 * Created by DylanWight on 6/22/17.
 */
const CommonRouter = require('./commonRouter');

function AuthRouter(app) {
    const AuthService = require("../services/AuthService")();
    const AuthRouter = new CommonRouter(app, AuthService, "auth");
}

module.exports = AuthRouter;