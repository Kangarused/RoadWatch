module RoadWatch.Controllers {
    export class RoadMapController {
        static $inject = ['$scope', '$state', '$timeout', 'uiGmapGoogleMapApi',
            'mapDataService', '$uibModal', 'markerTileService',
            'trackMapChangesService', 'signalrDataService'];

        conditionTypes = Models.RoadConditionTypes;
        collisionTypes = Models.CollisionTypes;
        hazardTypes = Models.HazardTypes;

        mapOptions = { center: { latitude: -19.127466, longitude: 133.656831 }, zoom: 6 };

        activeMarker = -1;
        showMap = false;
        displayPaths = false;
        hideWindows = false;
        pathHelperMouseActive = false;
        renderPathHelper = false;
        pathingMarkerIndex = -1;
        currentPathId = null;

        markerTiles = <Models.IMapMarkerTile[]>[];
        updateCollection = <Models.IMapObjectCollection>{
            collection: <Models.IMapObject[]>[]
        };

        changedMarkers = <Models.IMapObject[]>[];
        warningModalOpen = false;

        constructor(
            private $scope,
            private $state,
            private $timeout: ng.ITimeoutService,
            private uiGmapGoogleMapApi,
            private mapDataService: Services.IMapDataService,
            private $uibModal,
            private markerTileService: Services.IMarkerTileService,
            private trackMapChangesService: Services.ITrackMapChangesService,
            private signalrDataService: Services.ISignalrDataService
        ) {
            $scope.vm = this;
            this.getMarkerTiles();
            uiGmapGoogleMapApi.then((maps) => {
                this.showMap = true;
                this.getAllMapObjects();
            });
        }

        private setupSignalrConnection() {
            this.signalrDataService.setupConnection();
            var proxyTest = this.signalrDataService.proxy;
            proxyTest.on('mapUpdated', (event) => {
                if (this.changedMarkers.length < 0) {
                    this.getAllMapObjects();
                }
            });
            this.signalrDataService.start();
        }

        private getNextId(): number {
            var length = this.updateCollection.collection.length;
            if (length <= 0) {
                return 0;
            }
            return this.updateCollection.collection[length - 1].id + 1;
        }

        private getMarkerTiles() {
            this.markerTiles = this.markerTileService.getAllMarkerTiles();
        }

        private getImagePath(): string {
            return "../../Content/images/markers/" + this.markerTileService.getMarkerTileById(this.activeMarker).filePath;
        }

        private compileImagePath(file: string): string {
            return "../../Content/images/markers/" + file;
        }

        private getMarkerClass(id: number) {
            if (this.getMarkerActive(id)) {
                return 'marker-btn-active';
            }
            return 'marker-btn-inactive';
        }

        private getMarkerActive(id: number): boolean {
            return this.activeMarker === id;
        }

        private setMarkerActive(id: number): void {
            if (this.activeMarker === id) {
                this.activeMarker = -1;
            } else {
                this.activeMarker = id; 
            }
        }

        private getCurrentMarker(): Models.IMapMarkerTile {
            if (this.activeMarker !== -1) {
                return this.markerTileService.getMarkerTileById(this.activeMarker);  
            }
            return null;
        }

        private closeWindow(id: number) {
            Enumerable.From(this.updateCollection.collection)
                .FirstOrDefault(null, x => x.marker.id === id).marker.windowOptions.visible = false;
        }

        private removeMarker(id: string) {
            var modalInstance = this.$uibModal.open({
                animation: true,
                templateUrl: '/App/views/modals/confirm-modal.html',
                controller: 'confirmModalController',
                resolve: {
                    modalData: () => {
                        return {
                            modalHead: 'Delete Road Condition',
                            modalBody: 'Are you sure you want to delete this road condition?'
                        };
                    }
                }
            });

            modalInstance.result.then(confirm => {
                if (confirm) {
                    var marker = Enumerable.From(this.updateCollection.collection)
                        .FirstOrDefault(null, x => x.marker.id.toString() === id);
                    this.mapDataService.deleteMapObject(marker).then(
                    (response) => {
                        if (response.data.succeed) {
                            toastr.success(response.data.response);
                        } 
                        var index = this.updateCollection.collection.indexOf(marker);
                        this.updateCollection.collection.splice(index, 1);

                        this.changedMarkers.forEach((element, index) => {
                            if (element.id.toString() === id) {
                                this.changedMarkers.splice(index, 1);
                                this.trackMapChangesService.updateChanges(this.changedMarkers.length);
                            }
                        });
                    }, (error) => {
                        toastr.error("Failed to delete map object");
                    });
                }
            });
        }

        private toggleLockMarker(id: string) {
            var item = Enumerable.From(this.updateCollection.collection)
                .FirstOrDefault(null, x => x.marker.id.toString() === id);

            item.marker.options.draggable = !item.marker.options.draggable;

            if (item.paths.length > 0) {
                item.paths.forEach((element, index) => {
                    element.clickable = !element.clickable;
                    element.editable = !element.editable;
                });
            }
        }

        private highlightAffectedRoad(id: string) {
            var item = Enumerable.From(this.updateCollection.collection)
                .FirstOrDefault(null, x => x.marker.id.toString() === id);

            if (!item.marker.options.draggable) {
                this.toggleLockMarker(id);
            }

            this.renderPathHelper = true;
            this.pathHelperMouseActive = true;
            this.pathingMarkerIndex = this.updateCollection.collection.indexOf(item);

            this.currentPathId = (item.paths.length + 1) - 1;
            var newPath = <Models.IMapPath>{
                id: item.id + '_' + (item.paths.length + 1),
                visible: true,
                editable: true,
                clickable: true,
                draggable: false,
                static: false,
                stroke: <Models.IStroke>{ color: this.markerTileService.getMarkerTileByType(item.roadConditionType).color, weight: 7, opacity: 0.5 },
                windowOptions: <Models.IWindowOptions>{visible: false},
                path: []
            };
            newPath.path.push(item.marker.coords);
            newPath.path.push(item.marker.coords);

            this.updateCollection.collection[this.pathingMarkerIndex].paths.push(newPath);
            
            this.displayPaths = true;
            this.hideWindows = true;
        }

        private validateAllMarkers(): boolean {
            var errors = 0;
            this.updateCollection.collection.forEach((element, index) => {
                if (!this.validateMapObject(element)) {
                    errors++;
                    element.marker.options.icon.scaledSize = this.markerTileService.errorIconSize;
                }
            });

            if (errors === 0) {
                return true;
            }

            return false;
        }

        private validateAllChangedMarkers(): boolean {
            var errors = 0;
            this.changedMarkers.forEach((element, index) => {
                if (!this.validateMapObject(element)) {
                    errors++;
                    element.marker.options.icon.scaledSize = this.markerTileService.errorIconSize;
                }
            });

            if (errors === 0) {
                return true;
            }

            return false;
        }

        private validateMapObject(mapObject: Models.IMapObject): boolean {
            if (!(mapObject.area != null &&
                mapObject.road != null &&
                mapObject.condition != null)) {
                return false;
            }

            mapObject.marker.options.icon.scaledSize = this.markerTileService.normalIconSize;
            return true;
        }

        private saveObjects() {
            if (this.validateAllChangedMarkers()) {
                var newUpdateCollection = <Models.IMapObjectCollection> {
                    collection: this.changedMarkers
                };

                this.mapDataService.saveMapObjects(newUpdateCollection).then(
                (response) => {
                    toastr.success(response.data.response);
                    this.changedMarkers.length = 0;
                    this.trackMapChangesService.reset();
                }, (error) => {
                    toastr.error("Failed to save map objects");
                });
            } else {
                toastr.error("Some markers still require input, please fill in the required fields for the larger markers");
            }          
        }

        private resetMapObjects() {
            var modalInstance = this.$uibModal.open({
                animation: true,
                templateUrl: '/App/views/modals/confirm-modal.html',
                controller: 'confirmModalController',
                resolve: {
                    modalData: () => {
                        return {
                            modalHead: 'Reset Map Objects',
                            modalBody: 'You are about to reset all map changes since the last save, are you sure you want to continue?'
                        };
                    }
                }
            });

            modalInstance.result.then(confirm => {
                if (confirm) {
                    this.getAllMapObjects();
                }
            });
        }

        private getAllMapObjects() {
            this.mapDataService.getAllMapObjects().then(
            (response) => {
                this.updateCollection.collection = response.data;
            });
        }

        // Event Configuration
        private mapEvents = {
            tilesloaded: (map, eventName, originalEventArgs) => { },
            click: (mapModel, eventName, originalEventArgs) => {
                if (this.activeMarker !== -1) {
                    var e = originalEventArgs[0];
                    var marker = <Models.IMarker>{
                        id: this.getNextId(),
                        coords: {
                            latitude: e.latLng.lat(),
                            longitude: e.latLng.lng()
                        },
                        options: {
                            icon: {
                                url: this.getImagePath(),
                                scaledSize: this.markerTileService.normalIconSize
                        },
                            draggable: true
                        },
                        windowOptions: {
                            visible: false
                        }
                    };
                    var newItem = <Models.IMapObject>{
                        id: marker.id,
                        marker: marker,
                        roadConditionType: this.markerTileService.getMarkerTileById(this.activeMarker).roadConditionType,
                        paths: <Models.IMapPath[]>[]
                    };

                    this.updateCollection.collection.push(newItem);

                    //Track Map Changes
                    this.changedMarkers.push(newItem);
                    this.trackMapChangesService.updateChanges(this.changedMarkers.length);

                    this.$scope.$apply();
                }
            },
            mousemove: (mapModel, eventName, originalEventArgs) => {
                if (this.renderPathHelper && this.pathHelperMouseActive) {
                    var e = originalEventArgs[0];
                    var pathsId = this.currentPathId;

                    var item = this.updateCollection.collection[this.pathingMarkerIndex].paths[pathsId];
                    if (item.path.length === 2 && this.pathHelperMouseActive) {

                        item.path[1] = <Models.ILatLng>{ latitude: e.latLng.lat(), longitude: e.latLng.lng() };
                        this.$scope.$apply();
                    }
                }
            }
        };

        private polylineEvent = {
            click: (mapModel, eventName, originalEventArgs) => {
                if (this.renderPathHelper && this.pathingMarkerIndex !== -1) {
                    this.pathHelperMouseActive = false;
                    this.hideWindows = false;
                }
            },
            rightclick: (mapModel, eventName, angArgs, args) => {
                var markerId = angArgs.$parent.$parent.$parent.idKey;
                var path = angArgs.path;

                this.updateCollection.collection[markerId].paths.forEach((element, index) => {
                    if (path === element.path) {
                        this.updateCollection.collection[markerId].paths.splice(index, 1);
                    }
                });
            }
        };

        private markerEvents = {
            click: (mapModel, eventName, angArgs, args) => {
                var element = Enumerable.From(this.updateCollection.collection).FirstOrDefault(null, x => x.marker.id === angArgs.idKey);
                var markerTile = this.markerTileService.getMarkerTileByType(element.roadConditionType);

                var modalInstance = this.$uibModal.open({
                    animation: true,
                    templateUrl: '/App/views/modals/map-object-editor.html',
                    controller: 'mapObjectEditorController',
                    windowTopClass: markerTile.modalClass,
                    resolve: {
                        modalData: () => {
                            return {
                                element: element,
                                imagePath: markerTile.filePath,
                            };
                        }
                    }
                });

                modalInstance.result.then(response => {
                    if (response.action != null) {
                        if (response.action === 'draw') {
                            this.highlightAffectedRoad(element.marker.id.toString());
                        }
                        else if (response.action === 'remove') {
                            this.removeMarker(element.marker.id.toString());
                        } else if (response.action === 'lock') {
                            this.toggleLockMarker(element.marker.id.toString());
                        }
                    }
                    element = response.element;

                    var containsElement = Enumerable.From(this.changedMarkers).Where(x => x.id === element.id).Count() > 0;
                    if (!containsElement) {
                        this.changedMarkers.push(element);
                        this.trackMapChangesService.updateChanges(this.changedMarkers.length);
                    }

                    this.validateMapObject(element);
                });
            }
        };
    }
}