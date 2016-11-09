module RoadWatch.Services {
    export interface IReportDataService {
        sendReport(report: Models.IPublicReport): ng.IHttpPromise<Models.IActionResponseGeneric<string>>;
        getPagedRoadReports(filter: Models.IRoadConditionReportFilter): ng.IHttpPromise<Models.IPagedResponse<Models.IRoadConditionReport>> ;
    }

    export class ReportDataService implements IReportDataService {
        static $inject = ['$http'];

        constructor(private $http) { }

        sendReport(report: Models.IPublicReport): ng.IHttpPromise<Models.IActionResponseGeneric<string>> {
            return this.$http.post("/api/reports/savePublicReport", report);
        }

        getPagedRoadReports(filter: Models.IRoadConditionReportFilter): ng.IHttpPromise<Models.IPagedResponse<Models.IRoadConditionReport>> {
            return this.$http.post("/api/reports/getPagedRoadReports", filter);
        }
    }
}