import { Delete, ForbiddenException, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {User} from '../database/models/user.model'
import { InjectModel } from '@nestjs/sequelize'; 


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User, 
    private sequelize: Sequelize,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    
    //generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.userModel.create({
        email: dto.email,
        hash,
      });
      
      return {id: user.id, email: user.email, isActive: user.isActive};
    } catch (error) {
        throw error;

    }
  }
  async signin(dto: AuthDto) {
    // find the user by email
    const user = await this.userModel.findOne({
      where: {
        email: dto.email,
      },
    });

    // if userdoesnot exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);

    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    // send the user
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{access_token}> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
