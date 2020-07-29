import { Request, Response } from "express";
import { container } from "tsyringe";

import ListProvidersService from "@modules/Appointments/services/ListProvidersService";

export default class ProvidersControllers {

    public async index( req: Request, res: Response ): Promise<Response> {
        const user_id = req.user.id

        const listProviders = container.resolve(ListProvidersService);

        const list = await listProviders.execute({ user_id })

        return res.json(list);
    }

}