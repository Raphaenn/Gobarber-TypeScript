import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import { differenceInHours } from "date-fns";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokenRepository from "@modules/Users/repositories/IUserTokenRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
    password: string;
    token: string
};

@injectable()
class ResetPassService {

    constructor (
        @inject('UserRepo')
        private userRepository: IUsersRepository,

        @inject('UsersTokensRepo')
        private userTokenRepository: IUserTokenRepository,

        @inject('hashProvider')
        private hashProvider: IHashProvider
    ) {};

    public async execute({password, token}: IRequest): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if(!userToken) {
            throw new AppError("User token does not exists");
        }

        const user = await this.userRepository.findById(userToken?.user_id);

        if(!user) {
            throw new AppError("User does not exists");
        }

        const tokenCreatedAt = userToken.created_at;

        if(differenceInHours(tokenCreatedAt, Date.now()) > 2) {
            throw new AppError("Token expired");
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.userRepository.save(user)
    }

}

export default ResetPassService;