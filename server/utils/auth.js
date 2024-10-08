const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

const authMiddleware = async ({ req }) => {
  // Allows token to be sent via headers
  let token = req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (token) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    throw new Error('You have no token!');
  }

  // Verify token and get user data out of it
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    return { user: data }; // Add user data to context
  } catch (error) {
    console.log('Invalid token', error);
    throw new Error('Invalid token!');
  }
};

const signToken = function ({ username, email, _id }) {
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = {
  authMiddleware,
  signToken,
};
