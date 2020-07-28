import { injectable, inject } from "tsyringe";
import path from "path";

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

        const {token} =  await this.userTokenRepository.generate(user.id);
        const forgotPassTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

        await this.mailproviders.sendEMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: "[Gobarber] Recuperação de senha",
            templateData: {
                file: forgotPassTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${token}`
                }
            }
        });
    };

};

export default SendForgotPassService;