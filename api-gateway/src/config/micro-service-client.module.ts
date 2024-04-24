import { Module, DynamicModule } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigModule } from './config.module';
import { ConfigService } from './config.service';

interface MicroserviceClientOptions {
  name: string;
  useFactory: (configService: ConfigService) => ClientProxy;
}

@Module({})
export class MicroservicesClientModule {
  static register(
    clientOptionsArray: MicroserviceClientOptions[],
  ): DynamicModule {
    const providers = clientOptionsArray.map(({ name, useFactory }) => ({
      provide: name,
      useFactory: useFactory,
      inject: [ConfigService],
    }));

    return {
      module: MicroservicesClientModule,
      imports: [ConfigModule],
      providers: providers,
      exports: providers,
    };
  }
}
