import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import Device from './Device';
import User from './User';
import Workflow from './Workflow';

@Entity()
class Ticket {
    @PrimaryGeneratedColumn()
    id!: number; // definite assignment

    @ManyToOne(() => Device)
    @JoinColumn({ name: 'device_id' })
    device!: Device;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user?: User | null; // optional

    @Column()
    status!: string;

    @Column('text')
    description!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @OneToMany(() => Workflow, (workflow) => workflow.ticket)
    workflows!: Workflow[]; // TypeORM gère l'initialisation
}

export default Ticket;