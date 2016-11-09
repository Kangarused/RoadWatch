/// <reference path="../../RoadWatch.Common/Content/scripts/common-angular-settings/common-angular-settings.d.ts" />

declare var roadWatchSettings: RoadWatch.Models.IPublicSettings;

declare module RoadWatch.Models {
    export interface IExternalAuthData {
        haslocalaccount: boolean;
        provider: string;
        external_user_name: string;
        external_access_token: string;
    }

    export interface ICurrentUser {
        name: string;
        role: string;
        id: number;
    }

    export interface ILocalAccessToken {
        access_token: string;
        name: string;
        role: string;
        id: number;
    }
}

declare module RoadWatch.Services {
    export interface ILocalStorageService {
        remove(authorizationdata: string);
        set(authorizationdata: string, p: any);
        get(authorizationData: string): any;
    }
}

declare module RoadWatch.Routes { }
declare module RoadWatch.Events { }