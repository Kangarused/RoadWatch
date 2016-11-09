var RoadWatch;
(function (RoadWatch) {
    var Controllers;
    (function (Controllers) {
        var NewAnnouncementController = (function () {
            function NewAnnouncementController($scope, $modalInstance, $validation, announcementDataService, modalData) {
                this.$scope = $scope;
                this.$modalInstance = $modalInstance;
                this.$validation = $validation;
                this.announcementDataService = announcementDataService;
                this.modalData = modalData;
                $scope.vm = this;
                if (modalData.element != null) {
                    this.new = modalData.element;
                }
            }
            NewAnnouncementController.prototype.saveAnnouncement = function (form) {
                var _this = this;
                this.$validation.validate(form)
                    .success(function () {
                    _this.announcementDataService.saveAnnouncement(_this.new).then(function (response) {
                        if (response.data.succeed) {
                            toastr.success(response.data.response);
                            _this.$modalInstance.close(true);
                        }
                        else {
                            toastr.error(response.data.response);
                        }
                    }, function (error) {
                        toastr.error("Failed to save announcement: " + error.statusText);
                    });
                }, function (error) {
                    toastr.error("Failed to save announcement, please fill out the required fields");
                });
            };
            NewAnnouncementController.prototype.cancel = function () {
                this.$modalInstance.dismiss('cancel');
            };
            NewAnnouncementController.$inject = ['$scope', '$uibModalInstance', '$validation', 'announcementDataService', 'modalData'];
            return NewAnnouncementController;
        }());
        Controllers.NewAnnouncementController = NewAnnouncementController;
    })(Controllers = RoadWatch.Controllers || (RoadWatch.Controllers = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=new-announcement-controller.js.map