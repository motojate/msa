import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ValidateVerifyCodeCommand } from './validate-verify-code.command';
import { RedisCacheService } from 'src/public/redis-cache/redis-cache.service';

@CommandHandler(ValidateVerifyCodeCommand)
export class ValidateVerifyCodeHandler
  implements ICommandHandler<ValidateVerifyCodeCommand>
{
  constructor(private readonly redisCacheService: RedisCacheService) {}

  async execute(command: ValidateVerifyCodeCommand): Promise<boolean> {
    const verifyCode = await this.redisCacheService.get<string>(
      command.phoneNumber,
    );
    if (verifyCode === command.verifyCode) return true;
    else return false;
  }
}
