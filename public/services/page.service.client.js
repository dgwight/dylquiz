/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];
        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteId, page) {
            page._id = page._id ? page._id : new Date().getTime() + "";
            page.websiteId = websiteId;
            pages.push(page);
            return page;
        }

        function findPageByWebsiteId(websiteId) {
            var websitePages = [];
            for (var i = 0; i < pages.length; i++) {
                if (pages[i].websiteId === websiteId)
                    websitePages.push(pages[i]);
            }
            return websitePages;
        }

        function findPageById(pageId) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id === pageId)
                    return pages[i];
            }
            return null;
        }

        function updatePage(pageId, page) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id === pageId) {
                    pages[i] = page;
                    return pages[i];
                }
            }
        }

        function deletePage(pageId) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id === pageId) {
                    pages.splice(i, 1);
                }
            }
        }
    }
})();
