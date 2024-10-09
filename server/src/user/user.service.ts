import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../database/models/user.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createMany() {
    try {
      await this.sequelize.transaction(async t => {
        const transactionHost = { transaction: t };
  
        await this.userModel.create(
            { firstName: 'Abraham', lastName: 'Lincoln' },
            transactionHost,
        );
        await this.userModel.create(
            { firstName: 'John', lastName: 'Boothe' },
            transactionHost,
        );
        return "success"
      });
    } catch (err) {
   throw err
    }
  }

}