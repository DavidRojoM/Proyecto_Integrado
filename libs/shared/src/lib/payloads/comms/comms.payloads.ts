import {
  ErrorPayload,
  Message,
  MessageDto,
  Result,
} from '@proyecto-integrado/shared';

export type SendMessageResponse = Result<MessageDto, ErrorPayload>;

export type FindMessagesByUserIdResponse = Result<MessageDto[], ErrorPayload>;

export type FindMessagesByPartyIdResponse = Result<MessageDto[], ErrorPayload>;

export type FindMessagesByPartyIdAndUserIdResponse = Result<
  MessageDto[],
  ErrorPayload
>;

export type InsertMessage = Result<Message, ErrorPayload>;

export type FindMessages = Result<Message[], ErrorPayload>;
