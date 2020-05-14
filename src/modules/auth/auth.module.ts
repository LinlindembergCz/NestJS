import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';

//npm i @nestjs/passport @nestjs/jwt passport-jwt
//npm i -D @types/bcryptjs @types/passport @types/passport-jwt
@Module({
  imports:[TypeOrmModule.forFeature([AuthRepository])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
