const express = require("express");
const { getBoard, addColumn, deleteColumn, addTask, updateTask, deleteTasks } = require("../controllers/board");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.use(protect);

router.get("/", getBoard);
router.post("/column", addColumn);
router.delete("/column/:id", deleteColumn);
router.post('/column/:id/task', addTask);
router.put('/column/:columnId/task/:taskId', updateTask);
router.delete('/column/:id/task', deleteTasks);

module.exports = router;
