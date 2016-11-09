var RoadWatch;
(function (RoadWatch) {
    var Controllers;
    (function (Controllers) {
        var AnnouncementsController = (function () {
            function AnnouncementsController($scope, announcementDataService, signalrDataService) {
                this.$scope = $scope;
                this.announcementDataService = announcementDataService;
                this.signalrDataService = signalrDataService;
                this.dataSet = { items: [] };
                this.cachedFilter = { page: 1, pageSize: 10, orderDirection: "dsc" };
                this.searchFilterCollapsed = true;
                $scope.vm = this;
                this.getData();
                this.setupSignalrConnection();
            }
            AnnouncementsController.prototype.setupSignalrConnection = function () {
                var _this = this;
                this.signalrDataService.setupConnection();
                var proxyTest = this.signalrDataService.proxy;
                proxyTest.on('announcementsUpdated', function (event) {
                    _this.getData();
                });
                this.signalrDataService.start();
            };
            AnnouncementsController.prototype.resetFilter = function () {
                this.cachedFilter = { page: 1, pageSize: 10, orderDirection: "dsc" };
                this.cachedFilter.initialDate = null;
                this.cachedFilter.finalDate = null;
                this.getData();
            };
            AnnouncementsController.prototype.getData = function () {
                var _this = this;
                this.announcementDataService.getPagedAnnouncements(this.cachedFilter).then(function (response) {
                    _this.dataSet = response.data;
                    return response;
                });
            };
            AnnouncementsController.$inject = ['$scope', 'announcementDataService', 'signalrDataService'];
            return AnnouncementsController;
        }());
        Controllers.AnnouncementsController = AnnouncementsController;
    })(Controllers = RoadWatch.Controllers || (RoadWatch.Controllers = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=announcements-controller.js.map