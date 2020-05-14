import {BaseEntity, Entity, PrimaryGeneratedColumn, Column}  from 'typeorm'

@Entity('user_details')
export class UserDetails extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;    

    @Column({type: 'varchar',unique: true,length:50,nullable:true})
    name: string;

    @Column({type: 'varchar',nullable:true})
    lastname: string;   

    @Column({type: 'varchar',nullable:true})
    cpf: string;

    @Column({type: 'varchar',default:'Active',length: 8})
    status: string;

    @Column({type: 'timestamp', name:'create_at',nullable:true})
    createAt:Date;

    @Column({type: 'timestamp', name:'create_up',nullable:true})
    createUp:Date;
}