import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id;

    @Column()
    username;

    @Column()
    email;

    @Column()
    password;

    @Column()
    role;

    @CreateDateColumn()
    created_at;
}

export default User;