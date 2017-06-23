/**
 * Created by DylanWight on 6/22/17.
 */
const CommonRouter = require('./commonRouter');

function UserRouter(app) {

    const passport = require('passport');
    const bcrypt = require("bcrypt-nodejs");
    const FacebookStrategy = require('passport-facebook').Strategy;
    const LocalStrategy = require('passport-local').Strategy;
    const UserService = require("../services/UserService")();
    const UserRouter = new CommonRouter(app, UserService, "user");
    const facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new LocalStrategy(localStrategy));

    app.post('/api/user/:uid/send-buddy-request', sendBuddyRequest);
    app.post  ('/api/login', passport.authenticate('local'), login);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect:"/#/home",
            failureRedirect:"/#/login"
        }));
    app.post('/api/logout', logout);
    app.post ('/api/register', register);
    app.get ('/api/loggedin', loggedin);

    function sendBuddyRequest(req, res) {
        console.log("sendBuddyRequest", req.url, req.user);
        if (!req.user) {
            res.sendStatus(403);
            return;
        }

        UserService.sendBuddyRequest(req.params.uid, req.user._id)
            .then((err, doc) => UserRouter.respond(err, doc, res));
    }

    function localStrategy(username, password, done) {
        console.log("localStrategy");
        UserService
            .find({username: username})
            .then(function(users) {
                    if(users[0] && bcrypt.compareSync(password, users[0].password)) {
                        return done(null, users[0]);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        UserService
            .findByFacebookId(profile.id)
            .then(function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        console.log(profile);
                        const user = {facebook: {
                            id: profile.id,
                            token: token
                        }};
                        console.log(user);
                        UserService
                            .create(user)
                            .then(function(user) {
                                console.log("user created");
                                return done(null, user);
                            }).catch(function(error) {
                                console.log(error);
                                return done(error, false);
                            });
                    }
                },
                function(err) {
                    if (err) { return done(err, false); }
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        console.log("logout");
        req.logOut();
        res.sendStatus(200);
    }

    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        UserService
            .create(user)
            .then((user) => {
                if(user) {
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            })
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        UserService
            .findById(user._id)
            .then(
                function(user) {
                    done(null, user);
                },
                function(err) {
                    done(err, null);
                }
            );
    }
}

module.exports = UserRouter;

