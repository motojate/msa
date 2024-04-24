import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/public/prisma/prisma.service';
import { GetInUsedUserQuery } from './get-in-used-user.query';

@QueryHandler(GetInUsedUserQuery)
export class GetInUsedUserHandler implements IQueryHandler<GetInUsedUserQuery> {
  constructor(private readonly prisma: PrismaService) {}

  execute(query: GetInUsedUserQuery): Promise<number> {
    return this.prisma.user.count({
      where: { userId: query.userId },
    });
  }
}
