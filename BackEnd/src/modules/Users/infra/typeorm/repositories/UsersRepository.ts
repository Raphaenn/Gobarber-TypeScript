// Arquivo que é responsavel por tudo que vai mexer nos dados de agendamento. Qualquer funcao que for ler, listar, deletar criar... deve ficar dentro do repositorio

import { getRepository, Repository, Not } from "typeorm"

import UsersModel from "../entities/UserModel";
import IUsersRepository from "@modules/Users/repositories/IUsersRepository";
import ICreateAppointmentDTO from "@modules/Users/dtos/ICreateUserDTO";
import IFindAllProvidersDTO from "@modules/Users/dtos/IFindAllProvidersDTO";

// implements o escopo de regras do IAppointmentsRepo
class UserRepo implements IUsersRepository{

    private ormRepository: Repository<UsersModel>

    constructor() {
        this.ormRepository = getRepository(UsersModel)
    }

    public async findAllProviders({execept_user_id}: IFindAllProvidersDTO): Promise<UsersModel[]> {
        // Como eu declarei o let users fora, eu não preciso declarar novamente dentro do if
        let users: UsersModel[];

        if(execept_user_id) {
            users = await this.ormRepository.find({
                where: {
                    id: Not(execept_user_id)
                }
            })
        } else {
            users = await this.ormRepository.find()
        }
    
        return users;
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
