import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class MessageInput {
  @Field()
  partyId: string;

  @Field()
  userId: string;

  // @Field()
  // createdAt: Date;

  @Field()
  message: string;
}
