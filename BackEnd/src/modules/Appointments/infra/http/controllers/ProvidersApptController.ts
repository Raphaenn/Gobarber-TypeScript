import { Request, Response } from "express";
import { container } from "tsyringe";

import ListProviderApptService from "@modules/Appointments/services/ListProviderApptService";

export default class ProvidersApptController {

    public async index( req: Request, res: Response ): Promise<Response> {
        const provider_id = req.user.id;
        const { day, month, year } = req.body;

        const listProviderAppt = container.resolve(ListProviderApptService);

        const list = await listProviderAppt.execute({ 
            provider_id,
            day,
            month,
            year
         })

        return res.json(list);
    }

}