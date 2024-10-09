import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from './user.model';
import {config} from 'dotenv'
config()

export const databaseConfig: SequelizeModuleOptions = {
    dialect: 'mysql', 
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [User],
    autoLoadModels: true,
    synchronize: true,
};