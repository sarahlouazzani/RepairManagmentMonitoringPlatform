import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Ticket from './Ticket';

@Entity()
class Workflow {
    @PrimaryGeneratedColumn()
    id;

    @ManyToOne(() => Ticket, (ticket) => ticket.id)
    ticket_id;

    @Column()
    status;

    @Column('timestamp')
    timestamp;

    @Column({ nullable: true })
    comments;
}

export default Workflow;