const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./path/to/your/middleware'); // Adjust the path accordingly
const typeDefs = require('./path/to/typeDefs'); // Your GraphQL type definitions
const resolvers = require('./path/to/resolvers'); // Your GraphQL resolvers

const app = express();

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const user = await authMiddleware({ req });
    return { user }; // Include the user in the context for resolvers
  },
});

// Apply middleware to connect Apollo Server with Express
server.start().then(res => {
  server.applyMiddleware({ app }); // This sets up the /graphql endpoint
});

// Start the Express server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
});
