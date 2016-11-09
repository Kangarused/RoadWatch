module RoadWatch.Controllers {
    export class AnnouncementsController {
        static $inject = ['$scope', 'announcementDataService', 'signalrDataService'];

        dataSet = <Models.IPagedResponse<Models.IAnnouncement>>{ items: [] };
        cachedFilter = <Models.IAnnouncementFilter>{ page: 1, pageSize: 10, orderDirection: "dsc" };

        searchFilterCollapsed = true;

        constructor(
            private $scope,
            private announcementDataService: Services.IAnnouncementsDataService,
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
    }
}