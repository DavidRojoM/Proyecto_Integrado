import { Field, ObjectType } from '@nestjs/graphql';
import { UserOutput } from '../users/user.output';

@ObjectType()
export class MessageOutput {
  @Field()
  user: UserOutput;

  @Field()
  createdAt: string;

  @Field()
  message: string;

  @Field()
  partyId: string;
}
