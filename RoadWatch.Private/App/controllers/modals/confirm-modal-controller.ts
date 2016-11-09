module RoadWatch.Controllers {
    export class ConfirmModalController {
        static $inject = ['$scope', '$uibModalInstance', 'modalData'];

        constructor(private $scope, private $modalInstance, private modalData) {
            $scope.vm = this;
        }

        ok = () => {
            this.$modalInstance.close(true);
        }

        cancel = () => {
            this.$modalInstance.dismiss('cancel');
        }
    }
}