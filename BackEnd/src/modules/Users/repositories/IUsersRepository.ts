import UsersModel from "../infra/typeorm/entities/UserModel";
import ICreateUserDTO from "@modules/Users/dtos/ICreateUserDTO";

export default interface IUsersRepository {

    findById(id: string): Promise<UsersModel | undefined>; 
    findByEmail(email: string): Promise< UsersModel| undefined>;
    create(data: ICreateUserDTO): Promise<UsersModel>;
    save(user: UsersModel): Promise<UsersModel>
}