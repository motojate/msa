import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const tcpApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      },
    },
  );

  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
  );

  await tcpApp.listen();
  console.log('TCP SERVER RUNNING');

  await kafkaApp.listen();
  console.log('KAFKA SERVER RUNNING');
}

bootstrap();
