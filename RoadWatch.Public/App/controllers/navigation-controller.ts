module RoadWatch.Controllers {

    export class NavigationController {
        static $inject = ['$scope', '$uibModal'];

        constructor(private $scope: IWatchScope,
            private $uibModal: ng.ui.bootstrap.IModalService
        ) {
            $scope.vm = this;
        }

        reportRoadCondition() {
            var modalInstance = this.$uibModal.open({
                animation: true,
                templateUrl: '/App/views/modals/report-road-condition.html',
                controller: 'reportRoadConditionController'
            });

            modalInstance.result.then(confirm => {});
        }
    }
}