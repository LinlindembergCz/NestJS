import { Controller, 
    Get, 
    Post,
    Put,
    Delete, 
    Body, 
    Param,
    ParseIntPipe,
    UseGuards, } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserView } from "./user.view";

@Controller('users')
export class UserController {


    constructor( private readonly _userService: UserService ) { }
    /*
    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number):Promise<User>
    {
        const user = await this._userService.get(id)
        return user;
    }

    @Get()
    async getUsers():Promise<User[]>
    {
        const users = await this._userService.getAll()
        return users;
    }*/

    @Get('view')
    async getUsersView():Promise<UserView[]>
    {
        const users = await this._userService.getView()
        return users;
    }

    @Post()
    async createUser(@Body() user: User):Promise<User>
    {
        const userCreated = await this._userService.create(user);
        return userCreated;
    }

    @Put(':id')
    async updateUser(@Param('id', ParseIntPipe) id:number, @Body() user: User)
    {
        await this._userService.update(id,user);     
        return true;      
    }

    @Delete(':id')
    async DeleteUser(@Param('id', ParseIntPipe) id:number)
    {
        await this._userService.delete(id);
        return true;
        
    }
}
