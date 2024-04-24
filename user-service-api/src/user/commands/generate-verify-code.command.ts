import { ICommand } from '@nestjs/cqrs';

export class GenerateVerifyCodeCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly phoneNumber: string,
    public readonly birthDate: string,
  ) {}
}
