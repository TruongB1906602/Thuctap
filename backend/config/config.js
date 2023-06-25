// config/jwt.js

const fs = require('fs');
const jwt = require('jsonwebtoken');

const publicKey = fs.readFileSync('./config/public.key', 'utf8');
const privateKey = fs.readFileSync('./config/private.key', 'utf8');

module.exports = {
  signToken: (payload) => {
    return jwt.sign(payload, privateKey, { algorithm: 'RS256' });
  },
  verifyToken: (token) => {
    try {
      return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    } catch (error) {
      return false;
    }
  },
};
