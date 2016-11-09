var angularApplication = angular.module('roadWatch',
    [
        'ui.router',
        'ngAnimate',
        "ngSanitize",
        "ngTouch",
        "ngMessages",
        "validation",
        "validation.rule",
        "validation.schema",
        'nemLogging',
        'uiGmapgoogle-maps',
        'CaseFilter',
        'ui.bootstrap',
        'datetimepicker',
        'PubSub'
    ])
    .constant("settings", roadWatchSettings)
    .config((uiGmapGoogleMapApiProvider) => {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyCmq2yT3zYiQ1R6uWcP5mB_R_8WnZeJySQ',
            v: '3.25',
            libraries: 'geometry,visualization'
        });
    })
    .config([
        "$stateProvider", "$urlRouterProvider",
        ($stateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {

            $urlRouterProvider.otherwise(($injector, $location) => {
                var $state = $injector.get("$state");
                $state.go("public-reports");
            });

            $stateProvider.state("public-reports",
            {
                url: "/public-reports",
                views: {
                    "main-body": {
                        controller: 'publicReportsController',
                        templateUrl: "App/views/public-reports.html"
                    }
                }
            });

            $stateProvider.state("announcements",
            {
                url: "/announcements",
                views: {
                    "main-body": {
                        controller: 'announcementsController',
                        templateUrl: "App/views/announcements.html"
                    }
                }
            });

            $stateProvider.state("road-reports",
            {
                url: "/road-reports",
                views: {
                    "main-body": {
                        controller: 'roadReportsController',
                        templateUrl: "App/views/road-reports.html"
                    }
                }
            });

            $stateProvider.state("road-map",
            {
                url: "/road-map",
                views: {
                    "main-body": {
                        controller: 'roadMapController',
                        templateUrl: "App/views/road-map.html"
                    }
                }
            });
        }
    ])
    .run([
        '$rootScope', ($rootScope) => {
            $rootScope.enumDescriptions = RoadWatch.Models.EnumLabelDictionary;
        }
    ])
    .controller('navigationController', RoadWatch.Controllers.NavigationController)
    .controller('publicReportsController', RoadWatch.Controllers.PublicReportsController)
    .controller('roadReportsController', RoadWatch.Controllers.RoadReportsController)
    .controller('roadMapController', RoadWatch.Controllers.RoadMapController)
    .controller('announcementsController', RoadWatch.Controllers.AnnouncementsController)
    .controller('confirmModalController', RoadWatch.Controllers.ConfirmModalController)
    .controller('mapObjectEditorController', RoadWatch.Controllers.MapObjectEditorController)
    .controller('newAnnouncementController', RoadWatch.Controllers.NewAnnouncementController)
    .service('mapDataService', RoadWatch.Services.MapDataService)
    .service('reportDataService', RoadWatch.Services.ReportDataService)
    .service('markerTileService', RoadWatch.Services.MarkerTileService)
    .service('trackMapChangesService', RoadWatch.Services.TrackMapChangesService)
    .service('announcementDataService', RoadWatch.Services.AnnouncementsDataService)
    .service('signalrDataService', RoadWatch.Services.SignalrDataService)
    .directive('trackMapChanges', RoadWatch.Directives.TrackMapChanges.factory());