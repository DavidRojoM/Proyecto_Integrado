import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserOutput {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  image: string;
}
