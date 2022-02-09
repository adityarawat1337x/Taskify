const express = require("express");
const {
  getTasks,
  postTask,
  putTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.route("/").get(getTasks).post(postTask);

router.put("/:id", putTask);
router.delete("/:id", deleteTask);

module.exports = router;
