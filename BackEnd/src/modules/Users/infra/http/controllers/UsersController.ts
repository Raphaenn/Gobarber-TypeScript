import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import CreateUserService from "@modules/Users/services/CreateUserService";

export default class UsersController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body;  
    
            // container.resolve carrega o service, ve no constructor de service se ele precisa de alguma dependencia -> vai no container com as dependecias, ve se tem alguma com mesmo nome da solicitada no service e assim retorna o repository para o CreateUserService
            const createUser = container.resolve(CreateUserService);
            const user = await createUser.execute({
                name,
                email,
                password
            });
    
            // Deletar senha do usuário para não exibir no retorno
            // delete user.password
    
            return res.json(classToClass(user))
    
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
} 