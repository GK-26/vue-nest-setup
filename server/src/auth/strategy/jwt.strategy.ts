import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectModel } from '@nestjs/sequelize'; 
import { Sequelize } from 'sequelize-typescript';
import { User } from "src/database/models/user.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(
        @InjectModel(User) private readonly userModel: typeof User, config: ConfigService, private sequelize: Sequelize){
        super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: config.get('JWT_SECRET'),   
        })
    }
    async validate(payload: {sub: number, email: string}){
        const user = await this.userModel.findOne({
            where: {
                id: payload.sub
            }
        })
        return user;
    }
}