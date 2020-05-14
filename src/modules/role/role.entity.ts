import {BaseEntity,
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    JoinColumn, 
    ManyToMany,
    UpdateDateColumn,
    CreateDateColumn,
}  from 'typeorm'
import { User } from '../user/user.entity';


@Entity('roles')
export class Role extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;    
    @Column({type: 'varchar',unique: true,length:100,nullable:false})
    name: string;
 
    @Column({type: 'varchar',unique: true,length:100, nullable:false})
    description: string;

    @CreateDateColumn({type: 'timestamp', name:'create_at'})
    createAt:Date;
    @UpdateDateColumn({type: 'timestamp', name:'create_up'})
    createUp:Date;

    @ManyToMany(type=>User, user => user.roles)
    @JoinColumn()
    users:User[];

}