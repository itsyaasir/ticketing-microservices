import { Message, Stan } from "node-nats-streaming";

export abstract class Listener {  // abstract method to be implemented by child classes
    private client: Stan;  //  Stan client
    abstract subject: string;
    abstract queueGroupName: string;
    protected ackWait = 5 * 1000;  // ack wait time
    abstract onMessage(data: any, msg: Message): void;

    constructor(client: Stan) {  // constructor to initialize client
        this.client = client;
    }

    subscriptionOptions() {  // options for subscription
        return this.client
            .subscriptionOptions()  // get subscription options
            .setDeliverAllAvailable()  // deliver all available messages
            .setManualAckMode(true)  // manual ack mode
            .setAckWait(this.ackWait)  // ack wait time
            .setDurableName(this.queueGroupName);  // durable name
    }

    listen() {  // listen to subject
        const subscription = this.client.subscribe(  // subscribe to subject
            this.subject,  // subject
            this.queueGroupName,  // queue group name
            this.subscriptionOptions()  // subscription options
        );

        subscription.on("message", (msg: Message) => {  // on message
            console.log(
                `Message recieved: ${this.subject} / ${this.queueGroupName}`
            );

            const parsedData = this.parseMessage(msg);  // parse message
            this.onMessage(parsedData, msg);  // call onMessage method
        });
    }

    parseMessage(msg: Message) {  // parse message
        const data = msg.getData();  // get data
        return typeof data === "string"  // check if data is string
            ? JSON.parse(data)  // parse data
            : JSON.parse(data.toString("utf-8"))  // parse data
    }
}
