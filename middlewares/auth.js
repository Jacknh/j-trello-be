const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).send('Unauthorized user');
  }

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    req.user = user;
    next();

  } catch (error) {
    return res.status(401).send("Unauthorized user");
  }

}