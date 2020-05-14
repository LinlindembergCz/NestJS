import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { UserService } from './user.service';
import { UserController } from './user.Controller';
import { SharedModule } from '../../shared/shared.modules';

@Module({ imports:[
          TypeOrmModule.forFeature([UserRepository]),                 
          SharedModule, ], 
          providers: [UserService, ],
          controllers: [UserController, ] })
export class UserModule { }
