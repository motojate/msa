import { Controller } from '@nestjs/common';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { LoginCommand } from './commands/login.command';
import { CommandBus } from '@nestjs/cqrs';

@Controller()
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: 'login', method: 'POST' }, Transport.TCP)
  async login(data: LoginCommand) {
    const tokens = await this.commandBus.execute(
      new LoginCommand(data.userId, data.password),
    );

    return tokens;
  }
}
