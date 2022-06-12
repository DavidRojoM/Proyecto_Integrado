import { gql } from 'apollo-angular';

export const MessageAddedSubscription = gql`
  subscription messageAdded($partyId: String!) {
    messageAdded(partyId: $partyId) {
      user {
        id
        username
        image
      }
      createdAt
      message
      partyId
    }
  }
`;
