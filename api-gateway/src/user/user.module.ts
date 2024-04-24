import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MicroservicesClientModule } from 'src/config/micro-service-client.module';
import { ServiceToken } from 'src/config/config.inject.data';
import { ConfigService } from 'src/config/config.service';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [
    MicroservicesClientModule.register([
      {
        name: ServiceToken.USER_SERVICE,
        useFactory: (configService: ConfigService) => {
          const serviceConfig = configService.getServiceConfig('USER');
          return ClientProxyFactory.create(serviceConfig);
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
