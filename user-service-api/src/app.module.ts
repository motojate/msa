import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { KafkaModule } from './public/kafka/kafka.module';
import { PrismaModule } from './public/prisma/prisma.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisCacheModule } from './public/redis-cache/redis-cache.module';

@Module({
  imports: [
    UserModule,
    KafkaModule,
    PrismaModule,
    RedisModule.forRoot({
      config: {
        host: '127.0.0.1',
        port: 6379,
      },
    }),
    RedisCacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
