import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PartyOutput {
  @Field()
  id: string;

  @Field()
  username: string;
}
