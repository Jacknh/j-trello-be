const jwt = require('jsonwebtoken')
const asyncHandler = require('../utils/asyncHandler')
const User = require('../models/User')


// @desc      Register a user
// @route     /api/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);

  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRESIN});

  res.json({ data: {name: user.name, token} });
})