var RoadWatch;
(function (RoadWatch) {
    var Controllers;
    (function (Controllers) {
        var MapObjectEditorController = (function () {
            function MapObjectEditorController($scope, $modalInstance, modalData) {
                var _this = this;
                this.$scope = $scope;
                this.$modalInstance = $modalInstance;
                this.modalData = modalData;
                this.conditionTypes = RoadWatch.Models.RoadConditionTypes;
                this.collisionTypes = RoadWatch.Models.CollisionTypes;
                this.hazardTypes = RoadWatch.Models.HazardTypes;
                this.effectTypes = RoadWatch.Models.ConditionEffectTypes;
                this.floodingTypes = RoadWatch.Models.FloodingTypes;
                this.highlightRoad = function () {
                    _this.$modalInstance.close({ action: 'draw', element: _this.mapObject });
                };
                this.lockObject = function () {
                    _this.$modalInstance.close({ action: 'lock', element: _this.mapObject });
                };
                this.removeObject = function () {
                    _this.$modalInstance.close({ action: 'remove', element: _this.mapObject });
                };
                this.cancel = function () {
                    _this.$modalInstance.close({ action: '', element: _this.mapObject });
                };
                $scope.vm = this;
                this.mapObject = modalData.element;
                if (this.mapObject.conditionEffects == null) {
                    this.mapObject.conditionEffects = [];
                }
            }
            MapObjectEditorController.prototype.getWindowLockText = function () {
                if (this.mapObject.marker.options.draggable) {
                    return "Lock Marker and Paths";
                }
                return "Unlock Marker and Paths";
            };
            MapObjectEditorController.prototype.addConditionEffect = function () {
                this.mapObject.conditionEffects.push({});
            };
            MapObjectEditorController.prototype.removeConditionEffect = function (index) {
                this.mapObject.conditionEffects.splice(index, 1);
            };
            MapObjectEditorController.prototype.showHazardField = function (value) {
                return value === RoadWatch.Models.RoadConditionTypes.Harzard;
            };
            MapObjectEditorController.prototype.showFloodingField = function (value) {
                return value === RoadWatch.Models.RoadConditionTypes.Flooding;
            };
            MapObjectEditorController.prototype.showSpecialEventField = function (value) {
                return value === RoadWatch.Models.RoadConditionTypes.SpecialEvent;
            };
            MapObjectEditorController.prototype.showCollisionField = function (value) {
                return value === RoadWatch.Models.RoadConditionTypes.VehicleCollision;
            };
            MapObjectEditorController.prototype.showCommonField = function (value) {
                return (value === RoadWatch.Models.RoadConditionTypes.Closure || value === RoadWatch.Models.RoadConditionTypes.Roadworks);
            };
            MapObjectEditorController.prototype.getCommonFieldText = function (value) {
                if (value === RoadWatch.Models.RoadConditionTypes.Roadworks) {
                    return "Roadworks Duration";
                }
                return "Closure Reason";
            };
            MapObjectEditorController.$inject = ['$scope', '$uibModalInstance', 'modalData'];
            return MapObjectEditorController;
        }());
        Controllers.MapObjectEditorController = MapObjectEditorController;
    })(Controllers = RoadWatch.Controllers || (RoadWatch.Controllers = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=map-object-editor-controller.js.map