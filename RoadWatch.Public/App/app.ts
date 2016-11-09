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
                $state.go("home");
            });

            $stateProvider.state("home",
            {
                url: "/home",
                views: {
                    "main-body": {
                        controller: 'homeController',
                        templateUrl: "App/views/home.html"
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
    .controller('homeController', RoadWatch.Controllers.HomeController)
    .controller('roadMapController', RoadWatch.Controllers.RoadMapController)
    .controller('roadReportsController', RoadWatch.Controllers.RoadReportsController)
    .controller('announcementsController', RoadWatch.Controllers.AnnouncementsController)
    .controller('reportRoadConditionController', RoadWatch.Controllers.ReportRoadConditionController)
    .controller('mapObjectDetailsPanelController', RoadWatch.Controllers.MapObjectDetailsPanelController)
    .service('mapDataService', RoadWatch.Services.MapDataService)
    .service('reportDataService', RoadWatch.Services.ReportDataService)
    .service('markerTileService', RoadWatch.Services.MarkerTileService)
    .service('signalrDataService', RoadWatch.Services.SignalrDataService)
    .service('announcementDataService', RoadWatch.Services.AnnouncementsDataService);