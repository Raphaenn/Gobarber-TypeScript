import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated, ManyToOne, JoinColumn } from "typeorm";

import UsersModel from "@modules/Users/infra/typeorm/entities/UserModel";

// Nome da tabela
@Entity('user_tokens')
class UsersToken {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default UsersToken;