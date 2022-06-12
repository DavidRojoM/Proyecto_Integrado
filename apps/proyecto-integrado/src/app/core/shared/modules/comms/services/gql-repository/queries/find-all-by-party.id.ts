import { gql } from 'apollo-angular';

export const findAllByPartyId = gql`
  query findAllByPartyId($partyId: String!) {
    findAllByPartyId(partyId: $partyId) {
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
