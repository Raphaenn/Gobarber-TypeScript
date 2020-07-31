import { injectable, inject } from "tsyringe";

import IUsersRepository from "@modules/Users/repositories/IUsersRepository";
import UserModel from "@modules/Users/infra/typeorm/entities/UserModel";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

interface IRequest {
    user_id: string;
}

@injectable()
class ListProvidersService {

    constructor(
        @inject('UserRepo')
        private usersRepository: IUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {

    }

    public async execute({ user_id }: IRequest): Promise<UserModel[]> {
        let users = await this.cacheProvider.recover<UserModel[]>(`providers-list:${user_id}`);

        if(!users) {
            // se não encontrar usuários no cache, procurar no banco postgres
            // listo todos usuários menos o user_id da pessoa que está logada
            users = await this.usersRepository.findAllProviders({execept_user_id: user_id});
        }

        // armazenar no cache. Dois pontos criar um subnivel do providers-list 
        await this.cacheProvider.save(`providers-list:${user_id}`, users)

        return users

    }

}

export default ListProvidersService;