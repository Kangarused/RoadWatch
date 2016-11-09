var RoadWatch;
(function (RoadWatch) {
    var Services;
    (function (Services) {
        var TrackMapChangesService = (function () {
            function TrackMapChangesService($state, $rootScope) {
                this.$state = $state;
                this.$rootScope = $rootScope;
            }
            TrackMapChangesService.prototype.reset = function () {
                this.changesMade = 0;
            };
            ;
            TrackMapChangesService.prototype.updateChanges = function (value) {
                this.changesMade = value;
            };
            TrackMapChangesService.$inject = ['$state', '$rootScope'];
            return TrackMapChangesService;
        }());
        Services.TrackMapChangesService = TrackMapChangesService;
    })(Services = RoadWatch.Services || (RoadWatch.Services = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=track-map-changes-service.js.map