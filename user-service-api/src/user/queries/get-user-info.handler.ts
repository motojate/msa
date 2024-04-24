import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserInfoQuery } from './get-user-info.query';
import { KafkaService } from 'src/public/kafka/kafka.service';
import { PrismaService } from 'src/public/prisma/prisma.service';

@QueryHandler(GetUserInfoQuery)
export class GetUserInfoHandler implements IQueryHandler<GetUserInfoQuery> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaService: KafkaService,
  ) {}
  async execute(query: GetUserInfoQuery): Promise<void> {
    const userNameList = await this.prisma.user.findMany({
      where: {
        userSeq: {
          in: query.userSeqList,
        },
      },
      select: {
        userSeq: true,
        name: true,
      },
    });
    console.log(userNameList);
    this.kafkaService.send('user-name-response', userNameList);
  }
}
