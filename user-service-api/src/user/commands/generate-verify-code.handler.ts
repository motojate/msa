import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GenerateVerifyCodeCommand } from './generate-verify-code.command';
import { RedisCacheService } from 'src/public/redis-cache/redis-cache.service';

@CommandHandler(GenerateVerifyCodeCommand)
export class GenerateVerifyCodeHandler
  implements ICommandHandler<GenerateVerifyCodeCommand>
{
  constructor(private readonly redisCacheService: RedisCacheService) {}
  async execute(command: GenerateVerifyCodeCommand): Promise<boolean> {
    const randomNumber = Math.floor(Math.random() * 100000);
    const verifyCode = randomNumber.toString().padStart(6, '0');
    const ttl = 300; // 5분
    await this.redisCacheService.set<string>(
      command.phoneNumber,
      verifyCode,
      ttl,
    );
    console.log('생성된 값 : ', verifyCode);
    return true;
  }
}
