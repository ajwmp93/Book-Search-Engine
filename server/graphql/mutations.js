// server/graphql/mutations.js

const LOGIN_USER = `
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          title
        }
      }
    }
  }
`;

const ADD_USER = `
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          title
        }
      }
    }
  }
`;

const SAVE_BOOK = `
  mutation saveBook($input: SaveBookInput!) {
    saveBook(input: $input) {
      _id
      username
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;

const REMOVE_BOOK = `
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      savedBooks {
        bookId
        title
      }
    }
  }
`;

module.exports = {
  LOGIN_USER,
  ADD_USER,
  SAVE_BOOK,
  REMOVE_BOOK,
};
