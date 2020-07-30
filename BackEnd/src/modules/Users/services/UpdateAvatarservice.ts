import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import UsersModel from "../infra/typeorm/entities/UserModel";
import IUsersRepository from "../repositories/IUsersRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";

interface Request {
    user_id: string;
    avatarname: string;
}

@injectable()
class UpdateAvatarservice {

    constructor(
        @inject('UserRepo')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider
        ) {}

    public async execute({user_id, avatarname}: Request): Promise<UsersModel>{

        const user = await this.usersRepository.findById(user_id)

        if(!user) {
            throw new AppError("Only authenticat users can change avatar", 401)
        }

        // Investiga se user já tinha avatar, caso sim deleta o anterior antes de salvar o novo
        if(user.avatar) {
            await this.storageProvider.deleteFile(user.avatar)
        };

        const fileName = await this.storageProvider.saveFile(avatarname)

        user.avatar = fileName;

        await this.usersRepository.save(user);

        return user

    }
}

export default UpdateAvatarservice;