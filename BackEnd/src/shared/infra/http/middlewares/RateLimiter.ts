import { Request, Response, NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "redis";

import AppError from "@shared/errors/AppError";

const redisClient = redis.createClient({
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
});

const rateLimit = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimit',
    points: 5,
    duration: 1
})

export default async function RateLimiter( req: Request, res: Response, next: NextFunction ): Promise<void> {
    try {
        await rateLimit.consume(req.ip)

        return next();

    } catch (err) {
        throw new AppError('Too many requests', 429)
    }
}
