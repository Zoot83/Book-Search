import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login(email: String!, password: String!) {
    login(email: String!, password: String!) {
      email,
      password
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(username: String!, email: String!, password: String!) {
    addUser(username: String!, email: String!, password: String!) {
      username, 
      email,
      password
    }
  }
`;
export const SAVE_BOOK = gql`
  mutation saveBook(author: [String]
      description: String!
      title: String!
      bookId: ID
      image: String!
      link: String!) {
    saveBook(author: [String]
      description: String!
      title: String!
      bookId: ID
      image: String!
      link: String!) {
      author,
      description,
      title,
      bookId,
      image,
      link,
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation removeBook(bookId: ID) {
    removeBook(bookId: ID) {
      ID
    }
  }
`;
