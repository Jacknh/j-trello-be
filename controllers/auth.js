const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('../utils/asyncHandler')
const User = require('../models/User');
const Board = require('../models/Board');

// @desc      Register a user
// @route     POST /api/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);

  await Board.create({
    name: user.name,
    columns: [
      {
        name: 'Todo',
      },
      {
        name: 'In Progress',
      },
      {
        name: 'Done',
      }
    ],
    user: user._id
  })

  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRESIN});

  res.json({ name: user.name, token });
})

// @desc      Login a user
// @route     POST /api/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email})

  if (!user) {
    return res.status(400).send('Invalid credentials')
  }

  if (!password) {
    return res.status(400).send("Invalid credentials");
  }

  const compared = await bcrypt.compare(password, user.password);

  if (!compared) {
    return res.status(400).send("Invalid credentials");
  }

  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRESIN});

  res.json({ name: user.name, token });
})

// @desc      Get me
// @route     GET /api/auth/getMe
// @access    Private
exports.getMe = asyncHandler(async (req, res) => {
  const { name } = req.user;

  res.json({ name });
})