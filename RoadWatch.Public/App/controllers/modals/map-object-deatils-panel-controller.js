var RoadWatch;
(function (RoadWatch) {
    var Controllers;
    (function (Controllers) {
        var MapObjectDetailsPanelController = (function () {
            function MapObjectDetailsPanelController($scope, $modalInstance, modalData) {
                var _this = this;
                this.$scope = $scope;
                this.$modalInstance = $modalInstance;
                this.modalData = modalData;
                this.conditionTypes = RoadWatch.Models.RoadConditionTypes;
                this.collisionTypes = RoadWatch.Models.CollisionTypes;
                this.hazardTypes = RoadWatch.Models.HazardTypes;
                this.effectTypes = RoadWatch.Models.ConditionEffectTypes;
                this.cancel = function () {
                    _this.$modalInstance.dismiss({ action: null, element: _this.mapObject });
                };
                $scope.vm = this;
                this.mapObject = modalData.element;
                if (this.mapObject.conditionEffects == null) {
                    this.mapObject.conditionEffects = [];
                }
            }
            MapObjectDetailsPanelController.prototype.showHazardField = function (value) {
                return value === RoadWatch.Models.RoadConditionTypes.Harzard;
            };
            MapObjectDetailsPanelController.prototype.showSpecialEventField = function (value) {
                return value === RoadWatch.Models.RoadConditionTypes.SpecialEvent;
            };
            MapObjectDetailsPanelController.prototype.showCollisionField = function (value) {
                return value === RoadWatch.Models.RoadConditionTypes.VehicleCollision;
            };
            MapObjectDetailsPanelController.prototype.showRoadworksField = function (value) {
                return value === RoadWatch.Models.RoadConditionTypes.Roadworks;
            };
            MapObjectDetailsPanelController.prototype.showClosureField = function (value) {
                return value === RoadWatch.Models.RoadConditionTypes.Closure;
            };
            MapObjectDetailsPanelController.prototype.showFloodingField = function (value) {
                return value === RoadWatch.Models.RoadConditionTypes.Flooding;
            };
            MapObjectDetailsPanelController.$inject = ['$scope', '$uibModalInstance', 'modalData'];
            return MapObjectDetailsPanelController;
        }());
        Controllers.MapObjectDetailsPanelController = MapObjectDetailsPanelController;
    })(Controllers = RoadWatch.Controllers || (RoadWatch.Controllers = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=map-object-deatils-panel-controller.js.map