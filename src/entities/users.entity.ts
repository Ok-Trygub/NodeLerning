import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany, JoinTable,
} from 'typeorm';
import {Product} from "./products.entity";


@Entity({name: 'User'})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: 128, nullable: false})
    name!: string;

    @Column({type: 'varchar', length: 128, unique: true, nullable: false})
    email!: string;

    @Column({type: 'varchar', length: 128, unique: true, nullable: false})
    password!: string;

    @ManyToMany(() => Product, {cascade: true})
    @JoinTable({
        name: 'user_products',
        joinColumn: {name: 'user_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'product_id', referencedColumnName: 'id'}
    })
    products: Product[];

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createAt: Date;

    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @DeleteDateColumn({type: 'timestamp', nullable: true})
    deletedAt: Date;
}
