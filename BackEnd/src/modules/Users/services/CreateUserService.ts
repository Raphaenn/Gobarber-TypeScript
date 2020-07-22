import { getRepository } from "typeorm";
import { hash } from "bcryptjs"

import AppError from "../../../shared/errors/AppError";
import UserModel from "../entities/UserModel";

interface Request {
    name: string,
    email: string,
    password: string
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<UserModel> {

        const userRepository = getRepository(UserModel);

        const checkUserExist = await userRepository.findOne({
            where: { email }
        });

        if(checkUserExist) {
            throw new AppError('Email address already used', 401)
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await userRepository.save(user);

        return user;

    }
}

export default CreateUserService;