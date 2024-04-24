import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly userSeq: string,
    public readonly userId: string,
    public readonly password: string,
  ) {}
}
