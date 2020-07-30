import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import UpdateAvatarservice from "@modules/Users/services/UpdateAvatarservice";

export default class UpdateAvatarController {
    public async create(req: Request, res: Response): Promise<Response> {
        const updateAvatar = container.resolve(UpdateAvatarservice);

        const user = await updateAvatar.execute({
            user_id: req.user.id,
            avatarname: req.file.filename
        })

        delete user.password

        return res.json(classToClass(user))
        }
}