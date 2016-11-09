var RoadWatch;
(function (RoadWatch) {
    var Services;
    (function (Services) {
        var SignalrDataService = (function () {
            function SignalrDataService($rootScope) {
                this.$rootScope = $rootScope;
                this.connection = null;
                this.proxy = null;
            }
            SignalrDataService.prototype.setupConnection = function () {
                //Setup web-socket connection using Signalr
                //this.connection = $.hubConnection('http://localhost:2054/signalr');
                this.connection = $.hubConnection('http://104.196.228.226/signalr');
                this.proxy = this.connection.createHubProxy('roadWatchHub');
            };
            SignalrDataService.prototype.start = function () {
                this.connection.start();
            };
            SignalrDataService.prototype.isConnecting = function () {
                return this.connection.state === 0;
            };
            SignalrDataService.prototype.isConnected = function () {
                return this.connection.state === 1;
            };
            SignalrDataService.prototype.connectionState = function () {
                return this.connection.state;
            };
            SignalrDataService.$inject = ['$rootScope'];
            return SignalrDataService;
        }());
        Services.SignalrDataService = SignalrDataService;
    })(Services = RoadWatch.Services || (RoadWatch.Services = {}));
})(RoadWatch || (RoadWatch = {}));
//# sourceMappingURL=signalr-data-service.js.map