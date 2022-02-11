const express = require("express")
const {
  getTasks,
  postTask,
  putTask,
  deleteTask,
} = require("../controllers/taskController")
const protect = require("../middlewares/authMiddleware")

const router = express.Router()
router.route("/").get(protect, getTasks).post(protect, postTask)

router.put("/:id", protect, putTask)
router.delete("/:id", protect, deleteTask)

module.exports = router
