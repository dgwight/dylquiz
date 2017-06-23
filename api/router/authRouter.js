/**
 * Created by DylanWight on 6/22/17.
 */
const CommonRouter = require('./commonRouter');

function AuthRouter(app) {

    const passport = require('passport');
    const bcrypt = require("bcrypt-nodejs");
    const FacebookStrategy = require('passport-facebook').Strategy;
    const LocalStrategy = require('passport-local').Strategy;
    const AuthService = require("../services/AuthService")();
    const AuthRouter = new CommonRouter(app, AuthService, "auth");
    const facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new LocalStrategy(localStrategy));

    app.post  ('/api/login', passport.authenticate('local'), login);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect:"/assignment/#/login",
            failureRedirect:"/assignment/#/login"
        }));
    app.post('/api/logout', logout);
    app.post ('/api/register', register);
    app.get ('/api/loggedin', loggedin);

    function localStrategy(username, password, done) {
        console.log("localStrategy");
        AuthService
            .find({username: username})
            .then(function(auths) {
                    if(auths[0] && bcrypt.compareSync(password, auths[0].password)) {
                        return done(null, auths[0]);
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
        AuthService
            .findByFacebookId(profile.id)
            .then(function(auth) {
                    if(auth) {
                        return done(null, auth);
                    } else {
                        const auth = {facebook: {
                            id: profile.id,
                            token: token
                        }};
                        console.log(auth);
                        AuthModel
                            .create(auth)
                            .then(function(auth) {
                                console.log("auth created");
                                return done(null, auth);
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
        var auth = req.auth;
        res.json(auth);
    }

    function logout(req, res) {
        console.log("logout");
        req.logOut();
        res.sendStatus(200);
    }

    function register (req, res) {
        var auth = req.body;
        auth.password = bcrypt.hashSync(auth.password);
        AuthService
            .create(auth)
            .then(function(auth){
                    if(auth) {
                        req.login(auth, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(auth);
                            }
                        });
                    }
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.auth : '0');
    }

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        AuthService
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

module.exports = AuthRouter;

