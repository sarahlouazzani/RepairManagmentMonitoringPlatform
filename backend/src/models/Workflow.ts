import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import Ticket from './Ticket';

@Entity()
class Workflow {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Ticket, (ticket) => ticket.workflows)
    ticket!: Ticket;

    @Column()
    status!: string;

    @CreateDateColumn()
    timestamp!: Date;

    @Column({ nullable: true })
    comments?: string;
}

export default Workflow;