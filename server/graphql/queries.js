// server/graphql/queries.js

const GET_ME = `
  query {
    me {
      _id
      username
      email
      bookCount
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

module.exports = {
  GET_ME,
};
