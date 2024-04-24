import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { PrismaService } from 'src/public/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(command.password, salt);
    await this.prisma.user.create({
      data: {
        userSeq: command.userSeq,
        userId: command.userId,
        password: hashedPassword,
      },
    });
  }
}
