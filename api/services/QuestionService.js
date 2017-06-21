/**
 * Created by DylanWight on 6/20/17.
 */
const mongoose = require("mongoose");
const CommonService = require('./CommonService');
const QuizService = require('./QuizService')();
const RecordService = require('./RecordService')();

function QuestionService () {
    const QuestionSchema = require("../schemas/questionSchema");
    const QuestionModel = mongoose.model("Question", QuestionSchema);
    const QuestionService = new CommonService(QuestionModel);
    QuestionService.findByQuizId = findByQuizId;
    QuestionService.getNextQuestion = getNextQuestion;
    return QuestionService;

    function findByQuizId(quizId) {
        return QuestionService.find({"_quiz": quizId});
    }

    function getNextQuestion(recordId) {
        console.log("getNextQuestion", recordId);
        return RecordService.findById(recordId).then((record) => {
            this.record = record;
            return QuizService.findById(record._quiz);
        }).then((quiz) => {
            return QuestionService.findByQuizId(quiz._id);
        }).then((questions) => {
            const unansweredQuestions = questions.filter((question) => {
                return this.record.questions.indexOf(question._id) === -1;
            });
            return unansweredQuestions[0];
        })
    }
}

module.exports = QuestionService;