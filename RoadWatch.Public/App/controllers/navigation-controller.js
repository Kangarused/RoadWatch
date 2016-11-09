var RoadWatch;
(function (RoadWatch) {
    var Controllers;
    (function (Controllers) {
        var NavigationController = (function () {
            function NavigationController($scope, $uibModal) {
                this.$scope = $scope;
                this.$uibModal = $uibModal;
                $scope.vm = this;
            }
            NavigationController.prototype.reportRoadCondition = function () {
                var modalInstance = this.$uibModal.open({
                    animation: true,
                    templateUrl: '/App/views/modals/report-road-condition.html',
                    controller: 'reportRoadConditionController'
                });
                modalInstance.result.then(function (confirm) { });
            };
            NavigationController.$inject = ['$scope', '$uibModal'];
            return NavigationController;
        }());
        Controllers.NavigationController = NavigationController;
    })(Controllers = RoadWatch.Controllers || (RoadWatch.Controllers = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=navigation-controller.js.map