import {Request, Response} from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import AuthenticateService from "@modules/Users/services/AuthenticateService";

export default class SessionsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const authenticateUser = container.resolve(AuthenticateService);

        const { user, token } = await authenticateUser.execute({
            email,
            password
        });

        return res.json({ user: classToClass(user), token })
    }
}