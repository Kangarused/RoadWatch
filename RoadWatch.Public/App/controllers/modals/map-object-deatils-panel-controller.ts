module RoadWatch.Controllers {
    export class MapObjectDetailsPanelController {
        static $inject = ['$scope', '$uibModalInstance', 'modalData'];

        conditionTypes = Models.RoadConditionTypes;
        collisionTypes = Models.CollisionTypes;
        hazardTypes = Models.HazardTypes;
        effectTypes = Models.ConditionEffectTypes;

        mapObject: Models.IMapObject;

        constructor(
            private $scope,
            private $modalInstance,
            private modalData
        ) {
            $scope.vm = this;
            this.mapObject = modalData.element;
            if (this.mapObject.conditionEffects == null) {
                this.mapObject.conditionEffects = [];
            }
        }

        private showHazardField(value: string): boolean {
            return value === Models.RoadConditionTypes.Harzard;
        }

        private showSpecialEventField(value: string): boolean {
            return value === Models.RoadConditionTypes.SpecialEvent;
        }

        private showCollisionField(value: string): boolean {
            return value === Models.RoadConditionTypes.VehicleCollision;
        }

        private showRoadworksField(value: string): boolean {
            return value === Models.RoadConditionTypes.Roadworks;
        }

        private showClosureField(value: string): boolean {
            return value === Models.RoadConditionTypes.Closure;
        }

        private showFloodingField(value: string): boolean {
            return value === Models.RoadConditionTypes.Flooding;
        }

        private cancel = () => {
            this.$modalInstance.dismiss({ action: null, element: this.mapObject });
        }
    }
}