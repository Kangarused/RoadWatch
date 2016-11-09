var RoadWatch;
(function (RoadWatch) {
    var Services;
    (function (Services) {
        var ReportDataService = (function () {
            function ReportDataService($http) {
                this.$http = $http;
            }
            ReportDataService.prototype.getPagedPublicReports = function (filter) {
                return this.$http.post("/api/reports/getPagedPublicReports", filter);
            };
            ReportDataService.prototype.getPagedRoadReports = function (filter) {
                return this.$http.post("/api/reports/getPagedRoadReports", filter);
            };
            ReportDataService.$inject = ['$http'];
            return ReportDataService;
        }());
        Services.ReportDataService = ReportDataService;
    })(Services = RoadWatch.Services || (RoadWatch.Services = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=report-data-service.js.map