import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { PrismaService } from './prisma/prisma.service';
// import * as createRedisStore from 'connect-redis';
// import Redis from 'ioredis'

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  // const RedisStore = createRedisStore(session)

  // const redisClient = createClient({ // old version
  // url: process.env.REDIS_URL
  // host: process.env.REDIS_HOST,
  // port: Number(process.env.REDIS_PORT)
  // })

  // const redis = new Redis(Number(process.env.REDIS_PORT), process.env.REDIS_HOST);

  app.use(
    session({
      // store: new RedisStore({
      //   client: redis,
      //   logErrors: true
      // }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 12 * 3600000,
        httpOnly: true
      }
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app)

  await app.listen(PORT, () => console.log(`Started at port: ${PORT}`));
}
bootstrap();
