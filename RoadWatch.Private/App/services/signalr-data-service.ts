module RoadWatch.Services {
    export interface ISignalrDataService {
        connection;
        proxy;

        setupConnection();
        start(): void;
        isConnecting(): boolean;
        isConnected(): boolean;
        connectionState();
    }

    export class SignalrDataService implements ISignalrDataService {
        static $inject = ['$rootScope'];

        public connection = null;
        public proxy = null;

        constructor(private $rootScope) {

        }

        setupConnection() {
            //Setup web-socket connection using Signalr
            this.connection = $.hubConnection();
            this.proxy = this.connection.createHubProxy('roadWatchHub');
        }

        start() {
            this.connection.start();
        }

        isConnecting(): boolean {
            return this.connection.state === 0;
        }

        isConnected(): boolean {
            return this.connection.state === 1;
        }

        connectionState() {
            return this.connection.state;
        }
    }
}