/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }
        init();
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams["uid"];

        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }
        init();

        function createWebsite(website) {
            website = WebsiteService.createWebsite(vm.uid, website);
            if (website) {
                $location.url("/user/" + vm.uid + "/website/"); //+ website._id +"/page");
            }
        }
    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
            var website = WebsiteService.findWebsiteById(vm.wid);
            vm.website = {
                "_id": website._id,
                "name": website.name,
                "developerId": website.developerId,
                "description": website.description
            };
        }

        init();

        function updateWebsite(website) {
            website = WebsiteService.updateWebsite(vm.wid, website);
            if (website) {
                $location.url("/user/" + vm.uid + "/website/");
            }
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.wid);
            $location.url("/user/" + vm.uid + "/website/");
        }
    }

})();
