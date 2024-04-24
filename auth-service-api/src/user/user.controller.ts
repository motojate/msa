import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create-user.command';
import { GetInUsedUserQuery } from './queries/get-in-used-user.query';

@Controller()
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'active', method: 'GET' }, Transport.TCP)
  async inUsedUserId(data: GetInUsedUserQuery) {
    return this.queryBus.execute(new GetInUsedUserQuery(data.userId));
  }

  @EventPattern('create-user', Transport.KAFKA)
  async createUser(@Payload() data: CreateUserCommand) {
    return this.commandBus.execute(
      new CreateUserCommand(data.userSeq, data.userId, data.password),
    );
  }
}
