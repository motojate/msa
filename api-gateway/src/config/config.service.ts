import { Injectable } from '@nestjs/common';
import { TcpClientOptions, Transport } from '@nestjs/microservices';
import { ConfigService as NestConfigService } from '@nestjs/config';

type MicroServiceServerName = 'AUTH' | 'USER' | 'POST';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get port(): number {
    return this.configService.get<number>('PORT', 3000);
  }

  getServiceConfig(serviceName: MicroServiceServerName): TcpClientOptions {
    return {
      // name: this.configService.get<string>(`${serviceName}_SERVICE_NAME`),
      transport: Transport.TCP,
      options: {
        host: this.configService.get<string>(`${serviceName}_SERVICE_HOST`),
        port: this.configService.get<number>(`${serviceName}_SERVICE_PORT`),
      },
    };
  }
}
