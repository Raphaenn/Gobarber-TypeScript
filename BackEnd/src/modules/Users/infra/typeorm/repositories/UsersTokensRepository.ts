import { getRepository, Repository } from "typeorm"

import UserToken from "../entities/UserToken";
import IUserTokenRepository from "@modules/Users/repositories/IUserTokenRepository";

// implements o escopo de regras do IAppointmentsRepo
class UsersTokensRepo implements IUserTokenRepository{

    private ormRepository: Repository<UserToken>

    constructor() {
        this.ormRepository = getRepository(UserToken)
    }

    public async generate(user_id: string): Promise<UserToken> {

        // Não precisa do await pois primeiro criamos uma innstancia do banco
        const userToken = this.ormRepository.create({
            user_id
        });

        await this.ormRepository.save(userToken)

        return userToken
    };

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.ormRepository.findOne({
            where: { token }
        });

        return userToken
    };


};

export default UsersTokensRepo;
