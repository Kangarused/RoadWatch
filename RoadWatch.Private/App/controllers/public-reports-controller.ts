module RoadWatch.Controllers {
    export class PublicReportsController {
        static $inject = ['$scope', '$state', 'reportDataService', 'markerTileService', 'signalrDataService'];

        dataSet = <Models.IPagedResponse<Models.IPublicReport>>{ items: [] };
        cachedFilter = <Models.IPublicReportFilterRequest>{ page: 1, pageSize: 10, orderDirection: "dsc" };

        conditionTypes = Models.RoadConditionTypes;
        hazardTypes = Models.HazardTypes;
        collisionTypes = Models.CollisionTypes;

        searchFilterCollapsed = true;

        constructor(
            private $scope,
            private $state,
            private reportDataService: Services.IReportDataService,
            private markerTileService: Services.IMarkerTileService,
            private signalrDataService: Services.ISignalrDataService
        ) {
            $scope.vm = this;
            this.getData(this.cachedFilter);
            this.setupSignalrConnection();
        }

        private setupSignalrConnection() {
            this.signalrDataService.setupConnection();
            var proxyTest = this.signalrDataService.proxy;
            proxyTest.on('publicReportsUpdated', (event) => {
                this.getData(this.cachedFilter);
                toastr.info('New public report receieved');
            });
            this.signalrDataService.start();
        }

        private filterResults() {
            this.reportDataService.getPagedPublicReports(this.cachedFilter).then((response) => {
                this.dataSet = response.data;
                return response;
            });
        }

        private resetFilter() {
            this.cachedFilter = <Models.IPublicReportFilterRequest>{ page: 1, pageSize: 10, orderDirection: "dsc" };
            this.reportDataService.getPagedPublicReports(this.cachedFilter).then((response) => {
                this.dataSet = response.data;
                return response;
            });
        }

        private pageChanged() {
            this.getData(this.cachedFilter);
        }

        private getData = (filter: Models.IPagingFilter) => {
            angular.extend(this.cachedFilter, filter);
            this.reportDataService.getPagedPublicReports(this.cachedFilter).then((response) => {
                this.dataSet = response.data;
                return response;
            });
        }

        private getRoadConditionText(report: Models.IPublicReport): string {
            var text = Models.EnumLabelDictionary.get('RoadConditionTypes', report.roadConditionType);
            return text;
        }

        private truncateCondition(text: string) {
            if (text != null) {
                if (text.length > 30) {
                    text = text.substr(0, 30) + '...';
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

        private showSpecialEventField(): boolean {
            return (this.cachedFilter.roadConditionType != null
                && this.cachedFilter.roadConditionType === this.conditionTypes.SpecialEvent);
        }
    }
}