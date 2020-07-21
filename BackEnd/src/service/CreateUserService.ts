import { getRepository } from "typeorm";
import { hash } from "bcryptjs"

import UserModel from "../models/UserModel";

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
            throw new Error('Email address already used')
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