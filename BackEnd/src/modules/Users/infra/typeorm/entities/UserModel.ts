import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

import uploadConfig from "@config/upload";

// Permite fazer alterações nas respostas do backend. Ex: o exlude vai fazer com que o password não seja retornado para o front.
import { Exclude, Expose } from "class-transformer";

// Nome da tabela
@Entity('users')
class UsersModel {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    avatar: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // exibir url do avatar no retorno para o front
    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null {

        if(!this.avatar) {
            return null
        }

        switch(uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.avatar}`;
            case 's3': 
            return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
            default: 
            return null;
        }
    }
}

export default UsersModel;