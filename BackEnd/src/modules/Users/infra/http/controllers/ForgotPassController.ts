import {Request, Response} from "express";
import { container } from "tsyringe";

import SendForgotPassService from "@modules/Users/services/SendForgotPassService";

export default class ForgotPassController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;

        const sendForgotPass = container.resolve(SendForgotPassService);

        await sendForgotPass.execute({
            email
        });

        return res.status(204).json();
    }
}