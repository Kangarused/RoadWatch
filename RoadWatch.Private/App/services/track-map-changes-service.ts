module RoadWatch.Services {
    export interface ITrackMapChangesService {
        changesMade: number;
        reset();
        updateChanges(value: number) ;
    }

    export class TrackMapChangesService implements ITrackMapChangesService {

        public changesMade: number;

        static $inject = ['$state', '$rootScope'];
        constructor(private $state, private $rootScope) {

        }

        reset(): void {
            this.changesMade = 0;
        };

        updateChanges(value: number) {
            this.changesMade = value;
        }
    }
}