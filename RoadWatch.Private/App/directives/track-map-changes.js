var RoadWatch;
(function (RoadWatch) {
    var Directives;
    (function (Directives) {
        var TrackMapChanges = (function () {
            function TrackMapChanges($rootScope, $uibModal, $state, trackMapChangesService) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$uibModal = $uibModal;
                this.$state = $state;
                this.trackMapChangesService = trackMapChangesService;
                this.restrict = 'A';
                this.link = function (scope, element, attrs, ctrl) {
                    var modalOpen = false;
                    scope.$on('$stateChangeStart', function (event, toState, toParams) {
                        if (_this.trackMapChangesService.changesMade > 0) {
                            event.preventDefault();
                            if (modalOpen)
                                return;
                            modalOpen = true;
                            function changesController($scope, uibModalInstance, $state, trackMapChangesService) {
                                $scope.ok = function () {
                                    uibModalInstance.close();
                                    trackMapChangesService.reset();
                                    $state.go(toState, toParams);
                                };
                                $scope.cancel = function () {
                                    uibModalInstance.close();
                                    modalOpen = false;
                                };
                            }
                            changesController
                                .$inject = ['$scope', '$uibModalInstance', '$state', 'trackMapChangesService']; //for minification
                            _this.$uibModal.open({
                                template: '<div class="modal-header"><h3 class="modal-title">Unsaved changes</h3></div>' +
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
                };
            }
            TrackMapChanges.factory = function () {
                var directive = function ($rootScope, $modal, $state, trackMapChangesService) { return new TrackMapChanges($rootScope, $modal, $state, trackMapChangesService); };
                directive.$inject = ['$rootScope', '$uibModal', '$state', 'trackMapChangesService'];
                return directive;
            };
            return TrackMapChanges;
        }());
        Directives.TrackMapChanges = TrackMapChanges;
    })(Directives = RoadWatch.Directives || (RoadWatch.Directives = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=track-map-changes.js.map