module RoadWatch.Services {
    export interface IAnnouncementsDataService {
        getPagedAnnouncements(filter: RoadWatch.Models.IAnnouncementFilter): ng.IHttpPromise<Models.IPagedResponse<Models.IAnnouncement>>;
        saveAnnouncement(announcement: Models.IAnnouncement): ng.IHttpPromise<Models.IActionResponseGeneric<string>>;
        deleteAnnouncement(announcement: Models.IAnnouncement): ng.IHttpPromise<Models.IActionResponseGeneric<string>>;
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

        saveAnnouncement(announcement: Models.IAnnouncement): ng.IHttpPromise<Models.IActionResponseGeneric<string>> {
            return this.$http.post("/api/announcement/saveAnnouncement", announcement);
        }

        deleteAnnouncement(announcement: Models.IAnnouncement): ng.IHttpPromise<Models.IActionResponseGeneric<string>> {
            return this.$http.post("/api/announcement/deleteAnnouncement", announcement);
        }
    }
}