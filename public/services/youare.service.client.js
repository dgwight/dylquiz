/**
 * Created by DylanWight on 5/23/17.
 */

(function () {
    angular
        .module("DylQuiz")
        .factory("YouAreService", YouAreService);

    function YouAreService(CommonService) {

        var api = Object.create(CommonService);

        api.setObjects([
            {"_id": "321", "name": "Ned Stark", "quizId": "123", "url": "https://68.media.tumblr.com/avatar_ae8d71bd8b7e_128.png",
                "description": "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. "},
            {"_id": "432", "name": "Daenerys Targaryen", "quizId": "124", "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ4ROHCcqaCoFyYlomONxLCDG6-Rqy_Xrte1JHNLWLVefixSQXeg",
                "description": "Lorem"},
            {"_id": "543", "name": "Joffrey Baratheon", "quizId": "123", "url": "https://a.wattpad.com/useravatar/carryonbella.128.909424.jpg", "description": "Lorem"}
        ]);

        api.createYouAre = createYouAre;
        api.filterYouAreByQuizId = filterYouAreByQuizId;

        return api;

        function createYouAre(quizId, youAre) {
            youAre.quizId = quizId;
            return api.create(youAre);
        }

        function filterYouAreByQuizId(quizId) {
            return api.filter(function(youare) {
                return youare.quizId === quizId;
            });
        }
    }
})();
