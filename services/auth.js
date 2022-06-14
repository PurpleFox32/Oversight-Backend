const jwt = require('jsonwebtoken');
const { User } = require('../models');
var bcrypt = require('bcrypt');

const secretKey = 'password123';

// using jwt to create a JWT token
module.exports = {
  createJWT: (user) => {
    const token = jwt.sign(
      {
        username: user.username,
        id: user.id,
      },
      secretKey,
      {
        expiresIn: '1h',
      }
    );

    return token;
  },
  verifyUser: (token) => {
    const decodedPayload = jwt.verify(token, secretKey);
    return User.findByPk(decodedPayload.id);
  },
  signUser: function (user) {
    const token = jwt.sign(
      {
        username: user.username,
        id: user.id,
      },
      'secretKey',
      {
        expiresIn: '1h',
      }
    );
    return token;
  },
  varifyUser2: function (token) {
    try {
      let decoded = jwt.verify(token, 'secretKey');
      return User.findByPk(decoded.id);
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  hashPassword: function (plainTextPassword) {
    let salt = bcrypt.genSalt(10);
    let hash = bcrypt.hashSync(plainTextPassword, salt);
    return hash;
  },
  comparePasswords: function (plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  },
};
