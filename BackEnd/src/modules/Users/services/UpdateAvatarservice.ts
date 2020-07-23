import path from "path";
import fs from "fs";
import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import UsersModel from "../infra/typeorm/entities/UserModel";
import uploadConfig from "@config/upload";
import IUsersRepository from "../repositories/IUsersRepository";

interface Request {
    user_id: string;
    avatarname: string;
}

@injectable()
class UpdateAvatarservice {

    constructor(
        @inject('userRepository')
        private usersRepository: IUsersRepository
        ) {}

    public async execute({user_id, avatarname}: Request): Promise<UsersModel>{

        const user = await this.usersRepository.findById(user_id)

        if(!user) {
            throw new AppError("Only authenticat users can change avatar", 401)
        }

        // Investiga se user já tinha avatar
        if(user.avatar) {
            // deletar avatar anterior
            const userAvatarPath = path.join(uploadConfig.directory, user.avatar);

            // função para ver se o arquivo existe. stat mostra o status de um arquivo.
            const userAvatarExists = await fs.promises.stat(userAvatarPath);

            //Se arquivo existir, vou deletar
            if(userAvatarExists) {
                await fs.promises.unlink(userAvatarPath)
            };
        };

        user.avatar = avatarname;

        await this.usersRepository.save(user);

        return user

    }
}

export default UpdateAvatarservice;