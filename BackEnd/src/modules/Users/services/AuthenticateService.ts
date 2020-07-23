import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import UsersModel from "../infra/typeorm/entities/UserModel";
import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: UsersModel;
    token: string;
}

@injectable()
class AuthenticateService {

    constructor(
        @inject('UserRepo')
        private userRepository: IUsersRepository
        ) {}

    public async execute({ email, password }: Request): Promise<Response> {
        const user = await this.userRepository.findByEmail(email)

        if(!user) {
            throw new AppError('Incorrect email/password combination.', 401)
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new AppError('Incorrect email/password combination.', 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        // criar token de login 
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: expiresIn
        });

        return {
            user,
            token
        };
    }

}

export default AuthenticateService;