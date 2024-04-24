import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RedisCacheModule } from 'src/public/redis-cache/redis-cache.module';
import { GenerateVerifyCodeHandler } from './commands/generate-verify-code.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { ValidateVerifyCodeHandler } from './commands/validate-verify-code.handler';
import { CreateUserCommandHandler } from './commands/create-user.handler';
import { CreateUserEventHandler } from './events/create-user.handler';
import { GetUserInfoHandler } from './queries/get-user-info.handler';

@Module({
  imports: [RedisCacheModule, CqrsModule],
  providers: [
    UserService,
    GenerateVerifyCodeHandler,
    ValidateVerifyCodeHandler,
    CreateUserCommandHandler,
    CreateUserEventHandler,
    GetUserInfoHandler,
  ],
  controllers: [UserController],
})
export class UserModule {}
