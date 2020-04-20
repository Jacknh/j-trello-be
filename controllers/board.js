const asyncHandler = require("../utils/asyncHandler");
const Board = require("../models/Board");

// @desc      Get a board info
// @route     GET /api/board
// @access    Private
exports.getBoard = asyncHandler(async (req, res) => {
  const user = req.user;

  const board = await Board.findOne({ user: user._id });

  res.json({ board });
});

// @desc      Add a column
// @route     POST /api/board/column
// @access    Private
exports.addColumn = asyncHandler(async (req, res) => {
  const user = req.user;

  let board = await Board.findOne({ user: user._id });

  board.columns.push(req.body);

  board = await board.save();

  res.json({ board });
});

// @desc      Delete a column
// @route     DELETE /api/board/column/:id
// @access    Private
exports.deleteColumn = asyncHandler(async (req, res) => {
  const user = req.user;

  let board = await Board.findOne({ user: user._id });

  board.columns.id(req.params.id).remove();

  board = await board.save();

  res.json({ board });
});

// @desc      Add a task
// @route     POST /api/board/column/:id/task
// @access    Private
exports.addTask = asyncHandler(async (req, res) => {
  const user = req.user;

  let board = await Board.findOne({ user: user._id });

  board.columns.id(req.params.id).tasks.push(req.body);

  board = await board.save();

  res.json({ board });
});

// @desc      Update a task
// @route     PUT /api/board/column/:columnId/task/:taskId
// @access    Private
exports.updateTask = asyncHandler(async (req, res) => {
  const user = req.user;
  const { columnId, taskId } = req.params;
  const { name, description } = req.body;

  let board = await Board.findOne({ user: user._id });

  const task = board.columns.id(columnId).tasks.id(taskId);
  task.name = name;
  task.description = description;

  board = await board.save();

  res.json({ board });
});

// @desc      Delete all tasks
// @route     DELETE /api/board/column/:id/task
// @access    Private
exports.deleteTasks = asyncHandler(async (req, res) => {
  const user = req.user;

  let board = await Board.findOne({ user: user._id });

  board.columns.id(req.params.id).tasks = [];

  board = await board.save();

  res.json({ board });
});

// @desc      Move a column
// @route     PUT /api/board/column
// @access    Private
exports.moveColumn = asyncHandler(async (req, res) => {
  const user = req.user;
  const { fromColumnIndex, toColumnIndex } = req.body;

  let board = await Board.findOne({ user: user._id });

  const columns = board.columns;
  const cloumnToMove = columns.splice(fromColumnIndex, 1)[0];
  columns.splice(toColumnIndex, 0, cloumnToMove);

  board = await board.save();

  res.json({ board });
});

// @desc      Move a task
// @route     PUT /api/board/column/task
// @access    Private
exports.moveTask = asyncHandler(async (req, res) => {
  const user = req.user;
  const { fromColumnIndex, toColumnId, fromTaskIndex, toTaskIndex } = req.body;

  let board = await Board.findOne({ user: user._id });

  const fromTasks = board.columns[fromColumnIndex].tasks;
  const task = fromTasks.splice(fromTaskIndex, 1)[0];
  board.columns.id(toColumnId).tasks.splice(toTaskIndex, 0, task);

  board = await board.save();

  res.json({ board });
});
