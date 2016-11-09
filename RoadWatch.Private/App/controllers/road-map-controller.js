var RoadWatch;
(function (RoadWatch) {
    var Controllers;
    (function (Controllers) {
        var RoadMapController = (function () {
            function RoadMapController($scope, $state, $timeout, uiGmapGoogleMapApi, mapDataService, $uibModal, markerTileService, trackMapChangesService, signalrDataService) {
                var _this = this;
                this.$scope = $scope;
                this.$state = $state;
                this.$timeout = $timeout;
                this.uiGmapGoogleMapApi = uiGmapGoogleMapApi;
                this.mapDataService = mapDataService;
                this.$uibModal = $uibModal;
                this.markerTileService = markerTileService;
                this.trackMapChangesService = trackMapChangesService;
                this.signalrDataService = signalrDataService;
                this.conditionTypes = RoadWatch.Models.RoadConditionTypes;
                this.collisionTypes = RoadWatch.Models.CollisionTypes;
                this.hazardTypes = RoadWatch.Models.HazardTypes;
                this.mapOptions = { center: { latitude: -19.127466, longitude: 133.656831 }, zoom: 6 };
                this.activeMarker = -1;
                this.showMap = false;
                this.displayPaths = false;
                this.hideWindows = false;
                this.pathHelperMouseActive = false;
                this.renderPathHelper = false;
                this.pathingMarkerIndex = -1;
                this.currentPathId = null;
                this.markerTiles = [];
                this.updateCollection = {
                    collection: []
                };
                this.changedMarkers = [];
                this.warningModalOpen = false;
                // Event Configuration
                this.mapEvents = {
                    tilesloaded: function (map, eventName, originalEventArgs) { },
                    click: function (mapModel, eventName, originalEventArgs) {
                        if (_this.activeMarker !== -1) {
                            var e = originalEventArgs[0];
                            var marker = {
                                id: _this.getNextId(),
                                coords: {
                                    latitude: e.latLng.lat(),
                                    longitude: e.latLng.lng()
                                },
                                options: {
                                    icon: {
                                        url: _this.getImagePath(),
                                        scaledSize: _this.markerTileService.normalIconSize
                                    },
                                    draggable: true
                                },
                                windowOptions: {
                                    visible: false
                                }
                            };
                            var newItem = {
                                id: marker.id,
                                marker: marker,
                                roadConditionType: _this.markerTileService.getMarkerTileById(_this.activeMarker).roadConditionType,
                                paths: []
                            };
                            _this.updateCollection.collection.push(newItem);
                            //Track Map Changes
                            _this.changedMarkers.push(newItem);
                            _this.trackMapChangesService.updateChanges(_this.changedMarkers.length);
                            _this.$scope.$apply();
                        }
                    },
                    mousemove: function (mapModel, eventName, originalEventArgs) {
                        if (_this.renderPathHelper && _this.pathHelperMouseActive) {
                            var e = originalEventArgs[0];
                            var pathsId = _this.currentPathId;
                            var item = _this.updateCollection.collection[_this.pathingMarkerIndex].paths[pathsId];
                            if (item.path.length === 2 && _this.pathHelperMouseActive) {
                                item.path[1] = { latitude: e.latLng.lat(), longitude: e.latLng.lng() };
                                _this.$scope.$apply();
                            }
                        }
                    }
                };
                this.polylineEvent = {
                    click: function (mapModel, eventName, originalEventArgs) {
                        if (_this.renderPathHelper && _this.pathingMarkerIndex !== -1) {
                            _this.pathHelperMouseActive = false;
                            _this.hideWindows = false;
                        }
                    },
                    rightclick: function (mapModel, eventName, angArgs, args) {
                        var markerId = angArgs.$parent.$parent.$parent.idKey;
                        var path = angArgs.path;
                        _this.updateCollection.collection[markerId].paths.forEach(function (element, index) {
                            if (path === element.path) {
                                _this.updateCollection.collection[markerId].paths.splice(index, 1);
                            }
                        });
                    }
                };
                this.markerEvents = {
                    click: function (mapModel, eventName, angArgs, args) {
                        var element = Enumerable.From(_this.updateCollection.collection).FirstOrDefault(null, function (x) { return x.marker.id === angArgs.idKey; });
                        var markerTile = _this.markerTileService.getMarkerTileByType(element.roadConditionType);
                        var modalInstance = _this.$uibModal.open({
                            animation: true,
                            templateUrl: '/App/views/modals/map-object-editor.html',
                            controller: 'mapObjectEditorController',
                            windowTopClass: markerTile.modalClass,
                            resolve: {
                                modalData: function () {
                                    return {
                                        element: element,
                                        imagePath: markerTile.filePath,
                                    };
                                }
                            }
                        });
                        modalInstance.result.then(function (response) {
                            if (response.action != null) {
                                if (response.action === 'draw') {
                                    _this.highlightAffectedRoad(element.marker.id.toString());
                                }
                                else if (response.action === 'remove') {
                                    _this.removeMarker(element.marker.id.toString());
                                }
                                else if (response.action === 'lock') {
                                    _this.toggleLockMarker(element.marker.id.toString());
                                }
                            }
                            element = response.element;
                            var containsElement = Enumerable.From(_this.changedMarkers).Where(function (x) { return x.id === element.id; }).Count() > 0;
                            if (!containsElement) {
                                _this.changedMarkers.push(element);
                                _this.trackMapChangesService.updateChanges(_this.changedMarkers.length);
                            }
                            _this.validateMapObject(element);
                        });
                    }
                };
                $scope.vm = this;
                this.getMarkerTiles();
                uiGmapGoogleMapApi.then(function (maps) {
                    _this.showMap = true;
                    _this.getAllMapObjects();
                });
            }
            RoadMapController.prototype.setupSignalrConnection = function () {
                var _this = this;
                this.signalrDataService.setupConnection();
                var proxyTest = this.signalrDataService.proxy;
                proxyTest.on('mapUpdated', function (event) {
                    if (_this.changedMarkers.length < 0) {
                        _this.getAllMapObjects();
                    }
                });
                this.signalrDataService.start();
            };
            RoadMapController.prototype.getNextId = function () {
                var length = this.updateCollection.collection.length;
                if (length <= 0) {
                    return 0;
                }
                return this.updateCollection.collection[length - 1].id + 1;
            };
            RoadMapController.prototype.getMarkerTiles = function () {
                this.markerTiles = this.markerTileService.getAllMarkerTiles();
            };
            RoadMapController.prototype.getImagePath = function () {
                return "../../Content/images/markers/" + this.markerTileService.getMarkerTileById(this.activeMarker).filePath;
            };
            RoadMapController.prototype.compileImagePath = function (file) {
                return "../../Content/images/markers/" + file;
            };
            RoadMapController.prototype.getMarkerClass = function (id) {
                if (this.getMarkerActive(id)) {
                    return 'marker-btn-active';
                }
                return 'marker-btn-inactive';
            };
            RoadMapController.prototype.getMarkerActive = function (id) {
                return this.activeMarker === id;
            };
            RoadMapController.prototype.setMarkerActive = function (id) {
                if (this.activeMarker === id) {
                    this.activeMarker = -1;
                }
                else {
                    this.activeMarker = id;
                }
            };
            RoadMapController.prototype.getCurrentMarker = function () {
                if (this.activeMarker !== -1) {
                    return this.markerTileService.getMarkerTileById(this.activeMarker);
                }
                return null;
            };
            RoadMapController.prototype.closeWindow = function (id) {
                Enumerable.From(this.updateCollection.collection)
                    .FirstOrDefault(null, function (x) { return x.marker.id === id; }).marker.windowOptions.visible = false;
            };
            RoadMapController.prototype.removeMarker = function (id) {
                var _this = this;
                var modalInstance = this.$uibModal.open({
                    animation: true,
                    templateUrl: '/App/views/modals/confirm-modal.html',
                    controller: 'confirmModalController',
                    resolve: {
                        modalData: function () {
                            return {
                                modalHead: 'Delete Road Condition',
                                modalBody: 'Are you sure you want to delete this road condition?'
                            };
                        }
                    }
                });
                modalInstance.result.then(function (confirm) {
                    if (confirm) {
                        var marker = Enumerable.From(_this.updateCollection.collection)
                            .FirstOrDefault(null, function (x) { return x.marker.id.toString() === id; });
                        _this.mapDataService.deleteMapObject(marker).then(function (response) {
                            if (response.data.succeed) {
                                toastr.success(response.data.response);
                            }
                            var index = _this.updateCollection.collection.indexOf(marker);
                            _this.updateCollection.collection.splice(index, 1);
                            _this.changedMarkers.forEach(function (element, index) {
                                if (element.id.toString() === id) {
                                    _this.changedMarkers.splice(index, 1);
                                    _this.trackMapChangesService.updateChanges(_this.changedMarkers.length);
                                }
                            });
                        }, function (error) {
                            toastr.error("Failed to delete map object");
                        });
                    }
                });
            };
            RoadMapController.prototype.toggleLockMarker = function (id) {
                var item = Enumerable.From(this.updateCollection.collection)
                    .FirstOrDefault(null, function (x) { return x.marker.id.toString() === id; });
                item.marker.options.draggable = !item.marker.options.draggable;
                if (item.paths.length > 0) {
                    item.paths.forEach(function (element, index) {
                        element.clickable = !element.clickable;
                        element.editable = !element.editable;
                    });
                }
            };
            RoadMapController.prototype.highlightAffectedRoad = function (id) {
                var item = Enumerable.From(this.updateCollection.collection)
                    .FirstOrDefault(null, function (x) { return x.marker.id.toString() === id; });
                if (!item.marker.options.draggable) {
                    this.toggleLockMarker(id);
                }
                this.renderPathHelper = true;
                this.pathHelperMouseActive = true;
                this.pathingMarkerIndex = this.updateCollection.collection.indexOf(item);
                this.currentPathId = (item.paths.length + 1) - 1;
                var newPath = {
                    id: item.id + '_' + (item.paths.length + 1),
                    visible: true,
                    editable: true,
                    clickable: true,
                    draggable: false,
                    static: false,
                    stroke: { color: this.markerTileService.getMarkerTileByType(item.roadConditionType).color, weight: 7, opacity: 0.5 },
                    windowOptions: { visible: false },
                    path: []
                };
                newPath.path.push(item.marker.coords);
                newPath.path.push(item.marker.coords);
                this.updateCollection.collection[this.pathingMarkerIndex].paths.push(newPath);
                this.displayPaths = true;
                this.hideWindows = true;
            };
            RoadMapController.prototype.validateAllMarkers = function () {
                var _this = this;
                var errors = 0;
                this.updateCollection.collection.forEach(function (element, index) {
                    if (!_this.validateMapObject(element)) {
                        errors++;
                        element.marker.options.icon.scaledSize = _this.markerTileService.errorIconSize;
                    }
                });
                if (errors === 0) {
                    return true;
                }
                return false;
            };
            RoadMapController.prototype.validateAllChangedMarkers = function () {
                var _this = this;
                var errors = 0;
                this.changedMarkers.forEach(function (element, index) {
                    if (!_this.validateMapObject(element)) {
                        errors++;
                        element.marker.options.icon.scaledSize = _this.markerTileService.errorIconSize;
                    }
                });
                if (errors === 0) {
                    return true;
                }
                return false;
            };
            RoadMapController.prototype.validateMapObject = function (mapObject) {
                if (!(mapObject.area != null &&
                    mapObject.road != null &&
                    mapObject.condition != null)) {
                    return false;
                }
                mapObject.marker.options.icon.scaledSize = this.markerTileService.normalIconSize;
                return true;
            };
            RoadMapController.prototype.saveObjects = function () {
                var _this = this;
                if (this.validateAllChangedMarkers()) {
                    var newUpdateCollection = {
                        collection: this.changedMarkers
                    };
                    this.mapDataService.saveMapObjects(newUpdateCollection).then(function (response) {
                        toastr.success(response.data.response);
                        _this.changedMarkers.length = 0;
                        _this.trackMapChangesService.reset();
                    }, function (error) {
                        toastr.error("Failed to save map objects");
                    });
                }
                else {
                    toastr.error("Some markers still require input, please fill in the required fields for the larger markers");
                }
            };
            RoadMapController.prototype.resetMapObjects = function () {
                var _this = this;
                var modalInstance = this.$uibModal.open({
                    animation: true,
                    templateUrl: '/App/views/modals/confirm-modal.html',
                    controller: 'confirmModalController',
                    resolve: {
                        modalData: function () {
                            return {
                                modalHead: 'Reset Map Objects',
                                modalBody: 'You are about to reset all map changes since the last save, are you sure you want to continue?'
                            };
                        }
                    }
                });
                modalInstance.result.then(function (confirm) {
                    if (confirm) {
                        _this.getAllMapObjects();
                    }
                });
            };
            RoadMapController.prototype.getAllMapObjects = function () {
                var _this = this;
                this.mapDataService.getAllMapObjects().then(function (response) {
                    _this.updateCollection.collection = response.data;
                });
            };
            RoadMapController.$inject = ['$scope', '$state', '$timeout', 'uiGmapGoogleMapApi',
                'mapDataService', '$uibModal', 'markerTileService',
                'trackMapChangesService', 'signalrDataService'];
            return RoadMapController;
        }());
        Controllers.RoadMapController = RoadMapController;
    })(Controllers = RoadWatch.Controllers || (RoadWatch.Controllers = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=road-map-controller.js.map