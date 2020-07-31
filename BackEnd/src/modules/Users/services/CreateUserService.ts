import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import UsersModel from "../infra/typeorm/entities/UserModel";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

interface Request {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {

    constructor(
        @inject('UserRepo')
        private userRepository: IUsersRepository,

        @inject('hashProvider')
        private hashProvider: IHashProvider,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
        ) {}

    public async execute({ name, email, password }: Request): Promise<UsersModel> {

        const checkUserExist = await this.userRepository.findByEmail(email)

        if(checkUserExist) {
            throw new AppError('Email address already used', 401)
        }

        const hashedPassword = await this.hashProvider.generateHash(password)

        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await this.cacheProvider.invalidatePrefix('providers-list');

        return user;

    }
}

export default CreateUserService;