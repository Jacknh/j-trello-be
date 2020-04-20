const express = require("express");
const {
  getBoard,
  addColumn,
  deleteColumn,
  addTask,
  updateTask,
  deleteTasks,
  moveColumn,
  moveTask,
} = require("../controllers/board");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.use(protect);

router.get("/", getBoard);
router.post("/column", addColumn);
router.delete("/column/:id", deleteColumn);
router.post("/column/:id/task", addTask);
router.put("/column/:columnId/task/:taskId", updateTask);
router.delete("/column/:id/task", deleteTasks);
router.put("/column", moveColumn);
router.put("/column/task", moveTask);

module.exports = router;
