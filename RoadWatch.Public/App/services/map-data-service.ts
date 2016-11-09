module RoadWatch.Services {
    export interface IMapDataService {
        getAllMapObjects(): ng.IHttpPromise<Models.IMapObject[]>;
    }

    export class MapDataService implements IMapDataService {
        static $inject = ['$http'];
        constructor(
            private $http
        ) {

        }

        getAllMapObjects(): ng.IHttpPromise<Models.IMapObject[]> {
            return this.$http.get("/api/map/getMapObjects");
        } 
    }
}