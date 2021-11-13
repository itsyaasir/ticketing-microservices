import { Publisher, Subjects, Listener, TicketCreatedEvent } from "@itsyasir/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}