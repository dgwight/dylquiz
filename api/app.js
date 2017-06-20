/**
 * Created by DylanWight on 6/4/17.
 */
module.exports = function(app) {

    const connectionString = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://127.0.0.1:27017/dyl-quiz';
    const mongoose = require("mongoose");
    mongoose.Promise = require('bluebird');
    mongoose.connect(connectionString, function (err, res) {
        if (err) {
            console.log ('ERROR connecting to: ' + connectionString + '. ' + err);
        } else {
            console.log ('Succeeded connected to: ' + connectionString);

            const QuizService = require("./services/QuizService")();
            const ResultService = require("./services/ResultService")();
            const QuestionService = require("./services/QuestionService")();
            const AnswerService = require("./services/AnswerService")();

            require("./router/quizRouter")(app, QuizService);
            require("./router/resultRouter")(app, ResultService);
            require("./router/questionRouter")(app, QuestionService);
            require("./router/answerRouter")(app, AnswerService);
        }
    });
};