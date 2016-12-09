/****************************************************************************
  Generated by T4TS.tt - don't make any changes in this file
****************************************************************************/

declare module RoadWatch.Models {
    /** Generated from RoadWatch.Public.Models.PublicSettings **/
    export interface IPublicSettings {
        environment: string;
        buildVersion: string;
        databaseVersion: number;
        authClientId: string;
        isDebugMode: boolean;
    }
    /** Generated from RoadWatch.Private.Models.PrivateSettings **/
    export interface IPrivateSettings {
        currentUser: any;
        environment: string;
        isDebugMode: boolean;
        buildVersion: string;
        databaseVersion: number;
    }
    /** Generated from RoadWatch.Common.Dtos.AnnouncementFilter **/
    export interface IAnnouncementFilter extends RoadWatch.Models.IPagingFilter {
        title: string;
        content: string;
        initialDate: string;
        finalDate: string;
    }
    /** Generated from RoadWatch.Common.Dtos.PublicReportFilterRequest **/
    export interface IPublicReportFilterRequest extends RoadWatch.Models.IPagingFilter {
        roadConditionType: any;
        conditionType: string;
        area: string;
        road: string;
        date: string;
        additionalInformation: string;
    }
    /** Generated from RoadWatch.Common.Dtos.RoadConditionReportFilter **/
    export interface IRoadConditionReportFilter extends RoadWatch.Models.IPagingFilter {
        roadConditionType: any;
        condition: string;
        road: string;
        area: string;
        date: string;
    }
    /** Generated from RoadWatch.Common.Model.Announcement **/
    export interface IAnnouncement {
    }
    /** Generated from RoadWatch.Common.Model.Announcement **/
    export interface IAnnouncement {
        id: number;
        title: string;
        content: string;
        createdBy: string;
        createdTime: string;
        modifiedBy: string;
        modifiedTime: string;
    }
    /** Generated from RoadWatch.Common.Model.PublicReport **/
    export interface IPublicReport {
        id: number;
        roadConditionType: string;
        condition: string;
        road: string;
        area: string;
        additionalInformation: string;
        contactName: string;
        contactEmail: string;
        contactPhone: string;
        reportDate: string;
    }
    /** Generated from RoadWatch.Common.Model.RoadCondition **/
    export interface IRoadCondition {
        id: number;
        markerId: number;
        roadConditionType: string;
        condition: string;
        duration: string;
        conditionEffects: string;
        road: string;
        area: string;
        additionalInformation: string;
        mapObject: string;
        createdBy: string;
        createdTime: string;
        modifiedBy: string;
        modifiedTime: string;
    }
    /** Generated from RoadWatch.Common.Model.UserCredential **/
    export interface IUserCredential {
        id: number;
        userId: number;
        windowsUsername: string;
    }
    /** Generated from RoadWatch.Common.Model.UserRole **/
    export interface IUserRole {
        id: number;
        userId: number;
        role: string;
    }
    /** Generated from RoadWatch.Common.Model.MapMarkerTile **/
    export interface IMapMarkerTile {
        id: number;
        roadConditionType: any;
        collisionType: any;
        hazardType: any;
        filePath: string;
        name: string;
        description: string;
        color: string;
        modalClass: string;
    }
    /** Generated from RoadWatch.Common.Model.MapObjectCollection **/
    export interface IMapObjectCollection {
        collection: RoadWatch.Models.IMapObject[];
    }
    /** Generated from RoadWatch.Common.Model.MapObject **/
    export interface IMapObject {
        id: number;
        marker: RoadWatch.Models.IMarker;
        roadConditionType: any;
        condition: string;
        duration: string;
        conditionEffects: RoadWatch.Models.IConditionEffect[];
        additionalInformation: string;
        area: string;
        road: string;
        paths: RoadWatch.Models.IMapPath[];
    }
    /** Generated from RoadWatch.Common.Model.ConditionEffect **/
    export interface IConditionEffect {
        effect: any;
    }
    /** Generated from RoadWatch.Common.Model.Marker **/
    export interface IMarker {
        id: number;
        coords: RoadWatch.Models.ILatLng;
        options: RoadWatch.Models.IMarkerOptions;
        windowOptions: any;
    }
    /** Generated from RoadWatch.Common.Model.MarkerOptions **/
    export interface IMarkerOptions {
        icon: RoadWatch.Models.IIcon;
        draggable: boolean;
    }
    /** Generated from RoadWatch.Common.Model.Icon **/
    export interface IIcon {
        url: string;
        scaledSize: RoadWatch.Models.ISize;
    }
    /** Generated from RoadWatch.Common.Model.Size **/
    export interface ISize {
        width: number;
        height: number;
    }
    /** Generated from RoadWatch.Common.Model.MapPath **/
    export interface IMapPath {
        id: string;
        visible: boolean;
        editable: boolean;
        clickable: boolean;
        draggable: boolean;
        static: boolean;
        stroke: RoadWatch.Models.IStroke;
        windowOptions: RoadWatch.Models.IWindowOptions;
        path: RoadWatch.Models.ILatLng[];
    }
    /** Generated from RoadWatch.Common.Model.WindowOptions **/
    export interface IWindowOptions {
        visible: boolean;
    }
    /** Generated from RoadWatch.Common.Model.Stroke **/
    export interface IStroke {
        color: string;
        weight: number;
        opacity: number;
    }
    /** Generated from RoadWatch.Common.Model.LatLng **/
    export interface ILatLng {
        latitude: number;
        longitude: number;
    }
    /** Generated from RoadWatch.Common.Model.PagingFilter **/
    export interface IPagingFilter {
        disablePaging: boolean;
        page: number;
        pageSize: number;
        orderColumn: string;
        orderDirection: any;
    }
    /** Generated from RoadWatch.Common.Model.PublicReport **/
    export interface IPublicReport {
    }
    /** Generated from RoadWatch.Common.Model.RoadCondition **/
    export interface IRoadCondition {
    }
    /** Generated from RoadWatch.Common.Model.RoadConditionReport **/
    export interface IRoadConditionReport {
        roadConditionType: string;
        condition: string;
        conditionEffects: RoadWatch.Models.IConditionEffect[];
        road: string;
        area: string;
        additionalInformation: string;
        modifiedTime: string;
    }
    /** Generated from RoadWatch.Common.Model.UserCredential **/
    export interface IUserCredential {
    }
    /** Generated from RoadWatch.Common.Model.UserRole **/
    export interface IUserRole {
    }
}
