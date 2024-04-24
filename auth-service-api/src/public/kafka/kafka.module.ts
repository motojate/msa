import { Global, Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'my-auth-name',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'my-auth',
            brokers: ['127.0.0.1:9092'],
          },
          consumer: {
            groupId: 'my-auth-group',
          },
        },
      },
    ]),
  ],
  providers: [KafkaService],
})
export class KafkaModule {}
