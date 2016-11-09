var RoadWatch;
(function (RoadWatch) {
    var Controllers;
    (function (Controllers) {
        var ReportRoadConditionController = (function () {
            function ReportRoadConditionController($scope, $modalInstance, $validation, reportDataService, markerTileService) {
                this.$scope = $scope;
                this.$modalInstance = $modalInstance;
                this.$validation = $validation;
                this.reportDataService = reportDataService;
                this.markerTileService = markerTileService;
                this.newReport = {};
                this.conditionTypes = RoadWatch.Models.RoadConditionTypes;
                this.collisionTypes = RoadWatch.Models.CollisionTypes;
                this.hazardTypes = RoadWatch.Models.HazardTypes;
                this.floodingTypes = RoadWatch.Models.FloodingTypes;
                $scope.vm = this;
                window['modal'] = this;
            }
            ReportRoadConditionController.prototype.sendReport = function (form) {
                var _this = this;
                this.$validation.validate(form)
                    .success(function () {
                    _this.reportDataService.sendReport(_this.newReport).then(function (response) {
                        if (response.data.succeed) {
                            toastr.success(response.data.response);
                            _this.cancel();
                        }
                        else {
                            toastr.error(response.data.response);
                        }
                    }, function (error) {
                        toastr.error("Failed to send report: " + error.statusText);
                    });
                }, function (error) {
                    toastr.error("Failed to send report, please fill out the required fields");
                });
            };
            ReportRoadConditionController.prototype.cancel = function () {
                this.$modalInstance.dismiss('cancel');
            };
            ReportRoadConditionController.prototype.showHazardTypes = function () {
                return this.newReport.roadConditionType === this.conditionTypes.Harzard;
            };
            ReportRoadConditionController.prototype.showCollisionTypes = function () {
                return this.newReport.roadConditionType === this.conditionTypes.VehicleCollision;
            };
            ReportRoadConditionController.prototype.showSpecialEventField = function () {
                return this.newReport.roadConditionType === this.conditionTypes.SpecialEvent;
            };
            ReportRoadConditionController.prototype.showFloodingTypes = function () {
                return this.newReport.roadConditionType === this.conditionTypes.Flooding;
            };
            ReportRoadConditionController.$inject = ['$scope', '$uibModalInstance', '$validation', 'reportDataService', 'markerTileService'];
            return ReportRoadConditionController;
        }());
        Controllers.ReportRoadConditionController = ReportRoadConditionController;
    })(Controllers = RoadWatch.Controllers || (RoadWatch.Controllers = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=report-road-condition-controller.js.map