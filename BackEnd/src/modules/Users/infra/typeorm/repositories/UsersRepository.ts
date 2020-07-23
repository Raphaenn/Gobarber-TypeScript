// Arquivo que é responsavel por tudo que vai mexer nos dados de agendamento. Qualquer funcao que for ler, listar, deletar criar... deve ficar dentro do repositorio

import { getRepository, Repository } from "typeorm"

import UsersModel from "../entities/UserModel";
import IUsersRepository from "@modules/Users/repositories/IUsersRepository";
import ICreateAppointmentDTO from "@modules/Users/dtos/ICreateUserDTO";

// implements o escopo de regras do IAppointmentsRepo
class UserRepo implements IUsersRepository{

    private ormRepository: Repository<UsersModel>

    constructor() {
        this.ormRepository = getRepository(UsersModel)
    }

    public async findById(id: string): Promise<UsersModel | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user
    };

    public async findByEmail(email: string): Promise<UsersModel | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email }
        });

        return user
    };

    public async create(userData: ICreateAppointmentDTO): Promise<UsersModel> {
        const userCreated = this.ormRepository.create(userData)

        await this.ormRepository.save(userCreated)

        return userCreated;
    }

    public async save(user: UsersModel): Promise<UsersModel> {
        return this.ormRepository.save(user);
    }
};

export default UserRepo;
