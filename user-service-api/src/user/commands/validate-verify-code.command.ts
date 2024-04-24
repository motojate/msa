import { ICommand } from '@nestjs/cqrs';

export class ValidateVerifyCodeCommand implements ICommand {
  constructor(
    public readonly phoneNumber: string,
    public readonly verifyCode: string,
  ) {}
}
