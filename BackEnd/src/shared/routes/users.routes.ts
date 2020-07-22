import { Router } from "express";
import multer from "multer";
import CreateUserService from "../../modules/Users/services/CreateUserService";
import UpdateAvatarservice from "../../modules/Users/services/UpdateAvatarservice";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import uploadConfig from "../../config/upload";

const usersRoute = Router();
const upload = multer(uploadConfig);

usersRoute.post("/", async (req, res) => {
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

// rota para atualizar algumas infos. Só pode alterar se usuário estiver autenticado
usersRoute.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (req, res) => {

        const updateAvatar = new UpdateAvatarservice();

        const user = await updateAvatar.execute({
            user_id: req.user.id,
            avatarname: req.file.filename
        })

        delete user.password

        return res.json(user)
});

export default  usersRoute;