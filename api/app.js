/**
 * Created by DylanWight on 6/4/17.
 */
module.exports = function(app) {

    var connectionString = 'mongodb://127.0.0.1:27017/dyl-quiz';

    if(process.env.MLAB_USERNAME) {
        var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
        var password = process.env.MLAB_PASSWORD_WEBDEV;
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += '@ds137101.mlab.com:37101/heroku_dzpfc8qg'; //TODO: Fix this
    }

    var mongoose = require("mongoose");
    mongoose.Promise = require('bluebird');
    mongoose.connect(connectionString, function (err, res) {
        if (err) {
            console.log ('ERROR connecting to: ' + connectionString + '. ' + err);
        } else {
            console.log ('Succeeded connected to: ' + connectionString);
        }
    });

    var quizModel = require("./models/quiz.model.server");
    require("./services/quiz.service.server.js")(app, quizModel);
};