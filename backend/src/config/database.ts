import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import Device from '../models/Device';
import Ticket from '../models/Ticket';
import Workflow from '../models/Workflow';
import User from '../models/User';

dotenv.config();

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'yourpassword',
    database: process.env.DB_NAME || 'repair_management',
    synchronize: true, // mettre à false en production et utiliser des migrations
    logging: true,
    entities: [Device, Ticket, Workflow, User],
    migrations: ['src/migrations/*.ts']
});

export default AppDataSource;