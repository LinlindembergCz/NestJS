import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToMany}  from 'typeorm'

@Entity('permissions')
export class Permission extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;     
    @Column({type: 'varchar',unique: true,length:100, nullable:false})
    description: string;
    @Column({type: 'timestamp', name:'create_at'})
    createAt:Date;
    @Column({type: 'timestamp', name:'create_up'})
    createUp:Date;
}