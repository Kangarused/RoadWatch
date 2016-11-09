var RoadWatch;
(function (RoadWatch) {
    var Controllers;
    (function (Controllers) {
        var RoadReportsController = (function () {
            function RoadReportsController($scope, $state, reportDataService, markerTileService) {
                var _this = this;
                this.$scope = $scope;
                this.$state = $state;
                this.reportDataService = reportDataService;
                this.markerTileService = markerTileService;
                this.dataSet = { items: [] };
                this.cachedFilter = { page: 1, pageSize: 12, orderDirection: "dsc" };
                this.conditionTypes = RoadWatch.Models.RoadConditionTypes;
                this.hazardTypes = RoadWatch.Models.HazardTypes;
                this.collisionTypes = RoadWatch.Models.CollisionTypes;
                this.floodingTypes = RoadWatch.Models.FloodingTypes;
                this.searchFilterCollapsed = true;
                this.getData = function (filter) {
                    angular.extend(_this.cachedFilter, filter);
                    _this.reportDataService.getPagedRoadReports(_this.cachedFilter).then(function (response) {
                        _this.dataSet = response.data;
                        return response;
                    });
                };
                $scope.vm = this;
                this.getData(this.cachedFilter);
            }
            RoadReportsController.prototype.filterResults = function () {
                var _this = this;
                this.reportDataService.getPagedRoadReports(this.cachedFilter).then(function (response) {
                    _this.dataSet = response.data;
                    return response;
                });
            };
            RoadReportsController.prototype.resetFilter = function () {
                var _this = this;
                this.cachedFilter = { page: 1, pageSize: 10, orderDirection: "dsc" };
                this.reportDataService.getPagedRoadReports(this.cachedFilter).then(function (response) {
                    _this.dataSet = response.data;
                    return response;
                });
            };
            RoadReportsController.prototype.pageChanged = function () {
                this.getData(this.cachedFilter);
            };
            RoadReportsController.prototype.getRoadConditionText = function (report) {
                var text = RoadWatch.Models.EnumLabelDictionary.get('RoadConditionTypes', report.roadConditionType);
                return text;
            };
            RoadReportsController.prototype.truncateCondition = function (report) {
                var text = report.condition;
                if (report.roadConditionType === this.conditionTypes.Harzard.toString()) {
                    text = this.$scope.enumDescriptions.get('HazardTypes', text);
                }
                else if (report.roadConditionType === this.conditionTypes.VehicleCollision.toString()) {
                    text = this.$scope.enumDescriptions.get('CollisionTypes', text);
                }
                else if (report.roadConditionType === this.conditionTypes.Flooding.toString()) {
                    text = this.$scope.enumDescriptions.get('FloodingTypes', text);
                }
                else if (report.roadConditionType === this.conditionTypes.Roadworks.toString()) {
                    text = "Duration: " + text;
                }
                if (text != null) {
                    if (text.length > 30) {
                        text = text.substr(0, 30) + '...';
                    }
                    return text;
                }
                return '';
            };
            RoadReportsController.prototype.truncateText = function (text, length) {
                if (text != null && length != null) {
                    if (text.length > length) {
                        text = text.substr(0, length) + '...';
                    }
                    return text;
                }
                return '';
            };
            RoadReportsController.prototype.getIcon = function (type) {
                return this.markerTileService.getMarkerTileByType(type).filePath;
            };
            RoadReportsController.prototype.showCollisionTypeField = function () {
                return (this.cachedFilter.roadConditionType != null
                    && this.cachedFilter.roadConditionType === this.conditionTypes.VehicleCollision);
            };
            RoadReportsController.prototype.showHazardTypeField = function () {
                return (this.cachedFilter.roadConditionType != null
                    && this.cachedFilter.roadConditionType === this.conditionTypes.Harzard);
            };
            RoadReportsController.prototype.showFloodingTypeField = function () {
                return (this.cachedFilter.roadConditionType != null
                    && this.cachedFilter.roadConditionType === this.conditionTypes.Flooding);
            };
            RoadReportsController.prototype.showSpecialEventField = function () {
                return (this.cachedFilter.roadConditionType != null
                    && this.cachedFilter.roadConditionType === this.conditionTypes.SpecialEvent);
            };
            RoadReportsController.$inject = ['$scope', '$state', 'reportDataService', 'markerTileService'];
            return RoadReportsController;
        }());
        Controllers.RoadReportsController = RoadReportsController;
    })(Controllers = RoadWatch.Controllers || (RoadWatch.Controllers = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=road-reports-controller.js.map