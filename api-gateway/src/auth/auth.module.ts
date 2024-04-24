import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from 'src/config/config.service';
import { MicroservicesClientModule } from 'src/config/micro-service-client.module';
import { ServiceToken } from 'src/config/config.inject.data';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [
    MicroservicesClientModule.register([
      {
        name: ServiceToken.AUTH_SERVICE,
        useFactory: (configService: ConfigService) => {
          const serviceConfig = configService.getServiceConfig('AUTH');
          return ClientProxyFactory.create(serviceConfig);
        },
      },
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
