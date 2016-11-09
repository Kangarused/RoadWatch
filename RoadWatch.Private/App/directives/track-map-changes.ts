module RoadWatch.Directives {
    export class TrackMapChanges implements ng.IDirective {
        restrict = 'A';

        constructor(private $rootScope: ng.IRootScopeService, private $uibModal, private $state, private trackMapChangesService: Services.ITrackMapChangesService) {
        }

        link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {
            var modalOpen = false;
            scope.$on('$stateChangeStart', (event, toState, toParams) => {

                if (this.trackMapChangesService.changesMade > 0) {
                    event.preventDefault();

                    if (modalOpen) return;

                    modalOpen = true;

                    function changesController($scope, uibModalInstance, $state, trackMapChangesService) {
                        $scope.ok = () => {
                            uibModalInstance.close();
                            trackMapChangesService.reset();
                            $state.go(toState, toParams);
                        };
                        $scope.cancel = () => {
                            uibModalInstance.close();
                            modalOpen = false;
                        };
                    }

                    changesController
                        .$inject = ['$scope', '$uibModalInstance', '$state', 'trackMapChangesService']; //for minification


                    this.$uibModal.open({
                        template:
                        '<div class="modal-header"><h3 class="modal-title">Unsaved changes</h3></div>' +
                        '<div class="modal-body">' +
                        '<p>Are you sure you want to navigate away without saving?</p>' +
                        '<p><small>In order to save all objects you must use the save button positioned in the top right of the map</small></p>' +
                        '</div>' +
                        '<div class="modal-footer">' +
                        '<button class="btn btn-primary" ng-click= "ok()">Confirm</button>' +
                        '<button class="btn btn-default" ng-click="cancel()">Cancel</button>' +
                        '</div >',
                        controller: changesController,
                        backdrop: 'static',
                        keyboard: false,
                        size: ''
                    });
                }
            });
        }

        static factory(): ng.IDirectiveFactory {
            var directive: ($rootScope: ng.IRootScopeService, $modal: any, $state: any, trackMapChangesService: Services.ITrackMapChangesService) => TrackMapChanges = ($rootScope: ng.IRootScopeService, $modal, $state, trackMapChangesService) => new TrackMapChanges($rootScope, $modal, $state, trackMapChangesService);
            directive.$inject = ['$rootScope', '$uibModal', '$state', 'trackMapChangesService'];
            return directive;
        }
    }
}