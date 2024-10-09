import { Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../database/models/user.model';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UsersService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private authService: UsersService) {}
    @Get('me')
    getMe(@GetUser() user: User, @GetUser('email') email: string){
    
        return user
    }
    @Post('createMany')
    createMany(){
        return this.authService.createMany()
    }

}
