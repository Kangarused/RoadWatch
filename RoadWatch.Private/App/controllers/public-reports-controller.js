var RoadWatch;
(function (RoadWatch) {
    var Controllers;
    (function (Controllers) {
        var PublicReportsController = (function () {
            function PublicReportsController($scope, $state, reportDataService, markerTileService, signalrDataService) {
                var _this = this;
                this.$scope = $scope;
                this.$state = $state;
                this.reportDataService = reportDataService;
                this.markerTileService = markerTileService;
                this.signalrDataService = signalrDataService;
                this.dataSet = { items: [] };
                this.cachedFilter = { page: 1, pageSize: 10, orderDirection: "dsc" };
                this.conditionTypes = RoadWatch.Models.RoadConditionTypes;
                this.hazardTypes = RoadWatch.Models.HazardTypes;
                this.collisionTypes = RoadWatch.Models.CollisionTypes;
                this.searchFilterCollapsed = true;
                this.getData = function (filter) {
                    angular.extend(_this.cachedFilter, filter);
                    _this.reportDataService.getPagedPublicReports(_this.cachedFilter).then(function (response) {
                        _this.dataSet = response.data;
                        return response;
                    });
                };
                $scope.vm = this;
                this.getData(this.cachedFilter);
                //this.setupSignalrConnection();
            }
            PublicReportsController.prototype.setupSignalrConnection = function () {
                var _this = this;
                this.signalrDataService.setupConnection();
                var proxyTest = this.signalrDataService.proxy;
                proxyTest.on('publicReportsUpdated', function (event) {
                    _this.getData(_this.cachedFilter);
                    toastr.info('New public report receieved');
                });
                this.signalrDataService.start();
            };
            PublicReportsController.prototype.filterResults = function () {
                var _this = this;
                this.reportDataService.getPagedPublicReports(this.cachedFilter).then(function (response) {
                    _this.dataSet = response.data;
                    return response;
                });
            };
            PublicReportsController.prototype.resetFilter = function () {
                var _this = this;
                this.cachedFilter = { page: 1, pageSize: 10, orderDirection: "dsc" };
                this.reportDataService.getPagedPublicReports(this.cachedFilter).then(function (response) {
                    _this.dataSet = response.data;
                    return response;
                });
            };
            PublicReportsController.prototype.pageChanged = function () {
                this.getData(this.cachedFilter);
            };
            PublicReportsController.prototype.getRoadConditionText = function (report) {
                var text = RoadWatch.Models.EnumLabelDictionary.get('RoadConditionTypes', report.roadConditionType);
                return text;
            };
            PublicReportsController.prototype.truncateCondition = function (text) {
                if (text != null) {
                    if (text.length > 30) {
                        text = text.substr(0, 30) + '...';
                    }
                    return text;
                }
                return '';
            };
            PublicReportsController.prototype.getIcon = function (type) {
                return this.markerTileService.getMarkerTileByType(type).filePath;
            };
            PublicReportsController.prototype.showCollisionTypeField = function () {
                return (this.cachedFilter.roadConditionType != null
                    && this.cachedFilter.roadConditionType === this.conditionTypes.VehicleCollision);
            };
            PublicReportsController.prototype.showHazardTypeField = function () {
                return (this.cachedFilter.roadConditionType != null
                    && this.cachedFilter.roadConditionType === this.conditionTypes.Harzard);
            };
            PublicReportsController.prototype.showSpecialEventField = function () {
                return (this.cachedFilter.roadConditionType != null
                    && this.cachedFilter.roadConditionType === this.conditionTypes.SpecialEvent);
            };
            PublicReportsController.$inject = ['$scope', '$state', 'reportDataService', 'markerTileService', 'signalrDataService'];
            return PublicReportsController;
        }());
        Controllers.PublicReportsController = PublicReportsController;
    })(Controllers = RoadWatch.Controllers || (RoadWatch.Controllers = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=public-reports-controller.js.map