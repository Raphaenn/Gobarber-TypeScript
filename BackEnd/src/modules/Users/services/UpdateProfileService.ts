import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import UsersModel from "../infra/typeorm/entities/UserModel";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "@modules/Users/providers/HashProvider/models/IHashProvider";

interface Request {
    user_id: string
    name: string;
    email: string;
    password?: string;
    oldpassword?: string;
}

@injectable()
class UpdateProfileService {

    constructor(
        @inject('UserRepo')
        private usersRepository: IUsersRepository,

        @inject('hashProvider')
        private hashProvider: IHashProvider
        ) {}

    public async execute({user_id, name, email, password, oldpassword}: Request): Promise<UsersModel>{
        const user = await this.usersRepository.findById(user_id);

        if(!user) {
            throw new AppError("User not found");
        }

        const userWithUpdateEmail = await this.usersRepository.findByEmail(email);

        if(userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
            throw new AppError("Email already in use");
        }

        user.name = name;
        user.email = email;

        if(password && !oldpassword) {
            throw new AppError("You need to inform the old password to set a new password");
        }

        if(password && oldpassword) {
            const checkOldpass = await this.hashProvider.compareHash(oldpassword, user.password);
            if(!checkOldpass) {
                throw new AppError("OldPassword does not macth");
            }
            user.password = await this.hashProvider.generateHash(password);
        }

        return await this.usersRepository.save(user)
    }
}

export default UpdateProfileService;