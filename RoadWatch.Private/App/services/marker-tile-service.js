var RoadWatch;
(function (RoadWatch) {
    var Services;
    (function (Services) {
        var MarkerTileService = (function () {
            function MarkerTileService() {
                this.normalIconSize = { width: 28, height: 49 };
                this.errorIconSize = { width: 47, height: 81 };
                this.markerTileCollection = [
                    {
                        id: 0,
                        color: '#23577b',
                        modalClass: 'flooding-modal',
                        roadConditionType: RoadWatch.Models.RoadConditionTypes.Flooding,
                        filePath: 'marker-flooding.png',
                        name: 'Flooding',
                        description: 'Mark a flooded road on the map'
                    },
                    {
                        id: 1,
                        color: '#aa6404',
                        modalClass: 'roadworks-modal',
                        roadConditionType: RoadWatch.Models.RoadConditionTypes.Roadworks,
                        filePath: 'marker-roadworks.png',
                        name: 'Road Works',
                        description: 'Mark a road with ongoing roadworks on the map'
                    },
                    {
                        id: 2,
                        color: '#cc4800',
                        modalClass: 'hazard-modal',
                        roadConditionType: RoadWatch.Models.RoadConditionTypes.Harzard,
                        filePath: 'marker-hazard.png',
                        name: 'Hazard',
                        description: 'Mark a road with an ongoing or severe hazard on the map'
                    },
                    {
                        id: 3,
                        color: '#9c2537',
                        modalClass: 'crash-modal',
                        roadConditionType: RoadWatch.Models.RoadConditionTypes.VehicleCollision,
                        filePath: 'marker-crash.png',
                        name: 'Crash',
                        description: 'Mark a road where a crash has taken place on the map'
                    },
                    {
                        id: 4,
                        color: '#4e2877',
                        modalClass: 'specialevent-modal',
                        roadConditionType: RoadWatch.Models.RoadConditionTypes.SpecialEvent,
                        filePath: 'marker-special-event.png',
                        name: 'Special Event',
                        description: 'Mark a road where a special event is taking place on the map'
                    },
                    {
                        id: 5,
                        color: '#000000',
                        modalClass: 'closed-modal',
                        roadConditionType: RoadWatch.Models.RoadConditionTypes.Closure,
                        filePath: 'marker-closed.png',
                        name: 'Closed',
                        description: 'Mark a closed road on the map'
                    }
                ];
            }
            MarkerTileService.prototype.getAllMarkerTiles = function () {
                return this.markerTileCollection;
            };
            MarkerTileService.prototype.getMarkerTileById = function (id) {
                return this.markerTileCollection[id];
            };
            MarkerTileService.prototype.getMarkerTileByType = function (type) {
                var tile = Enumerable.From(this.markerTileCollection)
                    .FirstOrDefault({}, function (x) { return x.roadConditionType === type; });
                return tile;
            };
            MarkerTileService.$inject = [];
            return MarkerTileService;
        }());
        Services.MarkerTileService = MarkerTileService;
    })(Services = RoadWatch.Services || (RoadWatch.Services = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=marker-tile-service.js.map