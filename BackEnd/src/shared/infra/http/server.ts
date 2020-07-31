import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import 'express-async-errors';
import { errors } from "celebrate";

import uploadConfig from "@config/upload";
import AppError from "@shared/errors/AppError";
import RateLimiter from "./middlewares/RateLimiter"
import routes from "./routes";

import "@shared/infra/typeorm";
import "@shared/container";

const app = express();

app.use(cors({}));
app.use(express.json());
app.use("/files", express.static(uploadConfig.uploadFolder))
app.use(RateLimiter);
app.use(routes);

app.use(errors());

// Tratativa global de erros
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    
    // verifica se err é uma instancia da class AppError
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    console.error(err)

    return response.status(500).json({
        status: 'error',
        messagem: 'Internal Error'
    })
})

app.listen(3333, () => {
    console.log('******************************');
    console.log(`SERVER STARTED as ${process.env.NODE_ENV} ✅`);
    console.log('******************************');
});