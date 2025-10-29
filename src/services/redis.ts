import { createClient } from 'redis';

const redisUrl =
  process.env.NODE_ENV === "production" ? process.env.REDIS_URL : "redis://localhost:6379";

const redisClient = createClient({ url: redisUrl });

redisClient.on('error', (err) => console.error('Redis Client Error', err));

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log('Connected to Redis');
  }
  return redisClient;
}

async function getCache<T>(key: string): Promise<T | undefined> {
  try {
    const data = await redisClient.get(key);
    if (!data) return;

    const parsedData = JSON.parse(data);
    console.log(`REDIS Retrieved cache key: ${key}`);
    return parsedData as T;
  } catch (err) {
    console.error(`REDIS Failed to get cache key: ${key} - `, err);
    return;
  }
}

async function setCache(key: string, value: any, ttlSeconds: number): Promise<void> {
  try {
    await redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds });
    console.log(`REDIS Set cache key: ${key} with TTL: ${ttlSeconds}s`);
  } catch (err) {
    console.error(`REDIS Failed to set key: ${key} - `, err);
  }
}

export { connectRedis, getCache, setCache };
