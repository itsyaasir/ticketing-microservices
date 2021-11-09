import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {  // Child class of Listener class
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = "payments-service";
    onMessage(data: TicketCreatedEvent['data'], msg: Message) {  // on message
        console.log("You got data", data);
        msg.ack();  // acknowledge message
    }
}