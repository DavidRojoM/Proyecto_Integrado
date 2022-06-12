import { MessageOutput } from '../../core/shared/modules/comms/domain/message.interface';

export interface MessagesState {
  messages: {
    [key: string]: MessageOutput[];
  };
  loading: boolean;
  error?: string;
}
