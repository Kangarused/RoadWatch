module RoadWatch.Services {
    export interface IReportDataService {
        getPagedPublicReports(filter: Models.IPublicReportFilterRequest): ng.IHttpPromise<Models.IPagedResponse<Models.IPublicReport>>;
        getPagedRoadReports(filter: Models.IRoadConditionReportFilter): ng.IHttpPromise<Models.IPagedResponse<Models.IRoadConditionReport>>;
    }

    export class ReportDataService implements IReportDataService {
        static $inject = ['$http']; 

        constructor(private $http) { }

        getPagedPublicReports(filter: Models.IPublicReportFilterRequest): ng.IHttpPromise<Models.IPagedResponse<Models.IPublicReport>> {
            return this.$http.post("/api/reports/getPagedPublicReports", filter);
        }

        getPagedRoadReports(filter: Models.IRoadConditionReportFilter): ng.IHttpPromise<Models.IPagedResponse<Models.IRoadConditionReport>> {
            return this.$http.post("/api/reports/getPagedRoadReports", filter);
        }
    }
}