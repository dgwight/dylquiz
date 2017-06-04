/**
 * Created by DylanWight on 6/4/17.
 */
var CommonService = require('./common.service.server');

function QuizService (app, model) {
    var quizzes = [
        {"_id": "321", "name": "Post 1", "userId": "456", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "userId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 3", "userId": "456", "description": "Lorem"}
    ];
    this.prototype = new CommonService(app, model, "quiz", quizzes);
}

module.exports = QuizService;