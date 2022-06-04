import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CommsService } from './comms.service';
import {
  Message,
  MessageInput,
  MessageOutput,
} from '@proyecto-integrado/shared';

@Resolver((of) => MessageOutput)
export class CommsResolver {
  private readonly pubSub = new PubSub();

  constructor(private readonly commsService: CommsService) {}

  @Query((returns) => [MessageOutput], {
    nullable: 'items',
  })
  findAll() {
    return this.commsService.findAll();
  }

  @Mutation((returns) => MessageOutput)
  async sendMessage(@Args('messageInput') messageInput: MessageInput) {
    const message = await this.commsService.sendMessage(messageInput);
    const output = Message.modelToOutput(message);
    console.log(output);

    this.pubSub.publish(message.party.id, {
      messageAdded: output,
    });
    return output;
  }

  @Subscription((returns) => MessageOutput, {
    name: 'messageAdded',
  })
  messageAdded(@Args('partyId') partyId: string) {
    return this.pubSub.asyncIterator(partyId);
  }
}