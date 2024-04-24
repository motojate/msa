import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GetUserHandler } from './queries/get-user.hanlder';
import { CreateUserHandler } from './commands/create-user.handler';
import { GetInUsedUserHandler } from './queries/get-in-used-user.handler';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    GetUserHandler,
    GetInUsedUserHandler,
    CreateUserHandler,
  ],
})
export class UserModule {}
