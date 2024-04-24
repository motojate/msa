import { IEvent } from '@nestjs/cqrs';

export class CreateUserEvent implements IEvent {
  public readonly userSeq: string;
  public readonly userId: string;
  public readonly password: string;

  constructor(createUserEvent: CreateUserEvent) {
    this.userId = createUserEvent.userId;
    this.password = createUserEvent.password;
    this.userSeq = createUserEvent.userSeq;
  }
}
