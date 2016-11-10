module RoadWatch.Controllers {
    export class AnnouncementsController {
        static $inject = ['$scope', 'announcementDataService', '$uibModal', 'signalrDataService'];

        dataSet = <Models.IPagedResponse<Models.IAnnouncement>>{ items: [] };
        cachedFilter = <Models.IAnnouncementFilter>{ page: 1, pageSize: 10, orderDirection: "dsc" };

        searchFilterCollapsed = true;

        constructor(
            private $scope,
            private announcementDataService: Services.IAnnouncementsDataService,
            private $uibModal,
            private signalrDataService: Services.ISignalrDataService
        ) {
            $scope.vm = this;
            this.getData();
            this.setupSignalrConnection();
        }

        private setupSignalrConnection() {
            this.signalrDataService.setupConnection();
            var proxyTest = this.signalrDataService.proxy;
            proxyTest.on('announcementsUpdated', (event) => {
                this.cachedFilter.initialDate = null;
                this.cachedFilter.finalDate = null;
                this.getData();
            });
            this.signalrDataService.start();
        }

        private resetFilter() {
            this.cachedFilter = <Models.IAnnouncementFilter>{ page: 1, pageSize: 10, orderDirection: "dsc" };
            this.cachedFilter.initialDate = null;
            this.cachedFilter.finalDate = null;
            this.getData();
        }

        private getData() {
            this.announcementDataService.getPagedAnnouncements(this.cachedFilter).then((response) => {
                this.dataSet = response.data;
                return response;
            });
        }

        private deleteAnnouncement(announcement: Models.IAnnouncement): void {
            var modalInstance = this.$uibModal.open({
                animation: true,
                templateUrl: '/App/views/modals/confirm-modal.html',
                controller: 'confirmModalController',
                resolve: {
                    modalData: () => {
                        return {
                            modalHead: 'Delete Announcement',
                            modalBody: 'Are you sure you want to delete this announcement?'
                        };
                    }
                }
            });

            modalInstance.result.then(confirm => {
                if (confirm) {
                    this.announcementDataService.deleteAnnouncement(announcement).then((response) => {
                        toastr.success(response.data.response);
                        this.getData();
                    });
                }
            });
        } 

        private editAnnouncement(announcement: Models.IAnnouncement): void {
            var modalInstance = this.$uibModal.open({
                animation: true,
                templateUrl: '/App/views/modals/new-announcement.html',
                controller: 'newAnnouncementController',
                resolve: {
                    modalData: () => {
                        return {
                            element: announcement
                        };
                    }
                }
            });

            modalInstance.result.then(confirm => {});
        }
    }
}