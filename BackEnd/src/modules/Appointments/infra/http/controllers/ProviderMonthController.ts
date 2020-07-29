import { Request, Response } from "express";
import { container } from "tsyringe";

import ListMonthService from "@modules/Appointments/services/ListMonthService";

export default class ProviderMonthController {

    public async index( req: Request, res: Response ): Promise<Response> {
        const { provider_id }  = req.params;
        const { month, year } = req.body;

        const listMonthService = container.resolve(ListMonthService);

        const list = await listMonthService.execute({ provider_id, month, year })

        return res.json(list);
    }
}