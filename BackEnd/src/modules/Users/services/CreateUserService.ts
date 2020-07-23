import { hash } from "bcryptjs"
import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import UsersModel from "../infra/typeorm/entities/UserModel";
import IUsersRepository from "../repositories/IUsersRepository";

interface Request {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {

    constructor(
        @inject('userRepository')
        private userRepository: IUsersRepository
        ) {}

    public async execute({ name, email, password }: Request): Promise<UsersModel> {


        const checkUserExist = await this.userRepository.findByEmail(email)

        if(checkUserExist) {
            throw new AppError('Email address already used', 401)
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        return user;

    }
}

export default CreateUserService;