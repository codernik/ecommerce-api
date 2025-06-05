import redis from "../services/redisClient.js";
import { publishExceedEvent } from "../services/messageBroker.js";

const WINDOW_SIZE_IN_MINUTES = parseInt(process.env.WINDOW_SIZE_MINUTES || "15");
const MAX_REQUESTS = parseInt(process.env.MAX_REQUESTS || "100");
const WINDOW_SIZE_IN_SECONDS = WINDOW_SIZE_IN_MINUTES * 60;

export default async function rateLimiter(req, res, next) {
    const userKey = req.ip;
    const redisKey = `rate-limit:${userKey}`;

    console.log('redisKey', redisKey);

    try {
        const count = await redis.incr(redisKey);

        if (count === 1) {
            // Setting expiry only on first request
            await redis.expire(redisKey, WINDOW_SIZE_IN_SECONDS);
        }

        console.log(`Request count for ${userKey}:`, count);

        if (count <= MAX_REQUESTS) {
            return next();
        }

        // Publish event to Kafka for rate limit exceed
        console.log(`Rate limit exceeded for ${userKey}. Count: ${count}`);

        await publishExceedEvent({
            user: userKey,
            ip: req.ip,
            time: new Date().toISOString(),
            count,
        });

        return res.status(429).json({ error: "Too Many Requests. Please try again later." });

    } catch (err) {
        console.error("Rate Limiting Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
