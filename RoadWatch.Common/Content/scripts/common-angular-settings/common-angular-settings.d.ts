/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-cookies.d.ts" />
/// <reference path="../typings/angularjs/angular-sanitize.d.ts" />
/// <reference path="../typings/google-maps/google.maps.d.ts" />
/// <reference path="../typings/signalr/signalr.d.ts" />
/// <reference path="../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../typings/angular-pubsub/angular-pubsub.d.ts" />
/// <reference path="../typings/angular-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="../typings/linqjs/linq.d.ts" />
/// <reference path="../typings/toastr/toastr.d.ts" />
/// <reference path="../typings/moment/moment.d.ts" />

declare var angularApplication: ng.IModule;
declare var emailAddresses: any;

declare module RoadWatch.Models {
    export interface IPagedResponse<T> {
        items: T[];
        numRecords: number;
    }
    export interface IResponseObject<T> {
        data: T;
    }

    export interface IActionResponse {
        succeed: boolean;
        errors: string[];
    }

    export interface IActionResponseGeneric<T> extends IActionResponse {
        response: T;
    }
}

declare module RoadWatch {

    export interface IEnumDescripitons {
        get(enumType: string, key: string): string;
    }

    export interface IWatchScope extends ng.IScope {
        vm: any;
        enumDescriptions: IEnumDescripitons;
    }
}