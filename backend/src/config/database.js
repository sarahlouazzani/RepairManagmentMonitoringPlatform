const { DataSource } = require('typeorm');
require('dotenv').config();

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false, // Use migrations instead of synchronize in production
    logging: true,
    entities: [
        require('../models/Device'),
        require('../models/Ticket'),
        require('../models/Workflow'),
        require('../models/User')
    ],
    migrations: [
        'src/migrations/*.ts'
    ]
});

module.exports = AppDataSource;