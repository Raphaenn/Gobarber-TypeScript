// Forma de adicionar tipagem personalizada na biblioteca oficial do modulo no typescript

declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
    }
}