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
            AnnouncementsDataService.prototype.saveAnnouncement = function (announcement) {
                return this.$http.post("/api/announcement/saveAnnouncement", announcement);
            };
            AnnouncementsDataService.prototype.deleteAnnouncement = function (announcement) {
                return this.$http.post("/api/announcement/deleteAnnouncement", announcement);
            };
            AnnouncementsDataService.$inject = ['$http'];
            return AnnouncementsDataService;
        }());
        Services.AnnouncementsDataService = AnnouncementsDataService;
    })(Services = RoadWatch.Services || (RoadWatch.Services = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=announcements-data-service.js.map