// graphql/typeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Query {
    users: [User]
    user(_id: ID!): User
  }

  type Mutation {
    addUser(username: String!, email: String!): User
    login(username: String!, password: String!): String
  }
`;

module.exports = typeDefs;
