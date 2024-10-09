import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../database/models/user.model';
import { UserController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UserController],
  exports: [SequelizeModule, UsersService], 
})
export class UsersModule {}