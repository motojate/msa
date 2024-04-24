import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateUserEvent } from './create-user.event';
import { KafkaService } from 'src/public/kafka/kafka.service';

@EventsHandler(CreateUserEvent)
export class CreateUserEventHandler implements IEventHandler<CreateUserEvent> {
  constructor(private readonly kafkaService: KafkaService) {}

  async handle(event: CreateUserEvent) {
    const createUserDto = JSON.stringify(event);
    await this.kafkaService.send('create-user', createUserDto);
  }
}
