import { Router } from "express";

import AuthenticateService from "../../modules/Users/services/AuthenticateService";

const sessionsRoute = Router();

sessionsRoute.get("/", async (req, res) => {
        const { email, password } = req.body;

        const authenticateUser = new AuthenticateService();

        const { user, token } = await authenticateUser.execute({
            email,
            password
        });

        delete user.password

        return res.json({ user, token })
});

export default  sessionsRoute;