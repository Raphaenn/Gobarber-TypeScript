import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "../config/auth";

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        throw new Error("JWT token is missing");
    }

    // Bearer separar
    const [, token] = authHeader.split(' ');
    
    try {
        const decode = verify(token, authConfig.jwt.secret);

        // as TokenPayload é um hack do typescript para forçar um formato para o decode
        const { sub } = decode as TokenPayload;

        req.user = {
            id: sub,
        };

        return next();
    } catch (error) {
        throw new Error("Invalid JWT token")
    }
};


// É imortante incluir a informacoes do usuário que gerou o token, nas proximas rotas. Ao pegarmos o sub (id do usuario), podemos usar comom filtro nas próximas rotas (que serão executadas depois desse middleware).