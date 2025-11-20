import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
class Device {
    @PrimaryGeneratedColumn()
    id;

    @Column()
    name;

    @Column()
    model;

    @Column({ unique: true })
    serial_number;

    @CreateDateColumn()
    created_at;
}

export default Device;