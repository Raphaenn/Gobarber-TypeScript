import {Request, Response} from "express";
import { container } from "tsyringe";

import UpdateProfileService from "@modules/Users/services/UpdateProfileService";
import ShowProfileService from "@modules/Users/services/ShowProfileService";

export default class ProfileController {
    public async index(req: Request, res: Response): Promise<Response>{

        const user_id = req.user.id
        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute({user_id});

        delete user.password

        return res.json(user)

    }

    public async update(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id
        const {name, email, oldpassword, password} = req.body;

        const updateProfile = container.resolve(UpdateProfileService);

        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            oldpassword,
            password
        });

        delete user.password

        return res.status(204).json(user);
    }
}