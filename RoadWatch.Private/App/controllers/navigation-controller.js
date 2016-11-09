var RoadWatch;
(function (RoadWatch) {
    var Controllers;
    (function (Controllers) {
        var NavigationController = (function () {
            function NavigationController($scope, announcementDataService, $uibModal) {
                this.$scope = $scope;
                this.announcementDataService = announcementDataService;
                this.$uibModal = $uibModal;
                $scope.vm = this;
            }
            NavigationController.prototype.createNewAnnouncement = function () {
                var modalInstance = this.$uibModal.open({
                    animation: true,
                    templateUrl: '/App/views/modals/new-announcement.html',
                    controller: 'newAnnouncementController',
                    resolve: {
                        modalData: function () {
                            return {
                                element: null
                            };
                        }
                    }
                });
                modalInstance.result.then(function (confirm) { });
            };
            NavigationController.$inject = ['$scope', 'announcementDataService', '$uibModal'];
            return NavigationController;
        }());
        Controllers.NavigationController = NavigationController;
    })(Controllers = RoadWatch.Controllers || (RoadWatch.Controllers = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=navigation-controller.js.map