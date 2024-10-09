import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from './user.model';

export const databaseConfig: SequelizeModuleOptions = {
    dialect: 'mysql', 
    host: "localhost",
    port: 3307,
    username: "root",
    password: "password123",
    database: "wms",
    models: [User],
    autoLoadModels: true,
    synchronize: true,
};