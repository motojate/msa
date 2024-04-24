import { IQuery } from '@nestjs/cqrs';

export class GetInUsedUserQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
