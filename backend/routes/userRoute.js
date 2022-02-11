const express = require("express")
const {
  getUser,
  loginUser,
  updateUser,
  deleteUser,
  addUser,
} = require("../controllers/userController")

const router = express.Router()

router.get("/me", getUser)
router.post("/register", addUser)
router.post("/login", loginUser)
router.put("/me/update", updateUser)
router.delete("/me/delete", deleteUser)

module.exports = router
