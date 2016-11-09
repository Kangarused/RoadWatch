var RoadWatch;
(function (RoadWatch) {
    var Controllers;
    (function (Controllers) {
        var ConfirmModalController = (function () {
            function ConfirmModalController($scope, $modalInstance, modalData) {
                var _this = this;
                this.$scope = $scope;
                this.$modalInstance = $modalInstance;
                this.modalData = modalData;
                this.ok = function () {
                    _this.$modalInstance.close(true);
                };
                this.cancel = function () {
                    _this.$modalInstance.dismiss('cancel');
                };
                $scope.vm = this;
            }
            ConfirmModalController.$inject = ['$scope', '$uibModalInstance', 'modalData'];
            return ConfirmModalController;
        }());
        Controllers.ConfirmModalController = ConfirmModalController;
    })(Controllers = RoadWatch.Controllers || (RoadWatch.Controllers = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=confirm-modal-controller.js.map