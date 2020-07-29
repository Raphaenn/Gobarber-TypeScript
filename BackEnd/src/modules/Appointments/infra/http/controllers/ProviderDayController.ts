import { Request, Response } from "express";
import { container } from "tsyringe";

import ListProvidersDayAService from "@modules/Appointments/services/ListProvidersDayAService";

export default class ProviderDayController {

    public async index( req: Request, res: Response ): Promise<Response> {
        const { provider_id }  = req.params;
        const { day, month, year } = req.body;

        const listProvidersDayAService = container.resolve(ListProvidersDayAService);

        const list = await listProvidersDayAService.execute({ provider_id, day, month, year })

        return res.json(list);
    }

}