module RoadWatch.Controllers {
    export class RoadReportsController {
        static $inject = ['$scope', '$state', 'reportDataService', 'markerTileService'];

        dataSet = <Models.IPagedResponse<Models.IRoadConditionReport>>{ items: [] };
        cachedFilter = <Models.IRoadConditionReportFilter>{ page: 1, pageSize: 12, orderDirection: "dsc" };

        conditionTypes = Models.RoadConditionTypes;
        hazardTypes = Models.HazardTypes;
        collisionTypes = Models.CollisionTypes;
        floodingTypes = Models.FloodingTypes;

        searchFilterCollapsed = true;

        constructor(
            private $scope,
            private $state,
            private reportDataService: Services.IReportDataService,
            private markerTileService: Services.IMarkerTileService
        ) {
            $scope.vm = this;
            this.getData(this.cachedFilter);
        }

        private filterResults() {
            this.reportDataService.getPagedRoadReports(this.cachedFilter).then((response) => {
                this.dataSet = response.data;
                return response;
            });
        }

        private resetFilter() {
            this.cachedFilter = <Models.IRoadConditionReportFilter>{ page: 1, pageSize: 10, orderDirection: "dsc" };
            this.reportDataService.getPagedRoadReports(this.cachedFilter).then((response) => {
                this.dataSet = response.data;
                return response;
            });
        }

        private pageChanged() {
            this.getData(this.cachedFilter);
        }

        private getData = (filter: Models.IPagingFilter) => {
            angular.extend(this.cachedFilter, filter);
            this.reportDataService.getPagedRoadReports(this.cachedFilter).then((response) => {
                this.dataSet = response.data;
                return response;
            });
        }

        private getRoadConditionText(report: Models.IPublicReport): string {
            var text = Models.EnumLabelDictionary.get('RoadConditionTypes', report.roadConditionType);
            return text;
        }

        private truncateCondition(report: Models.IRoadConditionReport) {
            var text = report.condition;

            if (report.roadConditionType === this.conditionTypes.Harzard.toString()) {
                text = this.$scope.enumDescriptions.get('HazardTypes', text);
            } else if (report.roadConditionType === this.conditionTypes.VehicleCollision.toString()) {
                text = this.$scope.enumDescriptions.get('CollisionTypes', text);
            } else if (report.roadConditionType === this.conditionTypes.Flooding.toString()) {
                text = this.$scope.enumDescriptions.get('FloodingTypes', text);
            } else if (report.roadConditionType === this.conditionTypes.Roadworks.toString()) {
                text = "Duration: " + text;
            }

            if (text != null) {
                if (text.length > 30) {
                    text = text.substr(0, 30) + '...';
                }
                return text;
            }
            return '';
        }

        private truncateText(text: string, length: number): string {
            if (text != null && length != null) {
                if (text.length > length) {
                    text = text.substr(0, length) + '...';
                }
                return text;
            }
            return '';
        }

        private getIcon(type) {
            return this.markerTileService.getMarkerTileByType(type).filePath;
        }

        private showCollisionTypeField(): boolean {
            return (this.cachedFilter.roadConditionType != null
                && this.cachedFilter.roadConditionType === this.conditionTypes.VehicleCollision);
        }

        private showHazardTypeField(): boolean {
            return (this.cachedFilter.roadConditionType != null
                && this.cachedFilter.roadConditionType === this.conditionTypes.Harzard);
        }

        private showFloodingTypeField(): boolean {
            return (this.cachedFilter.roadConditionType != null
                && this.cachedFilter.roadConditionType === this.conditionTypes.Flooding);
        }

        private showSpecialEventField(): boolean {
            return (this.cachedFilter.roadConditionType != null
                && this.cachedFilter.roadConditionType === this.conditionTypes.SpecialEvent);
        }
    }
}