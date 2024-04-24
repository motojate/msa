import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('my-auth-name') private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.clientKafka.connect();
  }

  async onModuleDestroy() {
    await this.clientKafka.close();
  }

  async send(topic: string, message: any) {
    this.clientKafka.emit(topic, message);
  }
}
