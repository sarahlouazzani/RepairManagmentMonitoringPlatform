import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    username: string = '';

    @Column()
    email: string = '';

    @Column()
    password: string = '';

    @Column()
    role: string = '';

    @CreateDateColumn()
    created_at: Date = new Date();
}

export default User;