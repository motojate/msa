import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { PrismaService } from 'src/public/prisma/prisma.service';
import { CreateUserEvent } from '../events/create-user.event';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand) {
    const user = await this.prisma.user.create({
      data: {
        name: command.name,
        phoneNumber: command.phoneNumber,
        birthDate: command.birthDate,
      },
    });
    const dto = {
      userSeq: user.userSeq,
      userId: command.userId,
      password: command.password,
    };
    await this.eventBus.publish(new CreateUserEvent(dto));
  }
}
