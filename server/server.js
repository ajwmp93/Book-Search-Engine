const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./path/to/your/middleware'); // Adjust the path
const typeDefs = require('./graphql/typeDefs'); // Updated path to typeDefs
const resolvers = require('./graphql/resolvers'); // Updated path to resolvers

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = authMiddleware({ req });
    return { user }; // Include the user in the context
  },
});

// Apply Apollo Server middleware to the Express app
server.start().then(() => {
  server.applyMiddleware({ app }); // This sets up the /graphql endpoint

  // Start the database connection and the Express server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`🚀 GraphQL is running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
});
