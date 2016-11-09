module RoadWatch.Services {
    export interface IAnnouncementsDataService {
        getPagedAnnouncements(filter: Models.IAnnouncementFilter): ng.IHttpPromise<Models.IPagedResponse<Models.IAnnouncement>>;
    }

    export class AnnouncementsDataService implements IAnnouncementsDataService {
        static $inject = ['$http'];

        constructor(
            private $http
        ) {
            
        }

        getPagedAnnouncements(filter: Models.IAnnouncementFilter): ng.IHttpPromise<Models.IPagedResponse<Models.IAnnouncement>> {
            return this.$http.post("/api/announcement/getPagedAnnouncements", filter);
        }
    }
}