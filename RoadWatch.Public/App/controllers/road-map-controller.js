var RoadWatch;
(function (RoadWatch) {
    var Controllers;
    (function (Controllers) {
        var RoadMapController = (function () {
            function RoadMapController($scope, $window, uiGmapGoogleMapApi, mapDataService, markerTileService, $uibModal, signalrDataService) {
                var _this = this;
                this.$scope = $scope;
                this.$window = $window;
                this.uiGmapGoogleMapApi = uiGmapGoogleMapApi;
                this.mapDataService = mapDataService;
                this.markerTileService = markerTileService;
                this.$uibModal = $uibModal;
                this.signalrDataService = signalrDataService;
                this.conditionTypes = RoadWatch.Models.RoadConditionTypes;
                this.collisionTypes = RoadWatch.Models.CollisionTypes;
                this.hazardTypes = RoadWatch.Models.HazardTypes;
                this.showMap = false;
                this.displayPaths = false;
                this.hideWindows = false;
                this.mapOptions = { center: { latitude: -19.127466, longitude: 133.656831 }, zoom: 6 };
                this.markers = [];
                this.polylines = [];
                this.connection = null;
                this.proxy = null;
                this.markerEvents = {
                    click: function (mapModel, eventName, angArgs, args) {
                        var element = Enumerable.From(_this.markers).FirstOrDefault(null, function (x) { return x.marker.id === angArgs.idKey; });
                        var markerTile = _this.markerTileService.getMarkerTileByType(element.roadConditionType);
                        _this.$uibModal.open({
                            animation: true,
                            templateUrl: '/App/views/modals/map-object-details-panel.html',
                            controller: 'mapObjectDetailsPanelController',
                            windowTopClass: markerTile.modalClass,
                            resolve: {
                                modalData: function () {
                                    return {
                                        element: element,
                                        imagePath: markerTile.filePath
                                    };
                                }
                            }
                        });
                    }
                };
                $scope.vm = this;
                window['test'] = this;
                uiGmapGoogleMapApi.then(function (maps) {
                    _this.showMap = true;
                });
                this.getAllMapObjects();
                //this.setupSignalrConnection();
            }
            RoadMapController.prototype.setupSignalrConnection = function () {
                var _this = this;
                this.signalrDataService.setupConnection();
                var proxyTest = this.signalrDataService.proxy;
                proxyTest.on('mapUpdated', function (event) {
                    _this.getAllMapObjects();
                });
                this.signalrDataService.start();
            };
            RoadMapController.prototype.getAllMapObjects = function () {
                var _this = this;
                this.mapDataService.getAllMapObjects().then(function (response) {
                    _this.markers = response.data;
                    _this.polylines.length = 0;
                    for (var i = 0; i < _this.markers.length; i++) {
                        _this.markers[i].paths.forEach(function (element) {
                            _this.polylines.push(element);
                        });
                    }
                    ;
                });
            };
            RoadMapController.prototype.showHazardField = function (value) {
                return value === RoadWatch.Models.RoadConditionTypes.Harzard;
            };
            RoadMapController.prototype.showCollisionField = function (value) {
                return value === RoadWatch.Models.RoadConditionTypes.VehicleCollision;
            };
            RoadMapController.prototype.closeWindow = function (id) {
                Enumerable.From(this.markers)
                    .FirstOrDefault(null, function (x) { return x.marker.id === id; }).marker.windowOptions.visible = false;
            };
            RoadMapController.$inject = ['$scope', '$window',
                'uiGmapGoogleMapApi', 'mapDataService',
                'markerTileService', '$uibModal',
                'signalrDataService'];
            return RoadMapController;
        }());
        Controllers.RoadMapController = RoadMapController;
    })(Controllers = RoadWatch.Controllers || (RoadWatch.Controllers = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=road-map-controller.js.map