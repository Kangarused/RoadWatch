var RoadWatch;
(function (RoadWatch) {
    var Controllers;
    (function (Controllers) {
        var AnnouncementsController = (function () {
            function AnnouncementsController($scope, announcementDataService, $uibModal, signalrDataService) {
                this.$scope = $scope;
                this.announcementDataService = announcementDataService;
                this.$uibModal = $uibModal;
                this.signalrDataService = signalrDataService;
                this.dataSet = { items: [] };
                this.cachedFilter = { page: 1, pageSize: 10, orderDirection: "dsc" };
                this.searchFilterCollapsed = true;
                $scope.vm = this;
                this.getData();
                //this.setupSignalrConnection();
            }
            AnnouncementsController.prototype.setupSignalrConnection = function () {
                var _this = this;
                this.signalrDataService.setupConnection();
                var proxyTest = this.signalrDataService.proxy;
                proxyTest.on('announcementsUpdated', function (event) {
                    _this.cachedFilter.initialDate = null;
                    _this.cachedFilter.finalDate = null;
                    _this.getData();
                });
                this.signalrDataService.start();
            };
            AnnouncementsController.prototype.resetFilter = function () {
                this.cachedFilter = { page: 1, pageSize: 10, orderDirection: "dsc" };
                this.cachedFilter.initialDate = null;
                this.cachedFilter.finalDate = null;
                this.getData();
            };
            AnnouncementsController.prototype.getData = function () {
                var _this = this;
                this.announcementDataService.getPagedAnnouncements(this.cachedFilter).then(function (response) {
                    _this.dataSet = response.data;
                    return response;
                });
            };
            AnnouncementsController.prototype.deleteAnnouncement = function (announcement) {
                var _this = this;
                var modalInstance = this.$uibModal.open({
                    animation: true,
                    templateUrl: '/App/views/modals/confirm-modal.html',
                    controller: 'confirmModalController',
                    resolve: {
                        modalData: function () {
                            return {
                                modalHead: 'Delete Announcement',
                                modalBody: 'Are you sure you want to delete this announcement?'
                            };
                        }
                    }
                });
                modalInstance.result.then(function (confirm) {
                    if (confirm) {
                        _this.announcementDataService.deleteAnnouncement(announcement).then(function (response) {
                            toastr.success(response.data.response);
                            _this.getData();
                        });
                    }
                });
            };
            AnnouncementsController.prototype.editAnnouncement = function (announcement) {
                var modalInstance = this.$uibModal.open({
                    animation: true,
                    templateUrl: '/App/views/modals/new-announcement.html',
                    controller: 'newAnnouncementController',
                    resolve: {
                        modalData: function () {
                            return {
                                element: announcement
                            };
                        }
                    }
                });
                modalInstance.result.then(function (confirm) { });
            };
            AnnouncementsController.$inject = ['$scope', 'announcementDataService', '$uibModal', 'signalrDataService'];
            return AnnouncementsController;
        }());
        Controllers.AnnouncementsController = AnnouncementsController;
    })(Controllers = RoadWatch.Controllers || (RoadWatch.Controllers = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=announcements-controller.js.map