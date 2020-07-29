import { injectable, inject } from "tsyringe";

import IUsersRepository from "@modules/Users/repositories/IUsersRepository";
import UserModel from "@modules/Users/infra/typeorm/entities/UserModel";

interface IRequest {
    user_id: string;
}

@injectable()
class ListProvidersService {

    constructor(
        @inject('UserRepo')
        private usersRepository: IUsersRepository,
    ) {

    }

    public async execute({ user_id }: IRequest): Promise<UserModel[]> {

        // listo todos usuários menos o user_id da pessoa que está logada
        const users = await this.usersRepository.findAllProviders({execept_user_id: user_id});

       return users

    }

}

export default ListProvidersService;