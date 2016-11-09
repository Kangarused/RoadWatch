module RoadWatch.Services {
    export interface IMarkerTileService {
        getMarkerTileById(id: number): Models.IMapMarkerTile;
        getMarkerTileByType(type: string): Models.IMapMarkerTile;
    }

    export class MarkerTileService implements IMarkerTileService {
        static $inject = [];

        constructor() { }

        getMarkerTileById(id: number): Models.IMapMarkerTile {
            return this.markerTileCollection[id];
        }

        getMarkerTileByType(type): Models.IMapMarkerTile {
            var tile = Enumerable.From(this.markerTileCollection)
                .FirstOrDefault(<Models.IMapMarkerTile>{}, x => x.roadConditionType === type);
            return tile;
        }

        private markerTileCollection = <Models.IMapMarkerTile[]>[
            {
                id: 0,
                color: '#23577b',
                modalClass: 'flooding-modal',
                roadConditionType: Models.RoadConditionTypes.Flooding,
                filePath: 'marker-flooding.png',
                name: 'Flooding',
                description: 'Mark a flooded road on the map'
            },
            {
                id: 1,
                color: '#aa6404',
                modalClass: 'roadworks-modal',
                roadConditionType: Models.RoadConditionTypes.Roadworks,
                filePath: 'marker-roadworks.png',
                name: 'Road Works',
                description: 'Mark a road with ongoing roadworks on the map'
            },
            {
                id: 2,
                color: '#cc4800',
                modalClass: 'hazard-modal',
                roadConditionType: Models.RoadConditionTypes.Harzard,
                filePath: 'marker-hazard.png',
                name: 'Hazard',
                description: 'Mark a road with an ongoing or severe hazard on the map'
            },
            {
                id: 3,
                color: '#9c2537',
                modalClass: 'crash-modal',
                roadConditionType: Models.RoadConditionTypes.VehicleCollision,
                filePath: 'marker-crash.png',
                name: 'Crash',
                description: 'Mark a road where a crash has taken place on the map'
            },
            {
                id: 4,
                color: '#4e2877',
                modalClass: 'specialevent-modal',
                roadConditionType: Models.RoadConditionTypes.SpecialEvent,
                filePath: 'marker-special-event.png',
                name: 'Special Event',
                description: 'Mark a road where a special event is taking place on the map'
            },
            {
                id: 5,
                color: '#000000',
                modalClass: 'closed-modal',
                roadConditionType: Models.RoadConditionTypes.Closure,
                filePath: 'marker-closed.png',
                name: 'Closed',
                description: 'Mark a closed road on the map'
            }
        ];
    }
}