import {
  ErrorPayload,
  Message,
  MessageDto,
  Result,
} from '@proyecto-integrado/shared';

export type FindMessagesByUserIdResponse = Result<MessageDto[], ErrorPayload>;

export type FindMessagesByPartyIdResponse = Result<MessageDto[], ErrorPayload>;

export type FindMessagesByPartyIdAndUserIdResponse = Result<
  MessageDto[],
  ErrorPayload
>;

export type SendMessageResponse = Result<Message, ErrorPayload>;

export type FindMessages = Result<Message[], ErrorPayload>;
