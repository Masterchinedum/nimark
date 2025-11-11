# Database Setup Guide

This guide will help you set up PostgreSQL and Redis for the NIMARK Store.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 20.9+ installed
- Terminal access

## Quick Start

### 1. Start Database Services

```bash
# Start PostgreSQL and Redis
docker-compose up -d

# Check if services are running
docker-compose ps
```

You should see:
- `nimark-store-db` running on port 5436
- `nimark-store-redis` running on port 6380

### 2. Verify Services

**Check PostgreSQL:**
```bash
docker exec -it nimark-store-db psql -U nimark -d nimark_store -c "SELECT version();"
```

**Check Redis:**
```bash
docker exec -it nimark-store-redis redis-cli ping
# Should return: PONG
```

### 3. Generate AUTH_SECRET

```bash
openssl rand -base64 32
```

Copy the output and update `AUTH_SECRET` in your `.env` file.

### 4. Run Database Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Check migration status
npx prisma migrate status
```

### 5. Verify Database Schema

```bash
# Open Prisma Studio to view your database
npx prisma studio
```

This will open http://localhost:5555 where you can see all your tables.

## Database Architecture

### Store Database (Port 5436)
- **Purpose**: User authentication, orders, reviews, wishlist
- **Tables**:
  - `users` - User accounts and authentication
  - `accounts` - OAuth provider accounts
  - `sessions` - User sessions
  - `addresses` - Shipping/billing addresses
  - `orders` - Order records
  - `order_items` - Order line items
  - `reviews` - Product reviews
  - `wishlist_items` - Saved items

### Admin Database (Port 5435)
- **Purpose**: Product catalog, inventory, categories
- **Shared with**: nimark-admin
- **Access**: Read-only from store frontend

## Environment Variables

Update your `.env` file with these values:

```bash
# Store Database (User data)
DATABASE_URL="postgresql://nimark:nimark_store_password@localhost:5436/nimark_store"

# Redis (Sessions & Rate Limiting)
REDIS_URL="redis://localhost:6380"

# Admin Database (Product catalog - READ ONLY)
ADMIN_DATABASE_URL="postgresql://nimark:nimark_password@localhost:5435/nimark_admin"

# NextAuth Configuration
AUTH_SECRET="[your-generated-secret]"
NEXTAUTH_URL="http://localhost:3000"

# OAuth (Optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

## Database Management Commands

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### Stop and Remove Data
```bash
# WARNING: This will delete all data!
docker-compose down -v
```

### View Logs
```bash
# PostgreSQL logs
docker logs nimark-store-db

# Redis logs
docker logs nimark-store-redis

# Follow logs
docker logs -f nimark-store-db
```

### Backup Database
```bash
# Backup
docker exec nimark-store-db pg_dump -U nimark nimark_store > backup.sql

# Restore
docker exec -i nimark-store-db psql -U nimark nimark_store < backup.sql
```

### Connect to PostgreSQL
```bash
# Using Docker
docker exec -it nimark-store-db psql -U nimark -d nimark_store

# Using local psql
psql -h localhost -p 5436 -U nimark -d nimark_store
```

### Connect to Redis
```bash
# Using Docker
docker exec -it nimark-store-redis redis-cli

# Using local redis-cli
redis-cli -p 6380
```

## Prisma Commands

### Generate Client
```bash
npx prisma generate
```

### Create Migration
```bash
npx prisma migrate dev --name your_migration_name
```

### Reset Database
```bash
# WARNING: This will delete all data!
npx prisma migrate reset
```

### View Database
```bash
npx prisma studio
```

### Format Schema
```bash
npx prisma format
```

## Troubleshooting

### Port Already in Use

**PostgreSQL (5433):**
```bash
# Check what's using the port
lsof -i :5433

# Kill the process
kill -9 <PID>

# Or change the port in docker-compose.yml
```

**Redis (6379):**
```bash
# Check what's using the port
lsof -i :6379

# Stop local Redis
brew services stop redis  # macOS
sudo systemctl stop redis  # Linux
```

### Connection Refused

1. Check if services are running:
   ```bash
   docker-compose ps
   ```

2. Restart services:
   ```bash
   docker-compose restart
   ```

3. Check logs:
   ```bash
   docker-compose logs
   ```

### Migration Errors

1. Check current status:
   ```bash
   npx prisma migrate status
   ```

2. Reset if needed:
   ```bash
   npx prisma migrate reset
   ```

3. Re-run migrations:
   ```bash
   npx prisma migrate dev
   ```

### Redis Connection Issues

1. Test Redis connection:
   ```bash
   docker exec nimark-store-redis redis-cli ping
   ```

2. Check Redis logs:
   ```bash
   docker logs nimark-store-redis
   ```

3. Restart Redis:
   ```bash
   docker-compose restart redis
   ```

## Production Considerations

### Database
- Use managed PostgreSQL (AWS RDS, Supabase, PlanetScale)
- Enable SSL connections
- Set up automated backups
- Configure read replicas for scale
- Use connection pooling (PgBouncer)

### Redis
- Use managed Redis (Upstash, Redis Cloud, AWS ElastiCache)
- Enable persistence (AOF or RDB)
- Set up replication for high availability
- Configure memory limits and eviction policies

### Security
- Use strong passwords
- Restrict network access
- Enable SSL/TLS
- Rotate credentials regularly
- Monitor access logs
- Set up alerts for suspicious activity

## Database Schema Updates

When you need to modify the schema:

1. Update `prisma/schema.prisma`
2. Create migration:
   ```bash
   npx prisma migrate dev --name describe_your_changes
   ```
3. Generate client:
   ```bash
   npx prisma generate
   ```
4. Test changes locally
5. Deploy to production:
   ```bash
   npx prisma migrate deploy
   ```

## Support

For issues:
- Check Docker logs: `docker-compose logs`
- Verify environment variables: `cat .env`
- Review Prisma schema: `npx prisma validate`
- Consult [Prisma docs](https://www.prisma.io/docs)
- Check [Redis docs](https://redis.io/docs)
