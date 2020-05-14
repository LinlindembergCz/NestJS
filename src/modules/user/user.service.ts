import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDetails } from './user.details.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository, getManager } from 'typeorm';

import { Role } from '../role/role.entity';
import { RoleRepository } from '../role/role.repository';

import { User } from './user.entity';
import { UserView } from "./user.View";


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
    )
    {      
    }

    async get(id:number): Promise<User>{
        if(!id)
        {
            throw new BadRequestException('Id é requerido!');
        }
        const user: User = await this._userRepository.
        findOne(id, {where: {status:'ACTIVE'}});
        if (!user)
        {
            throw new BadRequestException('usuario nao existe!');
        }
        return user;
    }

    async getAll(): Promise<User[]>
    {
        const users: User[] = await this._userRepository.find({where: {status:'ACTIVE'}})
        return users
    }

    async getView(): Promise<UserView[]>
    {        
        const entityManager = getManager();
        const users: UserView[] = await entityManager.query('select * from "UserView"')
        return users
    }


    async create(user:User):Promise<User> 
    {
        const details = new UserDetails();
        user.details = details;

        const repo = await getConnection().getRepository(Role);
        const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } });
        user.roles = [defaultRole];

        const saveUser = await this._userRepository.save(user);
        return saveUser;
    }

    async update(id:number, user:User): Promise<void>
    {
       await this._userRepository.update(id, user);        
    }

    async delete(id:number): Promise<void>
    {
        const userExists = await this._userRepository.
        findOne(id, {where: {status:'ACTIVE'}});

        if(!userExists)
        {
            throw new BadRequestException('User nao existe!');  
        }
        await this._userRepository.update(id, {status:'INACTIVE'});
     
    }

}
