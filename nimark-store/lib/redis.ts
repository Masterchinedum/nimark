import Redis from 'ioredis';

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }

  throw new Error('REDIS_URL is not defined');
};

// Create Redis client singleton
const createRedisClient = () => {
  try {
    const client = new Redis(getRedisUrl(), {
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      reconnectOnError: (err) => {
        const targetError = 'READONLY';
        if (err.message.includes(targetError)) {
          // Reconnect when getting READONLY error
          return true;
        }
        return false;
      },
    });

    client.on('error', (error) => {
      console.error('Redis Client Error:', error);
    });

    client.on('connect', () => {
      console.log('✅ Redis Client Connected');
    });

    return client;
  } catch (error) {
    console.error('Failed to create Redis client:', error);
    throw error;
  }
};

// Singleton instance
let redis: Redis | null = null;

export const getRedisClient = () => {
  if (!redis) {
    redis = createRedisClient();
  }
  return redis;
};

// Session cache utilities
export const sessionCache = {
  // Get session from cache
  async get(sessionToken: string) {
    try {
      const client = getRedisClient();
      const data = await client.get(`session:${sessionToken}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Redis get error:', error);
      return null;
    }
  },

  // Set session in cache with TTL (30 days default)
  async set(sessionToken: string, session: any, ttl: number = 60 * 60 * 24 * 30) {
    try {
      const client = getRedisClient();
      await client.setex(`session:${sessionToken}`, ttl, JSON.stringify(session));
    } catch (error) {
      console.error('Redis set error:', error);
    }
  },

  // Delete session from cache
  async delete(sessionToken: string) {
    try {
      const client = getRedisClient();
      await client.del(`session:${sessionToken}`);
    } catch (error) {
      console.error('Redis delete error:', error);
    }
  },

  // Delete all sessions for a user
  async deleteUserSessions(userId: string) {
    try {
      const client = getRedisClient();
      const keys = await client.keys(`session:*`);
      
      for (const key of keys) {
        const data = await client.get(key);
        if (data) {
          const session = JSON.parse(data);
          if (session.userId === userId) {
            await client.del(key);
          }
        }
      }
    } catch (error) {
      console.error('Redis delete user sessions error:', error);
    }
  },
};

// Rate limiting utilities
export const rateLimiter = {
  // Check if action is allowed (returns true if allowed)
  async check(identifier: string, maxAttempts: number = 5, windowSeconds: number = 900): Promise<boolean> {
    try {
      const client = getRedisClient();
      const key = `ratelimit:${identifier}`;
      
      const current = await client.incr(key);
      
      if (current === 1) {
        await client.expire(key, windowSeconds);
      }
      
      return current <= maxAttempts;
    } catch (error) {
      console.error('Rate limiter error:', error);
      return true; // Fail open
    }
  },

  // Reset rate limit for identifier
  async reset(identifier: string) {
    try {
      const client = getRedisClient();
      await client.del(`ratelimit:${identifier}`);
    } catch (error) {
      console.error('Rate limiter reset error:', error);
    }
  },
};

// Cache utilities for general use
export const cache = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const client = getRedisClient();
      const data = await client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  },

  async set(key: string, value: any, ttl?: number) {
    try {
      const client = getRedisClient();
      const serialized = JSON.stringify(value);
      
      if (ttl) {
        await client.setex(key, ttl, serialized);
      } else {
        await client.set(key, serialized);
      }
    } catch (error) {
      console.error('Cache set error:', error);
    }
  },

  async delete(key: string) {
    try {
      const client = getRedisClient();
      await client.del(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  },

  async deletePattern(pattern: string) {
    try {
      const client = getRedisClient();
      const keys = await client.keys(pattern);
      
      if (keys.length > 0) {
        await client.del(...keys);
      }
    } catch (error) {
      console.error('Cache delete pattern error:', error);
    }
  },
};

export default redis;
