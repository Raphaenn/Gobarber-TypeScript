import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import UserModel from "../infra/typeorm/entities/UserModel";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
}

@injectable()
class ShowProfileService {

    constructor(
        @inject('UserRepo')
        private usersRepository: IUsersRepository
    ) {}

    public async execute({ user_id }: IRequest): Promise<UserModel> {
        const user = await this.usersRepository.findById(user_id);

        if(!user) {
            throw new AppError("User not found");
        }

        return user;
    }

}

export default ShowProfileService;