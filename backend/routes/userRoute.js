const express = require("express")
const {
  getUser,
  loginUser,
  updateUser,
  deleteUser,
  addUser,
} = require("../controllers/userController")
const protect = require("../middlewares/authMiddleware")

const router = express.Router()

router.get("/me", protect, getUser)
router.post("/register", addUser)
router.post("/login", loginUser)
router.put("/me/update", protect, updateUser)
router.delete("/me/delete", protect, deleteUser)

module.exports = router
