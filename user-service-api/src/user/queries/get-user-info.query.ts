import { IQuery } from '@nestjs/cqrs';

export class GetUserInfoQuery implements IQuery {
  constructor(public readonly userSeqList: string[]) {}
}
