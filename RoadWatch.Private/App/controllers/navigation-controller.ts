module RoadWatch.Controllers {

    export class NavigationController {
        static $inject = ['$scope', 'announcementDataService', '$uibModal'];

        constructor(private $scope: IWatchScope, 
            private announcementDataService: Services.IAnnouncementsDataService,
            private $uibModal: ng.ui.bootstrap.IModalService
        ) {
            $scope.vm = this;
        }

        private createNewAnnouncement() {
            var modalInstance = this.$uibModal.open({
                animation: true,
                templateUrl: '/App/views/modals/new-announcement.html',
                controller: 'newAnnouncementController',
                resolve: {
                    modalData: () => {
                        return {
                            element: null
                        };
                    }
                }
            });

            modalInstance.result.then(confirm => {});
        }
    }
}