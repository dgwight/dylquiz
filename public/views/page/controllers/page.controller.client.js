/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {

        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.wid);
        }

        init();
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];

        vm.createPage = createPage;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.wid);
        }

        init();

        function createPage(page) {
            page = PageService.createPage(vm.wid, page);
            if (page) {
                $location.url("/user/" + vm.uid + "/website/"  + vm.wid + "/page/");
            } else {
                vm.error = "Unable to create page";
            }
        }
    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            var page = UserService.findUserById(vm.uid);
            vm.page = {
                "_id": page._id,
                "title": page.title,
                "websiteId": page.websiteId,
                "description": page.description
            };
            vm.pages = PageService.findPageByWebsiteId(vm.wid);
        }

        init();

        function updatePage(page) {
            page = PageService.updatePage(vm.pid, page);
            if (page) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
            } else {
                vm.error = "Unable to edit page";
            }
        }

        function deletePage() {
            PageService.deletePage(vm.pid);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
        }
    }

})();
