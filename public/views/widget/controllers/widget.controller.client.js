/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce) {

        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];

        vm.trustThisContent = trustThisContent;
        vm.getYoutubeEmbedUrl = getYoutubeEmbedUrl;
        vm.getUrlForWidgetType = getUrlForWidgetType;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
        }

        init();

        function trustThisContent(html) {
            //TODO: diligence to scrub any unsafe content
            return $sce.trustAsHtml(html);
        }

        function getYoutubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl = embedUrl + id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function getUrlForWidgetType(type) {
            return 'views/widget/templates/widget-' + type.toLowerCase() + '.view.client.html';
        }
    }

    function NewWidgetController($routeParams, $location, WidgetService) {

        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];

        vm.createWidget = createWidget;

        function createWidget(widget) {
            widget = WidgetService.createWidget(vm.pid, widget);
            if (widget) {
                $location.url("/user/" + vm.uid + "/website/"  + vm.wid + "/page/" + vm.pid + "/widget/" + widget._id);
            }
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {

        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];
        vm.wgid = $routeParams["wgid"];
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.createWidget = createWidget;

        function init() {
            widget = WidgetService.findWidgetById(vm.wgid);
            vm.widget = {
                "_id": widget._id,
                "name": widget.name,
                "widgetType": widget.widgetType,
                "pageId": widget.pageId,
                "size": widget.size,
                "text": widget.text,
                "width": widget.width,
                "url": widget.url
            };
        }

        init();

        function updateWidget(widget) {
            widget = WidgetService.updateWidget(vm.wgid, widget);
            if (widget) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/");
            }
        }

        function createWidget(widget) {
            widget = WidgetService.createWidget(vm.pid, widget);
            if (widget) {
                $location.url("/user/" + vm.uid + "/website/"  + vm.wid + "/page/" + vm.pid + "/widget/" + widget._id);
            }
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.wgid);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/");
        }
    }

})();
