declare namespace ng {
    export interface IPubSubService {

        subscribe(topic: string, callback: (args) => any, once?: boolean): number;

        subscribeOnce(topic: string, callback: (args) => any): number;

        publish(topic: string, args: any): boolean;

        unsubscribe(topic: string): boolean;
        unsubscribe(instance: number): boolean;
    }
}