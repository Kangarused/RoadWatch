module RoadWatch.Controllers {
    export class ReportRoadConditionController {
        static $inject = ['$scope', '$uibModalInstance', '$validation', 'reportDataService', 'markerTileService'];

        newReport = <Models.IPublicReport>{};

        conditionTypes = Models.RoadConditionTypes;
        collisionTypes = Models.CollisionTypes;
        hazardTypes = Models.HazardTypes;
        floodingTypes = Models.FloodingTypes;

        constructor(
            private $scope,
            private $modalInstance,
            private $validation,
            private reportDataService: Services.IReportDataService,
            private markerTileService: Services.IMarkerTileService
        ) {
            $scope.vm = this;
            window['modal'] = this;
        }

        sendReport(form) {
            this.$validation.validate(form)
            .success(() => {
                this.reportDataService.sendReport(this.newReport).then(
                    (response) => {
                    if (response.data.succeed) {
                        toastr.success(response.data.response);
                        this.cancel();
                    } else {
                        toastr.error(response.data.response);
                    }
                }, (error) => {
                    toastr.error("Failed to send report: " + error.statusText);
                });
            }, (error) => {
                toastr.error("Failed to send report, please fill out the required fields");
            });
        }

        cancel() {
            this.$modalInstance.dismiss('cancel');
        }

        showHazardTypes() {
            return this.newReport.roadConditionType === this.conditionTypes.Harzard;
        }

        showCollisionTypes() {
            return this.newReport.roadConditionType === this.conditionTypes.VehicleCollision;
        }

        showSpecialEventField() {
            return this.newReport.roadConditionType === this.conditionTypes.SpecialEvent;
        }

        showFloodingTypes() {
            return this.newReport.roadConditionType === this.conditionTypes.Flooding;
        }
    }
}