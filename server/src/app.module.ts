import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user/user.controller';
import { databaseConfig } from './database/models/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    SequelizeModule.forRoot(databaseConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [UserController, AppController],
  providers: [AppService]
  
})
export class AppModule {}
