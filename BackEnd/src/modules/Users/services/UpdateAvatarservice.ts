import path from "path";
import fs from "fs";
import { getRepository } from "typeorm";

import AppError from "../../../shared/errors/AppError";
import UserModel from "../entities/UserModel";
import uploadConfig from "../../../config/upload";

interface Request {
    user_id: string;
    avatarname: string;
}

class UpdateAvatarservice {
    public async execute({user_id, avatarname}: Request): Promise<UserModel>{
        const userRepository = getRepository(UserModel);

        const user = await userRepository.findOne(user_id);

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

        await userRepository.save(user);

        return user

    }
}

export default UpdateAvatarservice;