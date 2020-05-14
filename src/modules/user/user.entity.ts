import {BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn,
    Column, 
    OneToOne, 
    JoinTable,
    ManyToMany,
    UpdateDateColumn,
    CreateDateColumn,
    JoinColumn}  from 'typeorm';
import { UserDetails } from './user.details.entity';
import { Role } from '../role/role.entity';



@Entity('users')
/*@ViewEntity({ 
    expression:`Select `**/
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;    
    @Column({type: 'varchar',unique: true,length:25,nullable:false})
    username: string; 
    @Column({type: 'varchar',length:100,nullable:true})
    email: string;
    @Column({type: 'varchar',length:15,nullable:false})
    password: string;
    @Column({type: 'varchar',nullable:false, default:'Active',length: 8})
    status: string;
    @CreateDateColumn({type: 'timestamp', name:'create_at'})
    createAt:Date;
    @UpdateDateColumn({type: 'timestamp', name:'create_up'})
    createUp:Date;

    @OneToOne(type=>UserDetails,{cascade:true,nullable:false, eager: true})
    @JoinColumn({name:'detail_id'})
    details: UserDetails;

    @ManyToMany(type=>Role, role=>role.users, {eager: true})
    @JoinTable({name:'user_roles'})
    roles: Role[];


}