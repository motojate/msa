import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  EventPattern,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { GenerateVerifyCodeCommand } from './commands/generate-verify-code.command';
import { ValidateVerifyCodeCommand } from './commands/validate-verify-code.command';
import { CreateUserCommand } from './commands/create-user.command';
import { KafkaMessage } from 'kafkajs';
import { GetUserInfoQuery } from './queries/get-user-info.query';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern(
    { cmd: 'generate-verify-code', method: 'POST' },
    Transport.TCP,
  )
  async generateVerifyCode(data: GenerateVerifyCodeCommand) {
    return this.commandBus.execute(
      new GenerateVerifyCodeCommand(
        data.name,
        data.phoneNumber,
        data.birthDate,
      ),
    );
  }

  @MessagePattern(
    { cmd: 'validate-verify-code', method: 'POST' },
    Transport.TCP,
  )
  async validateVerifyCode(data: ValidateVerifyCodeCommand) {
    const result = await this.commandBus.execute(
      new ValidateVerifyCodeCommand(data.phoneNumber, data.verifyCode),
    );

    return result;
  }

  @MessagePattern({ cmd: 'create-user', method: 'POST' }, Transport.TCP)
  async createUser(data: CreateUserCommand) {
    return this.commandBus.execute(new CreateUserCommand(data));
  }

  @EventPattern('user-name-request', Transport.KAFKA)
  async handleUserNameRequest(@Payload() data: string) {
    const userSeqList: string[] = data.split(',');
    return this.queryBus.execute(new GetUserInfoQuery(userSeqList));
  }
}
