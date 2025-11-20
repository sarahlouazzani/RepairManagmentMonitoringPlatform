import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
class Device {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    name: string = '';

    @Column()
    model: string = '';

    @Column({ unique: true })
    serial_number: string = '';

    @CreateDateColumn()
    created_at: Date = new Date();
}

export default Device;