import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import IMailproviders from "@shared/container/providers/MailProvider/models/IMailproviders";
import IUserTokenRepository from "@modules/Users/repositories/IUserTokenRepository";

interface IRequest {
    email: string
};

@injectable()
class SendForgotPassService {

    constructor(
        @inject('UserRepo')
        private userRepository: IUsersRepository,
        
        @inject('Mailproviders')
        private mailproviders: IMailproviders,

        @inject('UsersTokensRepo')
        private userTokenRepository: IUserTokenRepository
        ) {}

    public async execute({email}: IRequest): Promise<void> {
        const user = await this.userRepository.findByEmail(email);

        if(!user) {
            throw new AppError("user dows not exists");
        }

        const {token} =  await this.userTokenRepository.generate(user.id)

        await this.mailproviders.sendEMail(email, `Password recovery solicitation: ${token}`);
    };

};

export default SendForgotPassService;