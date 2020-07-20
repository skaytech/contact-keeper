const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  //Get the token from the request
  const token = req.header('x-auth-token');

  //Check if token present
  if (!token)
    return res.status(401).json({ msg: 'No Token. Authorization Denied.' });

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
