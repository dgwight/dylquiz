/**
 * Created by DylanWight on 6/4/17.
 */
module.exports = function(app) {

    const connectionString = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://127.0.0.1:27017/dyl-quiz';
    //
    // if(process.env.MONGODB_URI) {
    //     connectionString = 'mongodb://' + process.env.MLAB_USERNAME + ':' + process.env.MLAB_PASSWORD
    //         + "@ds149481.mlab.com:49481/heroku_spm670rv";
    // }

    const mongoose = require("mongoose");
    mongoose.Promise = require('bluebird');
    mongoose.connect(connectionString, function (err, res) {
        if (err) {
            console.log ('ERROR connecting to: ' + connectionString + '. ' + err);
        } else {
            console.log ('Succeeded connected to: ' + connectionString);

            // Do I need to wait for connection to make routes?
            const QuizService = require("./services/quiz.service.server")();
            require("./router/quiz.router.server.js")(app, QuizService);
        }
    });
};