import { Global, Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'my-user-name',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'my-user',
            brokers: ['127.0.0.1:9092'],
          },
          consumer: {
            groupId: 'my-user-group',
          },
        },
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
