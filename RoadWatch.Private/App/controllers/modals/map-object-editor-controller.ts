module RoadWatch.Controllers {
    export class MapObjectEditorController
    {
        static $inject = ['$scope', '$uibModalInstance', 'modalData'];

        conditionTypes = Models.RoadConditionTypes;
        collisionTypes = Models.CollisionTypes;
        hazardTypes = Models.HazardTypes;
        effectTypes = Models.ConditionEffectTypes;
        floodingTypes = Models.FloodingTypes;

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

        private getWindowLockText(): string {
            if (this.mapObject.marker.options.draggable) {
                return "Lock Marker and Paths";
            }
            return "Unlock Marker and Paths";
        }

        private addConditionEffect(): void {
            this.mapObject.conditionEffects.push(<Models.IConditionEffect>{});
        }

        private removeConditionEffect(index: number): void {
            this.mapObject.conditionEffects.splice(index, 1);
        }

        private showHazardField(value: string): boolean {
            return value === Models.RoadConditionTypes.Harzard;
        }

        private showFloodingField(value: string): boolean {
            return value === Models.RoadConditionTypes.Flooding;
        }

        private showSpecialEventField(value: string): boolean {
            return value === Models.RoadConditionTypes.SpecialEvent;
        }

        private showCollisionField(value: string): boolean {
            return value === Models.RoadConditionTypes.VehicleCollision;
        }

        private showCommonField(value: string): boolean {
            return (value === Models.RoadConditionTypes.Closure || value === Models.RoadConditionTypes.Roadworks);
        }

        private getCommonFieldText(value: string): string {
            if (value === Models.RoadConditionTypes.Roadworks) {
                return "Roadworks Duration";
            }
            return "Closure Reason";
        }

        private highlightRoad = () => {
            this.$modalInstance.close({action: 'draw', element: this.mapObject});
        }

        private lockObject = () => {
            this.$modalInstance.close({ action: 'lock', element: this.mapObject });
        }

        private removeObject = () => {
            this.$modalInstance.close({ action: 'remove', element: this.mapObject });
        }

        private cancel = () => {
            this.$modalInstance.close({ action: '', element: this.mapObject });
        }
    }
} 