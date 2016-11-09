var RoadWatch;
(function (RoadWatch) {
    var Services;
    (function (Services) {
        var MapDataService = (function () {
            function MapDataService($http) {
                this.$http = $http;
            }
            MapDataService.prototype.getAllMapObjects = function () {
                return this.$http.get("/api/map/getMapObjects");
            };
            MapDataService.$inject = ['$http'];
            return MapDataService;
        }());
        Services.MapDataService = MapDataService;
    })(Services = RoadWatch.Services || (RoadWatch.Services = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=map-data-service.js.map