/**
 * Created by DylanWight on 6/4/17.
 */
module.exports = function(app) {

    const connectionString = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://127.0.0.1:27017/dyl-quiz';
    const mongoose = require("mongoose");
    mongoose.Promise = require('bluebird');
    mongoose.createConnection(connectionString, function (err, res) {
        if (err) {
            console.log ('ERROR connecting to: ' + connectionString + '. ' + err);
        } else {
            console.log ('Succeeded connected to: ' + connectionString);

            const QuizService = require("./services/QuizService")();
            const ResultService = require("./services/ResultService")();

            require("./router/quizRouter.js")(app, QuizService);
            require("./router/resultRouter.js")(app, ResultService);
        }
    });
};