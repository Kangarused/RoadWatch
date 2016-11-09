var RoadWatch;
(function (RoadWatch) {
    var Services;
    (function (Services) {
        var AnnouncementsDataService = (function () {
            function AnnouncementsDataService($http) {
                this.$http = $http;
            }
            AnnouncementsDataService.prototype.getPagedAnnouncements = function (filter) {
                return this.$http.post("/api/announcement/getPagedAnnouncements", filter);
            };
            AnnouncementsDataService.$inject = ['$http'];
            return AnnouncementsDataService;
        }());
        Services.AnnouncementsDataService = AnnouncementsDataService;
    })(Services = RoadWatch.Services || (RoadWatch.Services = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=announcements-data-service.js.map