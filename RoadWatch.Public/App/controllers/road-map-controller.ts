module RoadWatch.Controllers {
    export class RoadMapController {
        static $inject = ['$scope', '$window',
            'uiGmapGoogleMapApi', 'mapDataService',
            'markerTileService', '$uibModal',
            'signalrDataService'];

        conditionTypes = Models.RoadConditionTypes;
        collisionTypes = Models.CollisionTypes;
        hazardTypes = Models.HazardTypes;

        showMap = false;
        displayPaths = false;
        hideWindows = false;

        mapOptions = { center: { latitude: -19.127466, longitude: 133.656831 }, zoom: 6 };
        markers = <Models.IMapObject[]>[];
        polylines = <Models.IMapPath[]>[];

        connection = null;
        proxy = null;


        constructor(
            private $scope,
            private $window: ng.IWindowService,
            private uiGmapGoogleMapApi,
            private mapDataService: Services.IMapDataService,
            private markerTileService: Services.IMarkerTileService,
            private $uibModal,
            private signalrDataService: Services.ISignalrDataService
        ) {
            $scope.vm = this;
            window['test'] = this;
            uiGmapGoogleMapApi.then((maps) => {
                this.showMap = true;
            });

            this.getAllMapObjects();
            //this.setupSignalrConnection();
        }

        private setupSignalrConnection() {
            this.signalrDataService.setupConnection();
            var proxyTest = this.signalrDataService.proxy;
            proxyTest.on('mapUpdated', (event) => {
                this.getAllMapObjects();
            });
            this.signalrDataService.start();
        }

        getAllMapObjects() {
            this.mapDataService.getAllMapObjects().then(
            (response) => {
                this.markers = response.data;
                this.polylines.length = 0;
                for (var i = 0; i < this.markers.length; i++) {
                    this.markers[i].paths.forEach((element) => {
                        this.polylines.push(element);
                    });
                };
            });
        }

        showHazardField(value: string): boolean {
            return value === Models.RoadConditionTypes.Harzard;
        }

        showCollisionField(value: string): boolean {
            return value === Models.RoadConditionTypes.VehicleCollision;
        }

        closeWindow(id: number) {
            Enumerable.From(this.markers)
                .FirstOrDefault(null, x => x.marker.id === id).marker.windowOptions.visible = false;
        }


        private markerEvents = {
            click: (mapModel, eventName, angArgs, args) => {
                var element = Enumerable.From(this.markers).FirstOrDefault(null, x => x.marker.id === angArgs.idKey);
                var markerTile = this.markerTileService.getMarkerTileByType(element.roadConditionType);

                this.$uibModal.open({
                    animation: true,
                    templateUrl: '/App/views/modals/map-object-details-panel.html',
                    controller: 'mapObjectDetailsPanelController',
                    windowTopClass: markerTile.modalClass,
                    resolve: {
                        modalData: () => {
                            return {
                                element: element,
                                imagePath: markerTile.filePath
                            };
                        }
                    }
                });
            }
        };
    }
}