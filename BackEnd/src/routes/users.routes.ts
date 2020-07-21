import { Router } from "express";
// import { } from
import CreateUserService from "../service/CreateUserService";
// import { } from
// import { } from

const usersRoute = Router();

usersRoute.get("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const createUser = new CreateUserService();
        const user = await createUser.execute({
            name,
            email,
            password
        });

        // Deletar senha do usuário para não exibir no retorno
        delete user.password

        return res.json(user)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
});

export default  usersRoute;