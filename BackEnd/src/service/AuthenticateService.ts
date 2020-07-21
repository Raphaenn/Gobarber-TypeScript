import { getRepository } from "typeorm";
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken";

import UserModel from "../models/UserModel";
import authConfig from "../config/auth";

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: UserModel;
    token: string;
}

class AuthenticateService {
    public async execute({ email, password }: Request): Promise<Response> {
        const userRepository = getRepository(UserModel);

        const user = await userRepository.findOne({
            where: { email }
        });

        if(!user) {
            throw new Error('Incorrect email/password combination.')
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error('Incorrect email/password combination.')
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