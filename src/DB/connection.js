import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';
import 'dotenv/config';

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: 'mysql',
        dialectModule: mysql2,
        // إعدادات الـ Pool بتمنع الـ ECONNRESET
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            },
            // بيخلي الاتصال يحاول يفضل شغال وما يقطعش
            connectTimeout: 60000,
            keepAliveInitialDelay: 10000,
            enableKeepAlive: true
        },
        logging: false
    }
);

export const checkDBConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to Aiven MySQL successfully!');
    } catch (err) {
        console.error('Database connection error:', err);
    }
};

export const syncDBConnection = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('All models synchronized.');
    } catch (err) {
        console.error('Sync error:', err);
    }
};