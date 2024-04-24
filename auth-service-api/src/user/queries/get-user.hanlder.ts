import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user.query';
import { User } from '@prisma/client';
import { PrismaService } from 'src/public/prisma/prisma.service';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly prisma: PrismaService) {}

  execute(query: GetUserQuery): Promise<User> {
    return this.prisma.user.findUnique({
      where: { userId: query.userId },
    });
  }
}
