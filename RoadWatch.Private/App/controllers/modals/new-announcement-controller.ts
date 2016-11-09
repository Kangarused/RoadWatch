module RoadWatch.Controllers {
    export class NewAnnouncementController {
        static $inject = ['$scope', '$uibModalInstance', '$validation', 'announcementDataService', 'modalData'];

        new: Models.IAnnouncement;

        constructor(
            private $scope,
            private $modalInstance,
            private $validation,
            private announcementDataService: Services.IAnnouncementsDataService,
            private modalData
        ) {
            $scope.vm = this;
            if (modalData.element != null) {
                this.new = modalData.element;
            }
        }

        saveAnnouncement(form) {
            this.$validation.validate(form)
                .success(() => {
                    this.announcementDataService.saveAnnouncement(this.new).then(
                        (response) => {
                            if (response.data.succeed) {
                                toastr.success(response.data.response);
                                this.$modalInstance.close(true);
                            } else {
                                toastr.error(response.data.response);
                            }
                        }, (error) => {
                            toastr.error("Failed to save announcement: " + error.statusText);
                        });
                }, (error) => {
                    toastr.error("Failed to save announcement, please fill out the required fields");
                });
        }

        cancel() {
            this.$modalInstance.dismiss('cancel');
        }
    }
}