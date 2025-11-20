import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import Device from './Device';
import User from './User';

@Entity()
class Ticket {
    @PrimaryGeneratedColumn()
    id;

    @ManyToOne(() => Device, (device) => device.id)
    device_id;

    @ManyToOne(() => User, (user) => user.id)
    user_id;

    @Column()
    status;

    @Column('text')
    description;

    @CreateDateColumn()
    created_at;

    @UpdateDateColumn()
    updated_at;
}

export default Ticket;