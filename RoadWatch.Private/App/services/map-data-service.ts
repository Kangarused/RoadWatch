module RoadWatch.Services {
    export interface IMapDataService {
        getAllMapObjects(): ng.IHttpPromise<Models.IMapObject[]>;
        saveMapObjects(mapObjects: Models.IMapObjectCollection): ng.IHttpPromise<Models.IActionResponseGeneric<string>>;
        deleteMapObject(mapObject: Models.IMapObject): ng.IHttpPromise<Models.IActionResponseGeneric<string>>;
    }

    export class MapDataService implements IMapDataService {
        static $inject = ['$http']; 
        constructor (
            private $http
        ) {
            
        }

        getAllMapObjects(): ng.IHttpPromise<Models.IMapObject[]> {
            return this.$http.get("/api/map/getMapObjectsEditable");
        }

        saveMapObjects(mapObjects: Models.IMapObjectCollection): ng.IHttpPromise<Models.IActionResponseGeneric<string>> {
            return this.$http.post("/api/map/saveMapObjects", mapObjects);
        }

        deleteMapObject(mapObject: Models.IMapObject): ng.IHttpPromise<Models.IActionResponseGeneric<string>> {
            return this.$http.post("api/map/deleteMapObject", mapObject);
        }
    }
}