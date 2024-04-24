import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { MicroservicesClientModule } from './config/micro-service-client.module';
import { ServiceToken } from './config/config.inject.data';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { JwtStrategy } from './util/jwt.strategy';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
    }),
    MicroservicesClientModule.register([
      {
        name: ServiceToken.AUTH_SERVICE,
        useFactory: (configService: ConfigService) => {
          const serviceConfig = configService.getServiceConfig('AUTH');
          return ClientProxyFactory.create(serviceConfig);
        },
      },
      {
        name: ServiceToken.POST_SERVICE,
        useFactory: (configService: ConfigService) => {
          const serviceConfig = configService.getServiceConfig('POST');
          return ClientProxyFactory.create(serviceConfig);
        },
      },
      {
        name: ServiceToken.USER_SERVICE,
        useFactory: (configService: ConfigService) => {
          const serviceConfig = configService.getServiceConfig('USER');
          return ClientProxyFactory.create(serviceConfig);
        },
      },
    ]),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 5,
      },
    ]),
    AuthModule,
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
