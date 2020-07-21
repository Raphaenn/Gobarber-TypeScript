import { Router } from "express";

import AuthenticateService from "../service/AuthenticateService";

const sessionsRoute = Router();

sessionsRoute.get("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        const authenticateUser = new AuthenticateService();

        const { user, token } = await authenticateUser.execute({
            email,
            password
        });

        delete user.password

        return res.json({ user, token })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
});

export default  sessionsRoute;