import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  readonly name: string;
  readonly phoneNumber: string;
  readonly birthDate: string;
  readonly userId: string;
  readonly password: string;
  constructor(createUserDto: CreateUserCommand) {
    Object.assign(this, createUserDto);
  }
}
