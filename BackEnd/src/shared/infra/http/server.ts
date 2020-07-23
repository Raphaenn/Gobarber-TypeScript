import 'reflect-metadata';

import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import routes from "./routes";
import uploadConfig from "@config/upload";
import AppError from "@shared/errors/AppError";

import "@shared/infra/typeorm";
import "@shared/container";

const app = express();

app.use(express.json());
app.use("/files", express.static(uploadConfig.directory))
app.use(routes);

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
    console.log("✅ server running")
});