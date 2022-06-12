import { gql } from 'apollo-angular';

export const sendMessageMutation = gql`
  mutation sendMessage($messageInput: MessageInput!) {
    sendMessage(messageInput: $messageInput) {
      user {
        id
        username
        image
      }
      createdAt
      message
    }
  }
`;
